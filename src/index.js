import { Domino } from "./domino.js";
import { renderPieces } from "./ui.js";

/** @type {HTMLDivElement | null} */
const mainDiv = document.querySelector("#main");
if (!mainDiv) throw new Error("Main div is not defined");
const domino = new Domino(7, renderPieces(mainDiv), 2);
domino.renderPlayerPiceces(0);
