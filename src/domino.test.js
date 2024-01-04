import { it, describe, beforeEach, afterEach } from "node:test";
import assert from "node:assert";
import {
  Domino,
  distributePieces,
  generatePieces,
  shuffleArray,
} from "./domino.js";

describe("distributePieces", () => {
  it("creates the an array of pieces for each player", () => {
    const players = 3;
    const pieces = [1, 2, 3, 4, 5, 6, 7, 8, 9];

    const distributedPieces = distributePieces(players, pieces);

    assert.deepEqual(distributedPieces, [
      [1, 2, 3],
      [4, 5, 6],
      [7, 8, 9],
    ]);
  });
});

describe("generatePieces", () => {
  it("generates the combination of pieces", () => {
    const pieces = generatePieces(3);

    assert.deepEqual(pieces, [
      [0, 0],
      [0, 1],
      [0, 2],
      [1, 1],
      [1, 2],
      [2, 2],
    ]);
  });
});

describe("Domino", () => {
  let oldAlert = globalThis.alert;

  beforeEach(() => {
    oldAlert = globalThis.alert;
    globalThis.alert = () => {};
  });

  afterEach(() => {
    globalThis.alert = oldAlert;
  });

  describe(".checkPlay", () => {
    /**
     * @type {{
     *  description: string;
     *  table: [number, number][];
     *  piece: [number, number];
     *  player: number;
     *  want: {
     *    valid: boolean;
     *    matchBegin: boolean;
     *    flipped: boolean;
     *  };
     * }[]}
     */
    const cases = [
      {
        description: "returns false when it is not the player's turn",
        table: [],
        piece: [0, 0],
        player: 1,
        want: {
          valid: false,
          matchBegin: false,
          flipped: false,
        },
      },
      {
        description: "returns true when table is empty",
        table: [],
        piece: [0, 0],
        player: 0,
        want: {
          valid: true,
          matchBegin: false,
          flipped: false,
        },
      },
      {
        description:
          "returns true when first number of the first piece on the table matches the first number of arg piece",
        table: [
          [0, 1],
          [1, 2],
        ],
        piece: [0, 3],
        player: 0,
        want: {
          valid: true,
          matchBegin: true,
          flipped: true,
        },
      },
      {
        description:
          "returns true when first number of the first piece on the table matches the last number of arg piece",
        table: [
          [0, 1],
          [1, 2],
        ],
        piece: [3, 0],
        player: 0,
        want: {
          valid: true,
          matchBegin: true,
          flipped: false,
        },
      },
      {
        description:
          "returns true when last number of the last piece on the table matches the first number of arg piece",
        table: [
          [0, 1],
          [1, 2],
        ],
        piece: [2, 3],
        player: 0,
        want: {
          valid: true,
          matchBegin: false,
          flipped: false,
        },
      },
      {
        description:
          "returns true when last number of the last piece on the table matches the last number of arg piece",
        table: [
          [0, 1],
          [1, 2],
        ],
        piece: [3, 2],
        player: 0,
        want: {
          valid: true,
          matchBegin: false,
          flipped: true,
        },
      },
      {
        description:
          "returns false when no number of the arg piece matches either end of the table",
        table: [
          [0, 1],
          [1, 2],
        ],
        piece: [3, 3],
        player: 0,
        want: {
          valid: false,
          matchBegin: false,
          flipped: false,
        },
      },
    ];

    cases.forEach(({ description, table, piece, player, want }) => {
      it(description, () => {
        const mockRenderFn = () => {};
        const players = 2;
        const size = 4;
        const pieces = distributePieces(
          players,
          shuffleArray(generatePieces(size))
        );
        const domino = new Domino(pieces, mockRenderFn, mockRenderFn, players);
        domino.table.push(...table);

        const result = domino.checkPlay(player, piece);

        assert.deepEqual(result, want);
      });
    });
  });

  describe(".action", () => {
    /**
     * @type {{
     *  description: string;
     *  players: number;
     *  table: [number, number][];
     *  pieces: [number, number][][];
     *  pieceIndex: number;
     *  wantTable: [number, number][];
     *  wantPieces: [number, number][][];
     * }[]}
     */
    const cases = [
      {
        description: "adds a piece to the table",
        players: 2,
        table: [],
        pieces: [[[0, 0]], []],
        pieceIndex: 0,
        wantTable: [[0, 0]],
        wantPieces: [[], []],
      },
      {
        description:
          "does nothing when there is no matching piece at the ends of the table",
        players: 2,
        table: [[0, 1]],
        pieces: [[[2, 2]], []],
        pieceIndex: 0,
        wantTable: [[0, 1]],
        wantPieces: [[[2, 2]], []],
      },
      {
        description: "adds a piece matching one of the ends of the table",
        players: 2,
        table: [[0, 2]],
        pieces: [[[2, 1]], []],
        pieceIndex: 0,
        wantTable: [
          [0, 2],
          [2, 1],
        ],
        wantPieces: [[], []],
      },
      {
        description: "adds a piece matching one of the ends of the table",
        players: 2,
        table: [[0, 2]],
        pieces: [[[0, 1]], []],
        pieceIndex: 0,
        wantTable: [
          [1, 0],
          [0, 2],
        ],
        wantPieces: [[], []],
      },
    ];

    cases.forEach(
      ({
        description,
        players,
        table,
        pieces,
        pieceIndex,
        wantTable,
        wantPieces,
      }) => {
        it(description, () => {
          const mockRenderFn = () => {};
          const domino = new Domino(
            pieces,
            mockRenderFn,
            mockRenderFn,
            players
          );
          domino.table.push(...table);

          domino.action(0, pieceIndex);

          assert.deepEqual(domino.table, wantTable);
          assert.deepEqual(domino.distributedPieces, wantPieces);
        });
      }
    );
  });
});
