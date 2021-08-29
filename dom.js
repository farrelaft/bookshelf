const UNCOMPLETED_LIST_BOOK_ID = "incompleteBookshelfList";
const COMPLETED_LIST_BOOK_ID = "completeBookshelfList"; 
const BOOK_ITEMID = "itemId";

function makeBook(judul, penulis, tahun, isCompleted) {
 
    const textTitle = document.createElement("h3");
    textTitle.innerText = judul;
 
    const textAuthor = document.createElement("p");
    textAuthor.classList.add("at")
    textAuthor.innerText = penulis;

    const textYear = document.createElement("p");
    textYear.classList.add("yr")
    textYear.innerText = tahun;

    const container = document.createElement("article");
    container.classList.add("book_item", "shadow")
    container.append(textTitle, textAuthor, textYear);

    if(isCompleted){
        container.append(createUndoButton(),createTrashButton());
    } else {
        container.append(createCheckButton(),createTrashButton());
    }
    return container;
}

function addBook() {
    const uncompletedBOOKList = document.getElementById(UNCOMPLETED_LIST_BOOK_ID);
    const addTitle = document.getElementById("inputBookTitle").value;
    const addAuthor = document.getElementById("inputBookAuthor").value;
    const addYear = document.getElementById("inputBookYear").value;

    console.log("book" + addTitle);
    console.log("author" + addAuthor);
    console.log("year" + addYear);

    const book = makeBook(addTitle, addAuthor, addYear);
    const bookObject = composeBookObject(addTitle, addAuthor, addYear, false);

    book[BOOK_ITEMID] = bookObject.id;
    books.push(bookObject);

    uncompletedBOOKList.append(book);
    updateDataToStorage();
}

function addBook2() {
    const completedBOOKList = document.getElementById(COMPLETED_LIST_BOOK_ID);
    const addTitle = document.getElementById("inputBookTitle").value;
    const addAuthor = document.getElementById("inputBookAuthor").value;
    const addYear = document.getElementById("inputBookYear").value;

    console.log("book" + addTitle);
    console.log("author" + addAuthor);
    console.log("year" + addYear);

    const book = makeBook(addTitle, addAuthor, addYear, true);
    const bookObject = composeBookObject(addTitle, addAuthor, addYear, true);

    book[BOOK_ITEMID] = bookObject.id;
    books.push(bookObject);

    completedBOOKList.append(book);
    updateDataToStorage();
}

function createButton(buttonTypeClass , eventListener) {
    const button = document.createElement("button");
    button.classList.add(buttonTypeClass);
    if (buttonTypeClass=="green"){
        button.innerText= "Selesai dibaca";
    } else if (buttonTypeClass=="red"){
        button.innerText= "Hapus buku";
    } else {
        button.innerText= "Belum selesai dibaca";
    }
    button.addEventListener("click", function (event) {
        eventListener(event);
    });
    return button;
}

function addBookToCompleted(taskElement) {
    const bookTitle = taskElement.querySelector(".book_item > h3").innerText;
    const bookAuthor = taskElement.querySelector(".book_item > .at").innerText;
    const bookYear = taskElement.querySelector(".book_item > .yr").innerText;
 
    const newBook = makeBook(bookTitle, bookAuthor, bookYear, true);
    const book = findBook(taskElement[BOOK_ITEMID]);
    book.isCompleted = true;
    newBook[BOOK_ITEMID] = book.id;

    const listCompleted = document.getElementById(COMPLETED_LIST_BOOK_ID);
    listCompleted.append(newBook);
    taskElement.remove();

    updateDataToStorage();
} 

function createCheckButton() {
    return createButton("green", function(event){
         addBookToCompleted(event.target.parentElement);
    });
}

function removeBookFromCompleted(taskElement) {
    const bookTitle = taskElement.querySelector(".book_item > h3").innerText;
    if (confirm("Buku " + bookTitle + " akan dihapus")) {
        const bookPosition = findBookIndex(taskElement[BOOK_ITEMID]);
        books.splice(bookPosition, 1);

        taskElement.remove();
        updateDataToStorage();
      }
}

function createTrashButton() {
    return createButton("red", function(event){
        removeBookFromCompleted(event.target.parentElement);
    });
}

function undoBookFromCompleted(taskElement){
    const listUncompleted = document.getElementById(UNCOMPLETED_LIST_BOOK_ID);
    const bookTitle = taskElement.querySelector(".book_item > h3").innerText;
    const bookAuthor = taskElement.querySelector(".book_item > .at").innerText;
    const bookYear = taskElement.querySelector(".book_item > .yr").innerText;

    const newBook = makeBook(bookTitle, bookAuthor, bookYear, false);

    const book = findBook(taskElement[BOOK_ITEMID]);
    book.isCompleted = false;
    newBook[BOOK_ITEMID] = book.id;
 
    listUncompleted.append(newBook);
    taskElement.remove();

    updateDataToStorage();
}

function createUndoButton() {
    return createButton("blue", function(event){
        undoBookFromCompleted(event.target.parentElement);
    });
}

function search() {
    var input, filter, ul, li, a, i, txtValue;
    var input = document.getElementById("searchBookTitle");
    var filter = input.value.toUpperCase();
    var books = document.querySelectorAll(".book_item");
    
    for (i = 0; i < books.length; i++) {
        a = books[i].getElementsByTagName("h3")[0];
        var txtValue = a.textContent || a.innerText;
        if (txtValue.toUpperCase().indexOf(filter) > -1) {
            books[i].style.display = "";
        } else {
            books[i].style.display = "none";
        }
    }
}