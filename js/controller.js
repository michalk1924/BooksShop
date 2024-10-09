const loadPage = () => {
    const savedBooks = loadFromStorage('books');
    if (!savedBooks) {
        saveToStorage('books', Gbooks);
        updateBooksArray(Gbooks);
    } else{
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

const renderBooks = () =>{
    saveToStorage('books', books);
    displayBooks();
}

loadPage();