const html = String.raw;

/**
 *
 * @param {[number, number][]} pieces
 * @param {HTMLDivElement} divElement
 */
export function renderPieces(pieces, divElement) {
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
}
