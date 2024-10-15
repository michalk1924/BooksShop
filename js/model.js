
var books = [];
let currentPage = 0;
const booksPerPage = 10;
var bookId = 20;
let language = 'english';
let sortType = 'id';

const saveToStorage = (key, value) => {
    localStorage.setItem(key, JSON.stringify(value));
};

const loadFromStorage = (key) => {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : null;
};

const updateBooksArray = (booksParam) => {
    books = booksParam;
}

const saveBook = (title, price, imageSrc) => {
    const booksLoad = loadFromStorage('books');
    if (booksLoad) {
        books = booksLoad;
        bookId = bookId + 1;
        books.push({ id: bookId, title: title, price: parseInt(price), image: imageSrc, rate: 0 });
        saveToStorage('books', books);
        renderBooks();
    }
}

const getBookById = (bookId) => {
    return books.find(book => book.id === parseInt(bookId));
}