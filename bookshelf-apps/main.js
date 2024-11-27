let books = [];

// First load
document.addEventListener("DOMContentLoaded", function () {
  const submitForm = document.getElementById("inputBook");
  submitForm.addEventListener("submit", function (event) {
    notFinished();
  });

  const submitSearch = document.getElementById("searchBook");
  submitSearch.addEventListener("submit", function (event) {
    event.preventDefault();
    searchingBook();
  });

  if (checkLocalStorage()) {
    loadDataFromStorage();
  }
});

function checkLocalStorage() {
  if (typeof Storage === undefined) {
    alert("Local storage not supported");
    return false;
  }
  return true;
}

function generateId() {
  return +new Date();
}

function generateBookObject(id, title, author, year, isComplete) {
  return {
    id,
    title,
    author,
    year,
    isComplete,
  };
}

function notFinished() {
  const bookTitle = document.getElementById("inputBookTitle").value;
  const bookAuthor = document.getElementById("inputBookAuthor").value;
  const bookYear = document.getElementById("inputBookYear").value;
  const bookCompleted = document.getElementById("inputBookIsComplete").checked;

  const bookObject = generateBookObject(
    generateId(),
    bookTitle,
    bookAuthor,
    parseInt(bookYear),
    bookCompleted
  );
  books.push(bookObject);

  document.dispatchEvent(new Event("render-books"));
  saveData();
}

// Rendering books
document.addEventListener("render-books", function () {
  const notFinishedList = document.getElementById("incompleteBookshelfList");
  notFinishedList.innerHTML = "";

  const finishedList = document.getElementById("completeBookshelfList");
  finishedList.innerHTML = "";

  for (const item of books) {
    const bookElement = makeIncomplete(item);
    if (!item.isComplete) {
      notFinishedList.append(bookElement);
    } else {
      finishedList.append(bookElement);
    }
  }
});

// Sort the books
function makeIncomplete(bookObject) {
  const bookTitle = document.createElement("h3");
  bookTitle.innerText = bookObject.title;

  const bookAuthor = document.createElement("p");
  bookAuthor.innerText = bookObject.author;

  const bookYear = document.createElement("p");
  bookYear.innerText = bookObject.year;

  const container = document.createElement("article");
  container.classList.add("book_item");
  container.append(bookTitle, bookAuthor, bookYear);
  container.setAttribute("id", `bookObject-${bookObject.id}`);

  const containerButton = document.createElement("div");
  containerButton.classList.add("action");

  if (bookObject.isComplete) {
    // Complete button
    const completeButton = document.createElement("button");
    completeButton.classList.add("green");
    completeButton.innerHTML = "Belum selesai dibaca";
    completeButton.addEventListener("click", function () {
      addToIncompleted(bookObject.id);
    });

    // Delete button
    const deleteButton = document.createElement("button");
    deleteButton.classList.add("red");

    deleteButton.innerHTML = "Hapus buku";
    deleteButton.addEventListener("click", function () {
      deleteBook(bookObject.id);
    });

    containerButton.append(completeButton, deleteButton);
  } else {
    // Complete button
    const completeButton = document.createElement("button");
    completeButton.classList.add("green");
    completeButton.innerHTML = "Selesai dibaca";
    completeButton.addEventListener("click", function () {
      addToCompleted(bookObject.id);
    });

    // Delete button
    const deleteButton = document.createElement("button");
    deleteButton.classList.add("red");

    deleteButton.innerHTML = "Hapus buku";
    deleteButton.addEventListener("click", function () {
      deleteBook(bookObject.id);
    });

    containerButton.append(completeButton, deleteButton);
  }

  container.append(containerButton);
  return container;
}

// Find book
function findBook(bookId) {
  for (const item of books) {
    if (item.id === bookId) {
      return item;
    }
  }
  return null;
}

function findBookIndex(bookId) {
  for (const index in books) {
    if (books[index].id === bookId) {
      return index;
    }
  }

  return -1;
}

// Search
function searchingBook() {
  const searchTitle = document.getElementById("searchBookTitle").value;
  let filteredBooks = [];
  if (searchTitle == "") {
    books = [];
    loadDataFromStorage();
    return;
  } else {
    for (const item of books) {
      if (item.title.includes(searchTitle)) {
        filteredBooks.push(item);
      }
    }
  }

  books = filteredBooks;
  document.dispatchEvent(new Event("render-books"));
}

// Completed button
function addToCompleted(bookId) {
  const addedBook = findBook(bookId);
  if (addedBook === null) return;
  addedBook.isComplete = true;
  document.dispatchEvent(new Event("render-books"));
  saveData();
}

// Incomplete button
function addToIncompleted(bookId) {
  const addedBook = findBook(bookId);
  if (addedBook === null) return;
  addedBook.isComplete = false;
  document.dispatchEvent(new Event("render-books"));
  saveData();
}

// Delete button
function deleteBook(bookId) {
  const deletedBook = findBookIndex(bookId);
  if (deletedBook === -1) return;
  books.splice(deletedBook, 1);
  document.dispatchEvent(new Event("render-books"));
  document.dispatchEvent(new Event("deleted-book"));
  saveData();
}

document.addEventListener("deleted-book", function () {
  alert("Book successfully deleted");
});

// Load data if storage not empty
function loadDataFromStorage() {
  const serializedData = localStorage.getItem("bookshelf-apps");
  let data = JSON.parse(serializedData);

  if (data !== null) {
    for (const item of data) {
      books.push(item);
    }
  }

  document.dispatchEvent(new Event("render-books"));
}

function saveData() {
  if (checkLocalStorage()) {
    const parsed = JSON.stringify(books);
    localStorage.setItem("bookshelf-apps", parsed);
  }
}
