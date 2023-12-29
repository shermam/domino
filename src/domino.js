export class Domino {
  /**
   *
   * @param {number} size
   * @param {(pieces: [number, number][], play?: (player: number, pieceIndex: number) => void) => void} renderPlayerFn
   * @param {(pieces: [number, number][]) => void} renderTableFn
   * @param {number} players
   */
  constructor(size, renderPlayerFn, renderTableFn, players) {
    this.size = size;
    this.renderPlayerFn = renderPlayerFn;
    this.renderTableFn = renderTableFn;
    this.players = players;
    this.shuffledPieces = shuffleArray(generatePieces());
    this.distributedPieces = distributePieces(2, this.shuffledPieces);
    /** @type {[number, number][]} */
    this.table = [];
    this.playerTurn = 0;

    this.play = this.play.bind(this);
  }

  /**
   *
   * @param {number} player
   */
  renderPieces(player) {
    const playerPieces = this.distributedPieces[player];
    if (!playerPieces) throw new Error("Pieces for player 0 is not defined");
    this.renderPlayerFn(playerPieces, this.play);
    this.renderTableFn(this.table);
  }

  /**
   *
   * @param {number} player
   * @param {number} pieceIndex
   */
  play(player, pieceIndex) {
    this.action(player, pieceIndex);
    this.renderPieces(player);
  }

  /**
   *
   * @param {number} player
   * @param {number} pieceIndex
   */
  action(player, pieceIndex) {
    const playerPieces = this.distributedPieces[player];
    if (!playerPieces) throw new Error("Pieces for player is not defined");

    const piece = playerPieces[pieceIndex];
    if (!piece) throw new Error("Piece is not defined");

    //TODO: Maybe throw an error here
    if (!this.checkPlay(player, piece)) return;

    playerPieces.splice(pieceIndex, 1);
    this.table.push(piece);

    // Move playerTurn to the next player
    this.playerTurn = (player + 1) % this.players;
  }
  /**
   *
   * @param {number} player
   * @param {[number, number]} piece
   * @returns {boolean}
   */
  checkPlay(player, piece) {
    if (this.playerTurn !== player) return false;
    if (this.table.length === 0) return true;
    
    return true;
  }
}

/**
 * Generate permutatin of pieces up to a size
 *
 * @param {number} size
 * @returns {[number, number][]}
 */
export function generatePieces(size = 7) {
  /** @type {[number, number][]} */
  const result = [];

  for (let i = 0; i < size; i++) {
    for (let j = i; j < size; j++) {
      result.push([i, j]);
    }
  }

  return result;
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
