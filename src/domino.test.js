import { it, describe } from "node:test";
import assert from "node:assert";
import { distributePieces } from "./domino.js";

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
