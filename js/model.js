
let books = [];

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