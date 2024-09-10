import { books, authors, genres, BOOKS_PER_PAGE } from "./data.js"; // imports the data

let page = 1; // counter which tracks which books viewing. set to 1
let matches = books; // book array, list of books displayed

// const starting = document.createDocumentFragment(); //A DocumentFragment is created to hold the book preview elements temporarily. This is used to optimize performance by avoiding multiple reflows/repaints when appending elements to the DOM one at a time.

// for (const { author, id, image, title } of matches.slice(0, BOOKS_PER_PAGE)) {
// 	const element = document.createElement("button");
// 	element.classList = "preview";
// 	element.setAttribute("data-preview", id);

// 	element.innerHTML = `
//         <img
//             class="preview__image"
//             src="${image}"
//         />

//         <div class="preview__info">
//             <h3 class="preview__title">${title}</h3>
//             <div class="preview__author">${authors[author]}</div>
//         </div>
//     `;

// 	starting.appendChild(element);
// }

// document.querySelector("[data-list-items]").appendChild(starting);

//The book preview creation and rendering were moved into two functions: createBookPreview (which generates individual book elements) and renderBookList (which handles batch rendering).
function createBookPreview(book) {
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
function renderBookList(bookList, container, start = 0, end = BOOKS_PER_PAGE) {
	const fragment = document.createDocumentFragment();
	bookList.slice(start, end).forEach((book) => {
		const previewElement = createBookPreview(book);
		fragment.appendChild(previewElement);
	});
	container.appendChild(fragment);
}
renderBookList(matches, document.querySelector("[data-list-items]"));

// const genreHtml = document.createDocumentFragment();
// const firstGenreElement = document.createElement("option");
// firstGenreElement.value = "any";
// firstGenreElement.innerText = "All Genres";
// genreHtml.appendChild(firstGenreElement);

// //Generate genre options dynamically: Loops through the genres object, creating an option for each genre with its corresponding id and name, appending each option to the genreHtml fragment.
// for (const [id, name] of Object.entries(genres)) {
// 	const element = document.createElement("option");
// 	element.value = id;
// 	element.innerText = name;
// 	genreHtml.appendChild(element);
// }
function createOptionElement(value, text) {
	const option = document.createElement("option");
	option.value = value;
	option.innerText = text;
	return option;
}

function renderDropdownOptions(options, container, defaultOptionText = "Any") {
	const fragment = document.createDocumentFragment();
	const defaultOption = createOptionElement("any", defaultOptionText);
	fragment.appendChild(defaultOption);

	options.forEach((option) => {
		const optionElement = createOptionElement(option.id, option.name);
		fragment.appendChild(optionElement);
	});

	container.appendChild(fragment);
}

// Usage for Genres
// Convert `genres` and `authors` objects to arrays of {id, name} format

const genreObjects = Object.entries(genres).map(([id, name]) => ({ id, name }));
const authorObjects = Object.entries(authors).map(([id, name]) => ({
	id,
	name,
}));
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

//Repeat spotted!!!
document.querySelector("[data-search-genres]").appendChild(genreHtml);

//	Create author options: Similar to genres, initializes a DocumentFragment for author options and creates a default “All Authors” option.
const authorsHtml = document.createDocumentFragment();
const firstAuthorElement = document.createElement("option");
firstAuthorElement.value = "any";
firstAuthorElement.innerText = "All Authors";
authorsHtml.appendChild(firstAuthorElement);

for (const [id, name] of Object.entries(authors)) {
	const element = document.createElement("option");
	element.value = id;
	element.innerText = name;
	authorsHtml.appendChild(element);
}

document.querySelector("[data-search-authors]").appendChild(authorsHtml);
//Theme detection: Detects whether the user prefers a dark theme using the window.matchMedia() API. If so, it applies the dark theme by updating CSS variables (--color-dark and --color-light) and sets the theme selector to “night.” Otherwise, it applies the light theme.
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
//Sets the button text to show how many more books are left to load.Disables the button if there are no more books left to show on subsequent pages.
document.querySelector("[data-list-button]").innerText =
	`Show more (${books.length - BOOKS_PER_PAGE})`;
document.querySelector("[data-list-button]").disabled =
	matches.length - page * BOOKS_PER_PAGE > 0;
//Dynamic “Show more” button: Updates the “Show more” button with the remaining number of books.
document.querySelector("[data-list-button]").innerHTML = `
    <span>Show more</span>
    <span class="list__remaining"> (${matches.length - page * BOOKS_PER_PAGE > 0 ? matches.length - page * BOOKS_PER_PAGE : 0})</span>
`;

document.querySelector("[data-search-cancel]").addEventListener("click", () => {
	document.querySelector("[data-search-overlay]").open = false;
});
//Search cancel button: Adds an event listener to the cancel button, closing the search overlay when clicked.
document
	.querySelector("[data-settings-cancel]")
	.addEventListener("click", () => {
		document.querySelector("[data-settings-overlay]").open = false;
	});
//Settings cancel button: Adds an event listener to close the settings overlay when the cancel button is clicked.
document.querySelector("[data-header-search]").addEventListener("click", () => {
	document.querySelector("[data-search-overlay]").open = true;
	document.querySelector("[data-search-title]").focus();
});
//Open search overlay: Adds an event listener to open the search overlay and focus the search title input when the search button is clicked.
document
	.querySelector("[data-header-settings]")
	.addEventListener("click", () => {
		document.querySelector("[data-settings-overlay]").open = true;
	});
//Open settings overlay: Adds an event listener to open the settings overlay when the settings button is clicked.
document.querySelector("[data-list-close]").addEventListener("click", () => {
	document.querySelector("[data-list-active]").open = false;
});
//Close active book overlay: Adds an event listener to close the active book details overlay when the close button is clicked.
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
//	Submit settings form: Adds an event listener for the settings form submission. It extracts the selected theme and applies the corresponding CSS variables. Afterward, the settings overlay is closed.
document
	.querySelector("[data-search-form]")
	.addEventListener("submit", (event) => {
		event.preventDefault(); //event.preventDefault(): Prevents the page from reloading.
		const formData = new FormData(event.target);
		const filters = Object.fromEntries(formData); //	Form data: Extracts the input values from the form into an object called filters.
		const result = []; //Event listener: When the search form is submitted, it triggers this function.

		for (const book of books) {
			let genreMatch = filters.genre === "any";

			for (const singleGenre of book.genres) {
				if (genreMatch) break;
				if (singleGenre === filters.genre) {
					genreMatch = true;
				}
			}

			if (
				(filters.title.trim() === "" ||
					book.title.toLowerCase().includes(filters.title.toLowerCase())) &&
				(filters.author === "any" || book.author === filters.author) &&
				genreMatch
			) {
				result.push(book);
			}
		}
		//	•	Looping through books: The code loops over all available books (books array).Genre filter: Checks if the genre matches the filter (or if “any” is selected).Title and author filters: It also checks whether the title contains the search term and if the author matches the selected filter. If all conditions are satisfied, the book is added to the result array.
		page = 1;
		matches = result;

		if (result.length < 1) {
			//	Reset page counter: The page is reset to 1 to show the first page of results.No results: If no books are found, a message is displayed (list__message_show). Otherwise, it’s hidden.
			document
				.querySelector("[data-list-message]")
				.classList.add("list__message_show");
		} else {
			document
				.querySelector("[data-list-message]")
				.classList.remove("list__message_show");
		}
		//Clear previous results: The data-list-items container is emptied to remove old book previews.Render new results: Loops through the first set of search results (up to BOOKS_PER_PAGE) and dynamically generates button elements for each book, which are added to the page.
		document.querySelector("[data-list-items]").innerHTML = "";
		const newItems = document.createDocumentFragment();

		for (const { author, id, image, title } of result.slice(
			0,
			BOOKS_PER_PAGE,
		)) {
			const element = document.createElement("button");
			element.classList = "preview";
			element.setAttribute("data-preview", id);

			element.innerHTML = `
            <img
                class="preview__image"
                src="${image}"
            />
            
            <div class="preview__info">
                <h3 class="preview__title">${title}</h3>
                <div class="preview__author">${authors[author]}</div>
            </div>
        `;

			newItems.appendChild(element);
		}
		//	Disable button: If there are no more books to show, the “Show More” button is disabled.Update button text: Displays how many books are left to load.

		document.querySelector("[data-list-items]").appendChild(newItems);
		document.querySelector("[data-list-button]").disabled =
			matches.length - page * BOOKS_PER_PAGE < 1;

		document.querySelector("[data-list-button]").innerHTML = `
        <span>Show more</span>
        <span class="list__remaining"> (${matches.length - page * BOOKS_PER_PAGE > 0 ? matches.length - page * BOOKS_PER_PAGE : 0})</span>
    `;

		window.scrollTo({ top: 0, behavior: "smooth" });
		document.querySelector("[data-search-overlay]").open = false;
	});
//Load more results: When “Show More” is clicked, it adds the next page of book previews to the list.Update page: The page number is incremented so that the next click loads further results.

document.querySelector("[data-list-button]").addEventListener("click", () => {
	const fragment = document.createDocumentFragment();

	for (const { author, id, image, title } of matches.slice(
		page * BOOKS_PER_PAGE,
		(page + 1) * BOOKS_PER_PAGE,
	)) {
		const element = document.createElement("button");
		element.classList = "preview";
		element.setAttribute("data-preview", id);

		element.innerHTML = `
            <img
                class="preview__image"
                src="${image}"
            />
            
            <div class="preview__info">
                <h3 class="preview__title">${title}</h3>
                <div class="preview__author">${authors[author]}</div>
            </div>
        `;

		fragment.appendChild(element);
	}

	document.querySelector("[data-list-items]").appendChild(fragment);
	page += 1;
});
//Event delegation: Listens for clicks on any book preview in the list. It checks if the clicked element has a data-preview attribute, which holds the book’s ID.Find book details: The corresponding book object is found by matching the ID, and the book’s details (title, author, year, image, description) are displayed in a modal.
document
	.querySelector("[data-list-items]")
	.addEventListener("click", (event) => {
		const pathArray = Array.from(event.path || event.composedPath());
		let active = null;

		for (const node of pathArray) {
			if (active) break;

			if (node?.dataset?.preview) {
				let result = null;

				for (const singleBook of books) {
					if (result) break;
					if (singleBook.id === node?.dataset?.preview) result = singleBook;
				}

				active = result;
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
