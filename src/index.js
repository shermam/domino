import { distributePieces, generatePieces, shuffleArray } from "./domino.js";
import { renderPieces } from "./ui.js";

/** @type {HTMLDivElement | null} */
const mainDiv = document.querySelector("#main");
const shuffledPieces = shuffleArray(generatePieces());
const distributedPieces = distributePieces(2, shuffledPieces);

const player0Pieces = distributedPieces[0];
if (!player0Pieces) throw new Error("Pieces for player 0 is not defined");
if (!mainDiv) throw new Error("Main div is not defined");

renderPieces(player0Pieces, mainDiv);
