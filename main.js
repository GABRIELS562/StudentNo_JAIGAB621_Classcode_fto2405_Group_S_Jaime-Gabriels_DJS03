import { books, authors, genres, BOOKS_PER_PAGE } from "./data.js"; // Import the data
import {
  renderBookList,
  renderDropdownOptions,
  updateShowMoreButton,
  filterBooks,
} from "./utils.js"; // Import the utility functions

let page = 1; // counter which tracks which books are being viewed
let matches = books; // book array, list of books displayed

// Ensure that the initial book list renders on page load
renderBookList(
  matches,
  document.querySelector("[data-list-items]"),
  authors,
  0,
  32,
);
updateShowMoreButton(
  matches,
  page,
  document.querySelector("[data-list-button]"),
  BOOKS_PER_PAGE,
);

// Convert `genres` and `authors` objects to arrays of {id, name} format
const genreObjects = Object.entries(genres).map(([id, name]) => ({ id, name }));
const authorObjects = Object.entries(authors).map(([id, name]) => ({
  id,
  name,
}));

// Usage for Genres
renderDropdownOptions(
  genreObjects,
  document.querySelector("[data-search-genres]"),
  "All Genres",
);

// Usage for Authors
renderDropdownOptions(
  authorObjects,
  document.querySelector("[data-search-authors]"),
  "All Authors",
);

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

    if (theme === "night") {
      document.documentElement.style.setProperty(
        "--color-dark",
        "255, 255, 255",
      );
      document.documentElement.style.setProperty("--color-light", "10, 10, 20");
    } else {
      document.documentElement.style.setProperty("--color-dark", "10, 10, 20");
      document.documentElement.style.setProperty(
        "--color-light",
        "255, 255, 255",
      );
    }

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
        authors,
      );
      updateShowMoreButton(
        matches,
        page,
        document.querySelector("[data-list-button]"),
        BOOKS_PER_PAGE,
      );
    }

    window.scrollTo({ top: 0, behavior: "smooth" });
    document.querySelector("[data-search-overlay]").open = false;
  });

// Load more results on button click
document.querySelector("[data-list-button]").addEventListener("click", () => {
  renderBookList(
    matches,
    document.querySelector("[data-list-items]"),
    authors,
    page * BOOKS_PER_PAGE,
    (page + 1) * BOOKS_PER_PAGE,
  );
  page += 1;
  updateShowMoreButton(
    matches,
    page,
    document.querySelector("[data-list-button]"),
    BOOKS_PER_PAGE,
  );
});

// Event delegation to show book details
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

// Theme detection
if (
  window.matchMedia &&
  window.matchMedia("(prefers-color-scheme: dark)").matches
) {
  document.querySelector("[data-settings-theme]").value = "night";
  document.documentElement.style.setProperty("--color-dark", "255, 255, 255");
  document.documentElement.style.setProperty("--color-light", "10, 10, 20");
} else {
  document.querySelector("[data-settings-theme]").value = "day";
  document.documentElement.style.setProperty("--color-dark", "10, 10, 20");
  document.documentElement.style.setProperty("--color-light", "255, 255, 255");
}
