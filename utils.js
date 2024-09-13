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
  const element = document.createElement("button");// creates button element 
  element.classList.add("preview"); //assign the class preview to button
  element.setAttribute("data-preview", book.id);// Set a custom attribute 'data-preview' with the book's id

  // Define the HTML structure of the book preview, displaying image, title, and author
  element.innerHTML = `
        <img class="preview__image" src="${book.image}" />
        <div class="preview__info">
            <h3 class="preview__title">${book.title}</h3>
            <div class="preview__author">${authors[book.author]}</div>
        </div>`;

         // Return the created element (book preview button)
  return element;
}

// Function to render a list of book previews on page
export function renderBookList(// Have this function in main.js which states 32books
  bookList,
  container,
  authors,
  start = 0,
  end = 10,
) {
  const fragment = document.createDocumentFragment();// Create a document fragment to efficiently append multiple elements
  bookList.slice(start, end).forEach((book) => {
    const previewElement = createBookPreview(book, authors);// Create a book preview
    fragment.appendChild(previewElement);// Append it to the fragment
  });
  container.appendChild(fragment);// Append the fragment with all book previews to the container
}

//This function creates a dropdown <option> element for filters like genres and authors.
export function createOptionElement(value, text) {
  const option = document.createElement("option");// Create an option element
  option.value = value;// Set the option's value
  option.innerText = text;// Set the option's display text
  return option;// Return the created option element
}

// Function to render dropdown options
/**
 * @param {any[]} options
 * @param {{ appendChild: (arg0: DocumentFragment) => void; }} container
 */
export function renderDropdownOptions(//This function renders the options for a dropdown (such as genres or authors) into the specified container.
  options,
  container,
  defaultOptionText = "Any",//Purpose: Efficiently populates a dropdown (e.g., genre or author filter) with all the necessary options, including a default “Any” option
) {
  const fragment = document.createDocumentFragment();// Create a document fragment
  const defaultOption = createOptionElement("any", defaultOptionText);// Create a default 'Any' option
  fragment.appendChild(defaultOption);// Append the default option to the fragment

  options.forEach((option) => {
    const optionElement = createOptionElement(option.id, option.name); // Create an option for each item
    fragment.appendChild(optionElement);// Append each option to the fragment
  });

  container.appendChild(fragment);  // Append the fragment containing all options to the container
}

// Function to update the Show More button
export function updateShowMoreButton(matches, page, button, BOOKS_PER_PAGE) {// Calculate the number of remaining books
  const remainingBooks = matches.length - page * BOOKS_PER_PAGE;
  button.disabled = remainingBooks < 1;// Disable the button if no books are left
  button.innerHTML = `
        <span>Show more</span>
        <span class="list__remaining"> (${remainingBooks > 0 ? remainingBooks : 0})</span> 
    `;
}// Update the button text with the remaining books count

// Function to filter books based on search criteria (title, author, genre)
export function filterBooks({ title, author, genre }, bookList) {
  return bookList.filter((book) => {
    const titleMatch =
      title.trim() === "" || // If title filter is empty, match all titles
      book.title.toLowerCase().includes(title.toLowerCase()); // Otherwise, check if the title includes the search term

    const authorMatch = author === "any" || book.author === author; // Match if the author is "any" or matches the selected author ID

    const genreMatch = genre === "any" || book.genres.includes(genre); // Match if genre is "any" or is included in the book's genre array

    return titleMatch && authorMatch && genreMatch; // Return true if all conditions match
  });
}