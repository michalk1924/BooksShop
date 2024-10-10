
const booksDiv = document.querySelector('.booksLines');
const addBookForm = document.querySelector('.addBook');
const showBook = document.querySelector('.showBook');

const texts = {
    title: document.querySelector('.title'),
    thId: document.querySelector('.th-id'),
    thTitle: document.querySelector('.th-title'),
    thPrice: document.querySelector('.th-price'),
    thDelete: document.querySelector('.th-delete'),
    thUpdate: document.querySelector('.th-update'),
    newBook: document.querySelector('.newBook'),
    loadData: document.querySelector('.loadData'),
}

const displayBooks = () => {
    let i = currentPage;
    sortBooks = books.sort((a, b) => a.id - b.id);
    const booksPerPage = 10;
    let displayBooks = sortBooks.slice(i * booksPerPage, i * booksPerPage + booksPerPage);
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
        <button class="deleteBtn" onclick="deleteBook(${book.id})">🗑️</button>
        <button class="updateBtn" onclick="updateBook(${book.id})">✏️</button>`;
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

const showUpdateBook = (id) => {
    const selectedBook = getBook(id);
    addBookForm.classList.remove('hide');
    showBook.classList.add('hide');
    addBookForm.innerHTML = `
    <form action="add-update-book" onsubmit="addBook(event)">
                    <h2 class="title">${updateBook[la]}</h2>
                    <label for="title">${selectedBook.title}</label>
                    <input type="text" name="title" />
                    <label for="price">price</label>
                    <input type="number" name="price" />
                    <label for="rate">Rate</label>
                    <div class="rate-control">
                        <button type="button" class="rate-button" onclick="changeRate(-1)">−</button>
                        <input type="number" name="rate" value="0" min="0" readonly />
                        <button type="button" class="rate-button" onclick="changeRate(1)">+</button>
                    </div>
                    <button type="submit" class="submit-button">submit</button>
                </form>`
}

const updateRateDisplay = (rate) => {
    document.querySelector('#rate').value = rate;
}

const closeBookDetails = () => {
    showBook.classList.add('hide');
}

const pushTextLanguage = () => {    
    for (let key in texts) {
        if(texts[key]){
        texts[key].innerHTML = languages[key][language];
        }
    }
}