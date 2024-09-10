import { books, authors, genres, BOOKS_PER_PAGE } from "./data.js";
import { createBookPreview, renderBookList } from "./bookUtils.js";
import { renderDropdownOptions } from "./dropdownUtils.js";
import { filterBooks } from "./filterUtils.js";
import { applyTheme, detectTheme } from "./themeUtils.js";

let page = 1;
let matches = books;

// Render initial book list
renderBookList(matches, document.querySelector("[data-list-items]"));

// Convert genres and authors to arrays
const genreObjects = Object.entries(genres).map(([id, name]) => ({ id, name }));
const authorObjects = Object.entries(authors).map(([id, name]) => ({
  id,
  name,
}));

// Render dropdowns
renderDropdownOptions(
  genreObjects,
  document.querySelector("[data-search-genres]"),
  "All Genres",
);
renderDropdownOptions(
  authorObjects,
  document.querySelector("[data-search-authors]"),
  "All Authors",
);

// Update Show More button
function updateShowMoreButton(matches, page, button) {
  const remainingBooks = matches.length - page * BOOKS_PER_PAGE;
  button.disabled = remainingBooks < 1;
  button.innerHTML = `
        <span>Show more</span>
        <span class="list__remaining"> (${remainingBooks > 0 ? remainingBooks : 0})</span>
    `;
}

// Event listeners
document.querySelector("[data-search-cancel]").addEventListener("click", () => {
  document.querySelector("[data-search-overlay]").open = false;
});

document
  .querySelector("[data-settings-cancel]")
  .addEventListener("click", () => {
    document.querySelector("[data-settings-overlay]").open = false;
  });

document.querySelector("[data-header-search]").addEventListener("click", () => {
  document.querySelector("[data-search-overlay]").open = true;
  document.querySelector("[data-search-title]").focus();
});

document
  .querySelector("[data-header-settings]")
  .addEventListener("click", () => {
    document.querySelector("[data-settings-overlay]").open = true;
  });

document.querySelector("[data-list-close]").addEventListener("click", () => {
  document.querySelector("[data-list-active]").open = false;
});

document
  .querySelector("[data-settings-form]")
  .addEventListener("submit", (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const { theme } = Object.fromEntries(formData);

    applyTheme(theme);

    document.querySelector("[data-settings-overlay]").open = false;
  });

document
  .querySelector("[data-search-form]")
  .addEventListener("submit", (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const filters = Object.fromEntries(formData);
    const filteredBooks = filterBooks(filters, books);

    matches = filteredBooks;
    document.querySelector("[data-list-items]").innerHTML = "";

    if (filteredBooks.length < 1) {
      document
        .querySelector("[data-list-message]")
        .classList.add("list__message_show");
    } else {
      document
        .querySelector("[data-list-message]")
        .classList.remove("list__message_show");
      renderBookList(
        filteredBooks,
        document.querySelector("[data-list-items]"),
      );
      updateShowMoreButton(
        matches,
        page,
        document.querySelector("[data-list-button]"),
      );
    }

    window.scrollTo({ top: 0, behavior: "smooth" });
    document.querySelector("[data-search-overlay]").open = false;
  });

document.querySelector("[data-list-button]").addEventListener("click", () => {
  renderBookList(
    matches,
    document.querySelector("[data-list-items]"),
    page * BOOKS_PER_PAGE,
    (page + 1) * BOOKS_PER_PAGE,
  );
  page += 1;
});

document
  .querySelector("[data-list-items]")
  .addEventListener("click", (event) => {
    const pathArray = Array.from(event.path || event.composedPath());
    let active = null;

    for (const node of pathArray) {
      if (active) break;

      if (node?.dataset?.preview) {
        active = books.find(
          (singleBook) => singleBook.id === node.dataset.preview,
        );
      }
    }

    if (active) {
      document.querySelector("[data-list-active]").open = true;
      document.querySelector("[data-list-blur]").src = active.image;
      document.querySelector("[data-list-image]").src = active.image;
      document.querySelector("[data-list-title]").innerText = active.title;
      document.querySelector("[data-list-subtitle]").innerText =
        `${authors[active.author]} (${new Date(active.published).getFullYear()})`;
      document.querySelector("[data-list-description]").innerText =
        active.description;
    }
  });

// Detect and apply the theme
detectTheme();
