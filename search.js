import { filterBooks } from "./utils.js";
import { renderBookList, updateShowMoreButton } from "./Ui.js";

export function setupSearchForm(form, books, matches, page) {
  form.addEventListener("submit", (event) => {
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
}
