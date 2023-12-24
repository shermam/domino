import { it, describe } from "node:test";
import assert from "node:assert";
import { distributePieces, generatePieces } from "./domino.js";

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
