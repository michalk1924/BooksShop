
const booksDiv = document.querySelector('.booksTable');

const displayBooks = () => {
    booksDiv.innerHTML = '';
    books.forEach(book => {
        const bookDiv = getBookDivInTable(book);
        booksDiv.appendChild(bookDiv);
    })
}

const getBookDivInTable = (book) => {
    const bookDiv = document.createElement('div');
    bookDiv.className = 'book';
    bookDiv.id = `book-${book.id}`;
    bookDiv.innerHTML = `
    <h2 class="id">${book.id}</h2>
        <h2 class="title">${book.title}</h2>
        <h2 class="price">${book.price}</h2>
        <button class="deleteBtn" onclick="deleteBook(${book.id})">Delete</button>
        <button class="updateBtn" onclick="updateBook(${book.id})">Update</button>`;
    return bookDiv;
}

