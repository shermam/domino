const html = String.raw;

/**
 *
 * @param {HTMLDivElement} divElement
 * @returns {(pieces: [number, number][], play?: (pieceIndex: number) => void) => void}
 */
export const renderPieces = (divElement) => (pieces, play) => {
  divElement.innerHTML = pieces
    .map(
      ([n1, n2], index) => html`
        <button class="piece" id="${index}">
          <p>${n1}</p>
          <div class="divider"></div>
          <p>${n2}</p>
        </button>
      `
    )
    .join("");

  if (!play) return;

  const buttons = Array.from(divElement.querySelectorAll("button"));

  buttons.forEach((button) => {
    button.addEventListener("click", () => {
      if (!button.classList.contains("piece")) return;

      // The id of the button is expected to be the index
      // of the piece in the array
      const id = +button.id;

      // Fixing player 0 as the action taker for now
      play(id);
    });
  });
};
