import { authors, BOOKS_PER_PAGE } from "./data.js";

// Function to create a book preview element
export function createBookPreview(book) {
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
  start = 0,
  end = BOOKS_PER_PAGE,
) {
  const fragment = document.createDocumentFragment();
  bookList.slice(start, end).forEach((book) => {
    const previewElement = createBookPreview(book);
    fragment.appendChild(previewElement);
  });
  container.appendChild(fragment);
}
