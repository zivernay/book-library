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


// events
const addBookButtons = document.querySelectorAll(".displayButton");
for (let button of addBookButtons) {
    button.addEventListener("click", displayForm)
}
function displayForm() {
    const popUpForm = document.querySelector(".bookDetails.popup-card");
    popUpForm.classList.toggle("hidden");
}

const saveBookButton = document.querySelector(".saveBook");
saveBookButton.addEventListener("click", createNewBook);
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

function resetForm() {
    const dataForm = document.querySelector(".dataForm");
    dataForm.reset();
}
/*
returns Success message with added book title
*/
function createNewBook() {
    const data = getNewBookData()
    const newBook = new Book (...data)
    libraryBooks.push(newBook)
    const index = libraryBooks.indexOf(newBook);
    addBookToShelf(data, index)
    alert `${newBook.author} successfully added`
    displayForm();
    resetForm();
}

/*
@params :
*/
function addBookToShelf(bookProperties, index) {
    const bookShelf = document.querySelector("#bookShelf");
    const tableRow = document.createElement("tr");
    tableRow.setAttribute(`data-bookID`, index);
    for (let i = 0; i < 3; i++) {
        const td = document.createElement("td");
        td.textContent = bookProperties[i];
        tableRow.appendChild(td);
    }
    bookShelf.appendChild(tableRow);
}
