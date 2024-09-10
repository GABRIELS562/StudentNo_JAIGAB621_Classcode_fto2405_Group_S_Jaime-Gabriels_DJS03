export function createOptionElement(value, text) {
  const option = document.createElement("option");
  option.value = value;
  option.innerText = text;
  return option;
}

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
