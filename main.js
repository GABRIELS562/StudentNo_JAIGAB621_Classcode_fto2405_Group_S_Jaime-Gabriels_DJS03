// @ts-disable
//es-lint disable
import { books, authors, genres, BOOKS_PER_PAGE } from "./data.js"; // Import the data
import {//imports from utils.js
  renderBookList,
  renderDropdownOptions,
  updateShowMoreButton,
  filterBooks,
} from "./utils.js"; // Import the utility functions

let page = 1; // counter which tracks which books are being viewed
let matches = books; // book array, list of books displayed

/**
 * @param {Array} books - Array of book objects.
 * @param {HTMLElement} container - The HTML element where the book list will be rendered.
 * @param {Object} authors - Object containing author details.
 * @param {number} start - The starting index for the book list.
 * @param {number} end - The ending index for the book list.
 */
renderBookList(// Render the initial list of book previews
  matches,
  document.querySelector("[data-list-items]"),
  authors,
  0,
  32, // amount of books that will be displayed on the landing page 
);
// Pagination refers to the process of dividing content (like a list of books, articles, or search results) into discrete pages, allowing users to view a subset of the content at a time rather than displaying all items on a single page. This improves user experience by preventing long load times and overwhelming amounts of data on one screen.In your code, pagination is implemented by:Limiting the number of books displayed per page: Each time a user loads a page, only a set number of books (BOOKS_PER_PAGE) is displayed.Loading more books on button click: When the user clicks the “Show More” button, additional books are displayed without loading all books at once. The page variable tracks how many pages of books have been displayed, and more books are loaded in increments.


/**
 * @param {Array} books - Array of book objects.
 * @param {number} page - The current page number.
 * @param {HTMLElement} button - The HTML element for the "Show More" button.
 * @param {number} booksPerPage - The number of books to display per page.
 */
updateShowMoreButton(
  matches,
  page,
  document.querySelector("[data-list-button]"),
  BOOKS_PER_PAGE,
);
// This updates the “Show More” button by checking how many books are left after rendering the current page.
// If there are books left to display, the button will remain active; otherwise, it will be disabled.


// Convert `genres` and `authors` objects to arrays of {id, name} format
const genreObjects = Object.entries(genres).map(([id, name]) => ({ id, name }));
const authorObjects = Object.entries(authors).map(([id, name]) => ({
  id,
  name,
}));


/**
 * @param {Array} options - Array of genre or author objects.
 * @param {HTMLElement} dropdown - The HTML element for the dropdown.
 * @param {string} defaultOption - The default option for the dropdown.
 */
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

// Event listeners for opening and closing overlays
document.querySelector("[data-search-cancel]").addEventListener("click", () => { // Close the search overlay
  document.querySelector("[data-search-overlay]").open = false;
});

document
  .querySelector("[data-settings-cancel]")
  .addEventListener("click", () => {
    document.querySelector("[data-settings-overlay]").open = false;// Close the settings overlay
  });
// Event listener for opening the search overlay when clicking on the search button
document.querySelector("[data-header-search]").addEventListener("click", () => {
  document.querySelector("[data-search-overlay]").open = true;// Open the search overlay
  document.querySelector("[data-search-title]").focus();// Focus on the search input
});
// Event listener for opening the settings overlay when clicking on the settings button
document
  .querySelector("[data-header-settings]")
  .addEventListener("click", () => {
    document.querySelector("[data-settings-overlay]").open = true;// Open the settings overlay
  });

	// •	This event listener closes the active book details overlay when the “Close” button is clicked.
document.querySelector("[data-list-close]").addEventListener("click", () => {
  document.querySelector("[data-list-active]").open = false;
});

// Theme selection logic
document
  .querySelector("[data-settings-form]")
  .addEventListener("submit", (event) => {
    event.preventDefault();// Prevent the default form submission
    const formData = new FormData(event.target);// Collect form data
    const { theme } = Object.fromEntries(formData);// Convert form data to an object
    // Apply the selected theme (night or day) by changing CSS variables
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

	// •	This handles the theme change functionality, allowing users to switch between “night” and “day” themes by updating the CSS variables.
	// •	When the form is submitted, the theme is applied, and the settings overlay is closed.
/**
 * @param {Event} event - The event object from form submission.
 */
// Event listener for search form submission to filter books
document.querySelector("[data-search-form]").addEventListener("submit", (event) => {
  event.preventDefault();

  // Collect form data into an object
  const formData = new FormData(event.target);
  const filters = Object.fromEntries(formData);

  // Filter books based on the form data
  const filteredBooks = filterBooks(filters, books);

  // Update the matches array and clear the book list
  matches = filteredBooks;
  document.querySelector("[data-list-items]").innerHTML = "";

  // Show or hide "No results found" message
  if (filteredBooks.length < 1) {
    document.querySelector("[data-list-message]").classList.add("list__message_show");
  } else {
    document.querySelector("[data-list-message]").classList.remove("list__message_show");

    // Render filtered book list
    renderBookList(filteredBooks, document.querySelector("[data-list-items]"), authors);

    // Update the "Show More" button
    updateShowMoreButton(
      matches,
      page,
      document.querySelector("[data-list-button]")
    );
  }

  // Scroll to the top and close the search overlay
  window.scrollTo({ top: 0, behavior: "smooth" });
  document.querySelector("[data-search-overlay]").open = false;
});
// This handles the search form submission. The form data is collected and used to filter the list of books.
// 	•	If no books are found, a “No results found” message is shown. If books are found, they are displayed, and the “Show More” button is updated accordingly.
// 	•	The page scrolls to the top, and the search overlay is closed.


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
document //An event listener is attached to the data-list-items element. This element contains the list of book previews.
// •	The event listener listens for a “click” event. When any part of the data-list-items area is clicked, the function is triggered.

  .querySelector("[data-list-items]")
  .addEventListener("click", (event) => {
    const pathArray = Array.from(event.path || event.composedPath());
    let active = null;
//. Finding the Clicked Book
    for (const node of pathArray) {
      if (active) break;

      if (node?.dataset?.preview) {
        active = books.find(
          (singleBook) => singleBook.id === node.dataset.preview,
        );
      }
    }
//Displaying the Book Details
    if (active) {
      document.querySelector("[data-list-active]").open = true; //document.querySelector("[data-list-active]").open = true;: This opens the dialog (<dialog> element) that will show the book details.
      document.querySelector("[data-list-blur]").src = active.image;//The blurred background image of the book cover.
      document.querySelector("[data-list-image]").src = active.image;//The main book cover image.
      document.querySelector("[data-list-title]").innerText = active.title;//The title of the book.
      document.querySelector("[data-list-subtitle]").innerText =// The author’s name and publication year.
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
