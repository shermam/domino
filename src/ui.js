const html = String.raw;

/**
 *
 * @param {HTMLDivElement} divElement
 * @returns {(pieces: [number, number][]) => void}
 */
export const renderPieces = (divElement) => (pieces) => {
  divElement.innerHTML = pieces
    .map(
      ([n1, n2]) => html`
        <button class="piece">
          <p>${n1}</p>
          <div class="divider"></div>
          <p>${n2}</p>
        </button>
      `
    )
    .join("");
};
