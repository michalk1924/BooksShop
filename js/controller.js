
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

const renderBooks = () => {
    saveToStorage('books', books);
    displayBooks();
}

const deleteBook = (id) => {
    const bookIndex = books.findIndex(book => book.id === id);
    if (bookIndex !== -1) {
        books.splice(bookIndex, 1);
        renderBooks();
    }
    if(books.length % booksPerPage === 0) {
        deletePageInPagingLine(books.length / booksPerPage + 1);
        if(currentPage >= books.length / booksPerPage - 1) changePage(currentPage-1);
    }
}

const addBook = (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    saveBook(formData.get('title'), formData.get('price'), formData.get('image'));
    event.target.reset();
    addBookForm.classList.add('hide');
    if(books.length % booksPerPage === 1) {
        addPageInPagingLine(Math.ceil(books.length / booksPerPage));
    }
}

const updateBook = (event, id) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const selectedBook = getBookById(id);
    if (selectedBook) {
        selectedBook.title = formData.get('title');
        selectedBook.price = formData.get('price');
        selectedBook.image = formData.get('image');
        selectedBook.rate = parseInt(formData.get('rate'));
        books = books.filter(book => book.id !== id);
        books.push(selectedBook);
        sort(sortType);
        renderBooks();
    }
    updateBookForm.innerHTML = '';
}

const changeRate = (id, rateChange) => {
    const selectedBook = getBookById(parseInt(id));
    selectedBook.rate += parseInt(rateChange);
    books = books.filter(book => book.id !== id);
    books.push(selectedBook);
    sort(sortType);
    renderBooks(books);
    updateRateDisplay(selectedBook.rate);
}

const loadData = () => {
    debugger
    bookId = 20;
    currentPage = 0;
    saveToStorage('books', Gbooks);
    updateBooksArray(Gbooks);
    displayBooks();
    createPagingLine();
}

const sortOptions = {
    'id': (a, b) => a.id - b.id,
    'title-up': (a, b) => (a.title.toUpperCase() > b.title.toUpperCase()) ? 1 : -1,
    'title-down': (a, b) => (a.title.toUpperCase() < b.title.toUpperCase()) ? 1 : -1,
    'price-up': (a, b) => a.price - b.price,
    'price-down': (a, b) => b.price - a.price,
    'rate-up': (a, b) => a.rate - b.rate,
    'rate-down': (a, b) => b.rate - a.rate,
}

const sort = (type) => {
    books.sort(sortOptions[type]);
    sortType = type;
    changeSortIcon(type);
    currentPage = 0;
    displayBooks();
}

const main = async () => {
    let bookIdLoad = loadFromStorage(bookId);
    if (bookIdLoad) bookId = bookIdLoad;
    else saveToStorage('bookId', 1);
    sort('id');
    loadPage();
    pushTextLanguage();
    createPagingLine();
}

main(); 
