const libraryBooks = [];

function Book(bookTitle,
    bookAuthor,
    bookPageCount,
    bookStatus,
    bookAdditionTimestamp,
    bookOwner,) {
        this.bookTitle = (bookTitle)? bookTitle : "Unknown";
        this.bookAuthor = (bookAuthor)? bookAuthor : "Unknown";
        this.bookPageCount = (bookPageCount)? bookPageCount : null;
        this.bookStatus = (bookStatus)? bookStatus : "Unread";
        this.bookAdditionTimestamp = (bookAdditionTimestamp)? bookAdditionTimestamp : null;
        this.bookOwner = (bookOwner)? bookOwner : "Unknown";
}

/*
returns an array of new book property values from an HTML form
1. {bookTitle :text}
2. {bookAuthor :text}
3. {bookPageCount :number}
4. {bookStatus :text}
5. {bookAdditionTimestamp :datetime}
6. {bookOwner :text}
*/
function getNewBookData() {
    const data = [];
    const bookProperties = document.querySelectorAll(".bookProperty");
    for (let prop of bookProperties) {
        data.push(prop.value);
    }
    return data
}

/*
returns Success message with added book title
*/
function addNewBook() {
    const data = getNewBookData()
    const newBook = new Book (...data)
    libraryBooks.push(newBook)
    return `Added new book with title: ${newBook.author}`
}

/*
@params :
*/
function addBookToShelf(book, index) {
    const bookShelf = document.querySelector("#bookShelf");
    const tableRow = document.createElement("tr");
    tableRow.setAttribute(`data-${index}`, index);
    for (let i = 0; i < 3; i++) {
        const td = document.createElement("td");
        td.textContent = book[i];
        tableRow.appendChild(td);
    }
    bookShelf.appendChild(tableRow);
}

// events
const addBookButtons = document.querySelectorAll(".displayButton");
for (let button of addBookButtons) {
    button.addEventListener("click", displayForm)
}
function displayForm() {
    const popUpForm = document.querySelector(".bookDetails.popup-card");
    popUpForm.classList.toggle("hidden");
}