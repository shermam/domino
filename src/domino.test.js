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
    it("returns false when it is not the player's turn", () => {
      const mockRenderFn = () => {};
      const domino = new Domino(4, mockRenderFn, mockRenderFn, 2);

      const result = domino.checkPlay(1, [0, 0]);

      assert.equal(result, false);
    });

    it("returns true when table is empty", () => {
      const mockRenderFn = () => {};
      const domino = new Domino(4, mockRenderFn, mockRenderFn, 2);

      const result = domino.checkPlay(0, [0, 0]);

      assert.equal(result, true);
    });

    it("returns true when first number of the first piece on the table matches the first number of arg piece", () => {
      const mockRenderFn = () => {};
      const domino = new Domino(4, mockRenderFn, mockRenderFn, 2);
      domino.table.push([0, 1], [1, 2]);

      const result = domino.checkPlay(0, [0, 3]);

      assert.equal(result, true);
    });

    it("returns true when first number of the first piece on the table matches the last number of arg piece", () => {
      const mockRenderFn = () => {};
      const domino = new Domino(4, mockRenderFn, mockRenderFn, 2);
      domino.table.push([0, 1], [1, 2]);

      const result = domino.checkPlay(0, [3, 0]);

      assert.equal(result, true);
    });

    it("returns true when last number of the last piece on the table matches the first number of arg piece", () => {
      const mockRenderFn = () => {};
      const domino = new Domino(4, mockRenderFn, mockRenderFn, 2);
      domino.table.push([0, 1], [1, 2]);

      const result = domino.checkPlay(0, [2, 3]);

      assert.equal(result, true);
    });

    it("returns true when last number of the last piece on the table matches the last number of arg piece", () => {
      const mockRenderFn = () => {};
      const domino = new Domino(4, mockRenderFn, mockRenderFn, 2);
      domino.table.push([0, 1], [1, 2]);

      const result = domino.checkPlay(0, [3, 2]);

      assert.equal(result, true);
    });

    it("returns false when no number of the arg piece matches either end of the table", () => {
      const mockRenderFn = () => {};
      const domino = new Domino(4, mockRenderFn, mockRenderFn, 2);
      domino.table.push([0, 1], [1, 2]);

      const result = domino.checkPlay(0, [3, 3]);

      assert.equal(result, false);
    });
  });
});
