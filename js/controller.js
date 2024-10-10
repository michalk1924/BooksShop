const loadPage = () => {
    const savedBooks = loadFromStorage('books');
    if (!savedBooks) {
        saveToStorage('books', Gbooks);
        updateBooksArray(Gbooks);
    } else {
        updateBooksArray(savedBooks);
    }
    displayBooks();
}

const deleteBook = (id) => {
    const bookIndex = books.findIndex(book => book.id === id);
    if (bookIndex !== -1) {
        books.splice(bookIndex, 1);
        renderBooks();
    }
}

const renderBooks = () => {
    saveToStorage('books', books);
    displayBooks();
}

const addBook = (event) => {
    const formData = new FormData(event.target);
    saveBook(formData.get('title'), formData.get('price'), formData.get('image'));
    formData.reset();
    addBookForm.classList.add('hide');
}

const changeRate = (id, rateChange) => {
    const selectedBook = getBook(parseInt(id));
    selectedBook.rate += parseInt(rateChange);
    books = books.filter(book => book.id !== id);
    books.push(selectedBook);
    renderBooks(books);
    updateRateDisplay(selectedBook.rate);
}

const loadData = () => {
    bookId = 20;
    saveToStorage('books', Gbooks);
    updateBooksArray(Gbooks);
    displayBooks();
}

const prevPage = () => {
    currentPage--;
    if (currentPage < 0) currentPage = 0;
    displayBooks();
}

const nextPage = () => {
    debugger
    currentPage++;
    if (currentPage > Math.ceil(books.length / booksPerPage) - 1)
        currentPage = Math.ceil(books.length / booksPerPage) - 1;
    displayBooks();
}

const main = () => {
    let bookIdLoad = loadFromStorage(bookId);
    if (bookIdLoad) bookId = bookIdLoad;
    else saveToStorage('bookId', 1);
    loadPage();
}

main(); 
