const addBookButtons = document.querySelectorAll(".displayButton");
const deleteBookButton = document.querySelector(".deleteBook");
const libraryBooks = [];
const properties = ['title', 'authour', 'pages', 'status', 'created', 'owner']
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
Create delete button
@params :
    {index: number}
return:
    button element
*/
function createNewButton(index) {
    const btn = document.createElement("button");
    btn.setAttribute('class', "deleteBook");
    btn.setAttribute(`data-btn-id`, index);
    btn.textContent = "Delete";
    return btn
}

/*
Create a table row to represent a book entry with basic book data
@params :
    {data: array}
    {index: number} 
return :
    tablerow element
*/
function createTableRow(data, index) {
    const tableRow = document.createElement("tr");
    tableRow.setAttribute(`data-book-id`, index);
    for (let i = 0; i < 3; i++) {
        const td = document.createElement("td");
        td.textContent = data[i];
        tableRow.appendChild(td);
    }
    return tableRow
}

/*
Creates a details element with extra book properties
@params :
    none
return :
    populated details element
*/
function createDetailsElement(data, properties){
    const details = document.createElement("details");
    const summary = document.createElement("summary");
    summary.textContent = '...';
    details.appendChild(summary);
    const propCount = data.length;
    for (let i = 3; i < propCount; i++) {
        const propRow = document.createElement('div');
        const prop = document.createElement("span");
        const propValue = document.createElement("span");
        prop.textContent = properties[i];
        propValue.textContent = data[i];
        propRow.appendChild(prop)
        propRow.appendChild(propValue)
        details.appendChild(propRow);

    }
    return details
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
    const bookShelf = document.querySelector("#bookShelf tbody");
    const btn = createNewButton(index);
    const options = document.createElement("td");
    const rm = document.createElement("td");
    rm.classList.add("hide");
    const tableRow = createTableRow(bookProperties, index)
    btn.addEventListener("click", (e)=>{deleteBook(e.target)});
    rm.appendChild(btn);
    const dtls = createDetailsElement(bookProperties, properties);
    options.appendChild(dtls);
    tableRow.appendChild(options);
    tableRow.appendChild(rm);
    bookShelf.appendChild(tableRow);
}

/*
Remove a book from the bookShelf row
@params:
    bookID: string
return:
    none
*/
function removeBookFromShelf(bookID) {
    const book = document.querySelector(`[data-book-id="${bookID}"]`);
    book.remove()
}

/*
Get the index of the book object using a key
@params:
    bookID: string
return:
    index: number
*/
function getBookIndex(bookID) {
    return parseInt(bookID)
}

/*
Delete a book from the library
@params:
    none
return:
    none
*/
function deleteBook(btn) {
    const bookID = btn.getAttribute('data-btn-id');
    const index = getBookIndex(bookID);
    const removedBook = libraryBooks.splice(index, 1);
    removeBookFromShelf(bookID);
    alert(`${removedBook.bookTitle} has been deleted`)
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