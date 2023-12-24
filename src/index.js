import { distributePieces, generatePieces, shuffleArray } from "./domino.js";

const mainDiv = document.querySelector("#main");
const shuffledPieces = shuffleArray(generatePieces());
const distributedPieces = distributePieces(2, shuffledPieces);

mainDiv.innerHTML = JSON.stringify(distributedPieces, null, 2);
