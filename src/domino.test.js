import { it, describe } from "node:test";
import assert from "node:assert";
import { Domino, distributePieces, generatePieces } from "./domino.js";

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
  describe(".checkPlay", () => {
    /**
     * @type {{
     *  description: string;
     *  table: [number, number][];
     *  piece: [number, number];
     *  player: number;
     *  want: boolean;
     * }[]}
     */
    const cases = [
      {
        description: "returns false when it is not the player's turn",
        table: [],
        piece: [0, 0],
        player: 1,
        want: false,
      },
      {
        description: "returns true when table is empty",
        table: [],
        piece: [0, 0],
        player: 0,
        want: true,
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
        want: true,
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
        want: true,
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
        want: true,
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
        want: true,
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
        want: false,
      },
    ];

    cases.forEach(({ description, table, piece, player, want }) => {
      it(description, () => {
        const mockRenderFn = () => {};
        const domino = new Domino(4, mockRenderFn, mockRenderFn, 2);
        domino.table.push(...table);

        const result = domino.checkPlay(player, piece);

        assert.equal(result, want);
      });
    });
  });
});
