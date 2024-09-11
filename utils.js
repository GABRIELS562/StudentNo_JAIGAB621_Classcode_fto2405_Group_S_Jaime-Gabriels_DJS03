// @ts-check
// Function to create a book preview element
/**
 * Creates a preview button element for a book.
 *
 * @param {Object} book - The book object containing details like title, author, image, and id.
 * @param {Object} authors - A map of author IDs to author names.
 * @returns {HTMLElement} - The created preview button element.
 */
export function createBookPreview(book, authors) {
  const element = document.createElement("button");
  element.classList = "preview";
  element.setAttribute("data-preview", book.id);

  element.innerHTML = `
        <img class="preview__image" src="${book.image}" />
        <div class="preview__info">
            <h3 class="preview__title">${book.title}</h3>
            <div class="preview__author">${authors[book.author]}</div>
        </div>`;

  return element;
}

// Function to render a list of book previews
export function renderBookList(
  bookList,
  container,
  authors,
  start = 0,
  end = 10,
) {
  const fragment = document.createDocumentFragment();
  bookList.slice(start, end).forEach((book) => {
    const previewElement = createBookPreview(book, authors);
    fragment.appendChild(previewElement);
  });
  container.appendChild(fragment);
}

// Function to create an option element
export function createOptionElement(value, text) {
  const option = document.createElement("option");
  option.value = value;
  option.innerText = text;
  return option;
}

// Function to render dropdown options
export function renderDropdownOptions(
  options,
  container,
  defaultOptionText = "Any",
) {
  const fragment = document.createDocumentFragment();
  const defaultOption = createOptionElement("any", defaultOptionText);
  fragment.appendChild(defaultOption);

  options.forEach((option) => {
    const optionElement = createOptionElement(option.id, option.name);
    fragment.appendChild(optionElement);
  });

  container.appendChild(fragment);
}

// Function to update the Show More button
export function updateShowMoreButton(matches, page, button, BOOKS_PER_PAGE) {
  const remainingBooks = matches.length - page * BOOKS_PER_PAGE;
  button.disabled = remainingBooks < 1;
  button.innerHTML = `
        <span>Show more</span>
        <span class="list__remaining"> (${remainingBooks > 0 ? remainingBooks : 0})</span>
    `;
}

// Function to filter books based on filters
export function filterBooks({ title, author, genre }, bookList) {
  return bookList.filter((book) => {
    const titleMatch =
      title.trim() === "" ||
      book.title.toLowerCase().includes(title.toLowerCase());
    const authorMatch = author === "any" || book.author === author;
    const genreMatch = genre === "any" || book.genres.includes(genre);

    return titleMatch && authorMatch && genreMatch;
  });
}
