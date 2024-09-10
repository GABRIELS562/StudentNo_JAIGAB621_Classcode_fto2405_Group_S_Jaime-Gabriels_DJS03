import { BOOKS_PER_PAGE } from "./data.js";
import { createOptionElement } from "./utils.js";

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

export function updateShowMoreButton(matches, page, button) {
  const remainingBooks = matches.length - page * BOOKS_PER_PAGE;
  button.disabled = remainingBooks < 1;
  button.innerHTML = `
        <span>Show more</span>
        <span class="list__remaining"> (${remainingBooks > 0 ? remainingBooks : 0})</span>
    `;
}
