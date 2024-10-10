
const booksDiv = document.querySelector('.booksLines');
const addBookForm = document.querySelector('.addBook');
const showBook = document.querySelector('.showBook');

const displayBooks = () => {
    let i = currentPage;
    sortBooks = books.sort((a, b) => a.id - b.id);
const booksPerPage = 10;
let displayBooks = sortBooks.slice(i*booksPerPage, i*booksPerPage + booksPerPage);
    booksDiv.innerHTML = '';
    displayBooks.forEach(book => {
        const bookDiv = getBookDivInTable(book);
        booksDiv.appendChild(bookDiv);
    })
}

const getBookDivInTable = (book) => {
    const bookDiv = document.createElement('div');
    bookDiv.innerHTML = `
    <div class="bookLine" id=${book.id} >
    <h3 class="id">${book.id}</h3>
        <h3 class="title" onclick="showBookDetails(${book.id})">${book.title}</h3>
        <h3 class="price">${book.price}$</h3>
        <button class="deleteBtn" onclick="deleteBook(${book.id})">Delete</button>
        <button class="updateBtn" onclick="updateBook(${book.id})">Update</button>`;
    return bookDiv;
}

const showAddBook = () => {
    addBookForm.classList.remove('hide');
    if (!showBook.classList.contains('hide')) showBook.classList.add('hide');
}

const showBookDetails = (id) => {
    const selectedBook = getBook(id);
    if (!addBookForm.classList.contains('hide')) addBookForm.classList.add('hide');
    showBook.classList.remove('hide');
    showBook.innerHTML = `
    <button onclick="closeBookDetails()">❌</button>
    <h2>${selectedBook.title}</h2>
    <h3>Price: ${selectedBook.price}$</h3>
    <div class="rate-control">
        <button type="button" class="rate-button" onclick="changeRate(${id}, -1)">−</button>
        <input type="number" id="rate" name="rate" value=${selectedBook.rate} min="0" readonly />
        <button type="button" class="rate-button" onclick="changeRate(${id}, 1)">+</button>
    </div>
    <img src="${selectedBook.image}" alt="${selectedBook.title}">`
}

const updateRateDisplay = (rate) => {
    document.querySelector('#rate').value = rate;
}

const closeBookDetails = () => {
    showBook.classList.add('hide');
}