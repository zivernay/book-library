const libraryBooks = [];

function Book(author, title, pages, status) {
    this.author = (author)? author : "Unknown";
    this.title = (title)? title : "Unknown";
    this.pages = (pages)? pages : null;
    this.status = (status)? status : "Unknown"
}

/*
returns Success message with added book title
*/
function addNewBook() {
    const newBook = new Book (author, title, pages, status)
    libraryBooks.push(newBook)
    return `Added new book with title: ${newBook.author}`
}