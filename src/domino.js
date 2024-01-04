export class Domino {
  /**
   *
   * @param {[number, number][][]} pieces
   * @param {(pieces: [number, number][], play?: (pieceIndex: number) => void) => void} renderPlayerFn
   * @param {(pieces: [number, number][]) => void} renderTableFn
   * @param {number} players
   */
  constructor(pieces, renderPlayerFn, renderTableFn, players) {
    this.renderPlayerFn = renderPlayerFn;
    this.renderTableFn = renderTableFn;
    this.players = players;
    this.distributedPieces = pieces;
    /** @type {[number, number][]} */
    this.table = [];
    this.playerTurn = 0;

    this.play = this.play.bind(this);
  }

  /**
   *
   */
  renderPieces() {
    const playerPieces = this.distributedPieces[this.playerTurn];
    if (!playerPieces) throw new Error("Pieces for player 0 is not defined");
    this.renderPlayerFn(playerPieces, this.play);
    this.renderTableFn(this.table);
  }

  /**
   *
   * @param {number} pieceIndex
   */
  play(pieceIndex) {
    this.action(this.playerTurn, pieceIndex);
    this.renderPieces();
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
    const checkResult = this.checkPlay(player, piece);
    if (!checkResult.valid) {
      alert("Invalid play");
      return;
    }

    playerPieces.splice(pieceIndex, 1);

    if (checkResult.flipped) {
      const [first, second] = piece;
      piece[0] = second;
      piece[1] = first;
    }

    if (checkResult.matchBegin) {
      this.table.unshift(piece);
    } else {
      this.table.push(piece);
    }

    // Move playerTurn to the next player
    this.playerTurn = (player + 1) % this.players;
  }

  /**
   *
   * @param {number} player
   * @param {[number, number]} piece
   * @returns {{
   *  valid: boolean;
   *  matchBegin: boolean;
   *  flipped: boolean;
   * }}
   */
  checkPlay(player, piece) {
    if (this.playerTurn !== player)
      return {
        valid: false,
        matchBegin: false,
        flipped: false,
      };
    if (this.table.length === 0)
      return {
        valid: true,
        matchBegin: false,
        flipped: false,
      };
    if (this.table.at(0)?.[0] === piece[0])
      return {
        valid: true,
        matchBegin: true,
        flipped: true,
      };
    if (this.table.at(0)?.[0] === piece[1])
      return {
        valid: true,
        matchBegin: true,
        flipped: false,
      };
    if (this.table.at(-1)?.[1] === piece[0])
      return {
        valid: true,
        matchBegin: false,
        flipped: false,
      };
    if (this.table.at(-1)?.[1] === piece[1])
      return {
        valid: true,
        matchBegin: false,
        flipped: true,
      };

    return {
      valid: false,
      matchBegin: false,
      flipped: false,
    };
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
