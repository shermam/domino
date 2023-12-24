/**
 * Generate permutatin of pieces up to a size
 *
 * @param {number} size
 * @returns {[number, number][]}
 */
export function generatePieces(size = 7) {
  return new Array(size).fill(0).flatMap((_, i) =>
    new Array(size).fill(0).map((_, j) => {
      /** @type {[number, number]} */
      const result = [i, j];
      return result;
    })
  );
}

/**
 * @template T
 * @param {number} numberOfPlayers
 * @param {T[]} pieces
 * @returns {T[][]}
 */
export function distributePieces(numberOfPlayers, pieces) {
  const numberOfPiecesPerPlayer = pieces.length / numberOfPlayers;

  return new Array(numberOfPlayers).fill(0).map((_, player) => {
    return pieces.slice(
      player * numberOfPiecesPerPlayer,
      (player + 1) * numberOfPiecesPerPlayer
    );
  });
}

/**
 * @template T
 * @param {T[]} array
 * @returns {T[]}
 */
export function shuffleArray(array) {
  const newArray = structuredClone(array);
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    // @ts-ignore Values can not be undefined in here as loop check the bounds of the array
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
}
