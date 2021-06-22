const BOOK_ISNT_READ = "books";
const BOOK_IS_READ = "completed-books";
const BOOK_ID = "itemId";

function readBook(data, textauthor, yearReleased, isCompleted) {

    const textTitle = document.createElement("h2");
    textTitle.innerText = data;

    const textAuthors = document.createElement("h3");
    textAuthors.innerText = textauthor;

    const textyearReleased = document.createElement("p");
    textyearReleased.innerText = yearReleased;

    const textContainer = document.createElement("div");
    textContainer.classList.add("inner")
    textContainer.append(textTitle, textAuthors, textyearReleased);

    const container = document.createElement("div");
    container.classList.add("item", "shadow")
    container.append(textContainer);

    if (isCompleted) {
        container.append(
            createUndoButton(),
            createTrashButton()
        );
    } else {
        container.append(
            createCheckButton(),
            createTrashButton()
        );
    }

    return container;
}

function createUndoButton() {
    return createButton("undo-button", function (event) {
        undoTaskFromCompleted(event.target.parentElement);
    });
}

function createTrashButton() {
    return createButton("trash-button", function (event) {
        removeTaskFromCompleted(event.target.parentElement);
    });
}

function createCheckButton() {
    return createButton("check-button", function (event) {
        addTaskToCompleted(event.target.parentElement);
    });
}

function createButton(buttonTypeClass /* string */, eventListener /* callback function */) {
    const button = document.createElement("button");
    button.classList.add(buttonTypeClass);
    button.addEventListener("click", function (event) {
        eventListener(event);
        event.stopPropagation();
    });
    return button;
}

function addToReadnt() {
    const bookIsntRead = document.getElementById(BOOK_ISNT_READ);
    const textTitle = document.getElementById("title").value;
    const textAuthor = document.getElementById("author").value;
    const yearReleased = document.getElementById("number").value;

    const book = readBook(textTitle, textAuthor, yearReleased, false);
    const bookObject = composeBookObject(textTitle, textAuthor, yearReleased, false);

    book[BOOK_ID] = bookObject.id;
    books.push(bookObject);

    bookIsntRead.append(book);
    updateDataToStorage();
}

function addToRead() { // addTodo2
    const listCompleted = document.getElementById(BOOK_IS_READ);
    const textTitle = document.getElementById("title").value;
    const textAuthor = document.getElementById("author").value;
    const yearReleased = document.getElementById("number").value;

    const book = readBook(textTitle, textAuthor, yearReleased, true);
    const bookObject = composeBookObject(textTitle, textAuthor, yearReleased, true);

    book[BOOK_ID] = bookObject.id;
    books.push(bookObject);

    listCompleted.append(book);
    updateDataToStorage();
}

function addTaskToCompleted(bookElement /* HTMLELement */) {
    const listCompleted = document.getElementById(BOOK_IS_READ);
    const bookTitle = bookElement.querySelector(".inner > h2").innerText;
    const bookAuthor = bookElement.querySelector(".inner > h3").innerText;
    const bookyearReleased = bookElement.querySelector(".inner > p").innerText;

    const newBook = readBook(bookTitle, bookAuthor, bookyearReleased, true);

    const book = findBook(bookElement[BOOK_ID]);
    book.isCompleted = true;
    newBook[BOOK_ID] = book.id;

    listCompleted.append(newBook);
    bookElement.remove();

    updateDataToStorage();
}

function removeTaskFromCompleted(bookElement /* HTMLELement */) {
    const bookPosition = findBookIndex(bookElement[BOOK_ID]);
    books.splice(bookPosition, 1);

    bookElement.remove();
    updateDataToStorage();
}

function undoTaskFromCompleted(bookElement /* HTMLELement */) {
    const listUncompleted = document.getElementById(BOOK_ISNT_READ);
    const bookTitle = bookElement.querySelector(".inner > h2").innerText;
    const bookAuthor = bookElement.querySelector(".inner > h3").innerText;
    const bookyearReleased = bookElement.querySelector(".inner > p").innerText;

    const newBook = readBook(bookTitle, bookAuthor, bookyearReleased, false);

    const book = findBook(bookElement[BOOK_ID]);
    book.isCompleted = false;
    newBook[BOOK_ID] = book.id;

    listUncompleted.append(newBook);
    bookElement.remove();

    updateDataToStorage();
}

function refreshDataFromBooks() {
    const listUncompleted = document.getElementById(BOOK_ISNT_READ);
    let listCompleted = document.getElementById(BOOK_IS_READ);

    for (book of books) {
        const newBook = readBook(book.task, book.textauthor, book.yearReleased, book.isCompleted);
        newBook[BOOK_ID] = book.id;

        if (book.isCompleted) {
            listCompleted.append(newBook);
        } else {
            listUncompleted.append(newBook);
        }
    }
}