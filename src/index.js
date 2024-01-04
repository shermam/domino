import {
  Domino,
  distributePieces,
  generatePieces,
  shuffleArray,
} from "./domino.js";
import { renderPieces } from "./ui.js";

/** @type {HTMLDivElement | null} */
const mainDiv = document.querySelector("#main");
if (!mainDiv) throw new Error("Main div is not defined");
/** @type {HTMLDivElement | null} */
const tableDiv = document.querySelector("#table");
if (!tableDiv) throw new Error("Main div is not defined");

const players = 2;
const size = 7;
const pieces = distributePieces(players, shuffleArray(generatePieces(size)));
const domino = new Domino(
  pieces,
  renderPieces(mainDiv),
  renderPieces(tableDiv),
  players
);
domino.renderPieces();
