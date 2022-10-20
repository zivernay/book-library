const addBookButtons = document.querySelectorAll(".displayButton");
const libraryBooks = [];
const saveBookButton = document.querySelector(".saveBook");

//book constructor
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
Show or hide the form for book properties
@paras:
    none
returns:
    none
*/
function displayForm() {
    const popUpForm = document.querySelector(".bookDetails.popup-card");
    popUpForm.classList.toggle("hidden");
}

/*
Read the form data and return a list of book properties:
@params: 
    none
returns:
    0. {bookTitle :text}
    1. {bookAuthor :text}
    2. {bookPageCount :number}
    3. {bookStatus :text}
    4. {bookAdditionTimestamp :datetime}
    5. {bookOwner :text}
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
Clear all form data
@params:
    none
returns:
    none
*/
function resetForm() {
    const dataForm = document.querySelector(".dataForm");
    dataForm.reset();
}

/*
Display book properties to into the bookShelf table
@params :
    bookProperties: array -> contain book properties as string
    index: number -> position of the book in the {bookLibrary} array being used as id
return:
    none
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

/*
Use the fetched data to create a book object and add it to books
@params:
    none
return:
    string ->Success message with added book title
*/
function createNewBook() {
    const data = getNewBookData()
    const newBook = new Book (...data)
    libraryBooks.push(newBook)
    const index = libraryBooks.indexOf(newBook);
    addBookToShelf(data, index);
    alert(`${newBook.bookTitle} by ${newBook.bookAuthor} successfully added`);
    displayForm();
    resetForm();
}


// events
for (let button of addBookButtons) {
    //Toggle the popup form to display and disappear
    button.addEventListener("click", displayForm)
}
saveBookButton.addEventListener("click", createNewBook);
