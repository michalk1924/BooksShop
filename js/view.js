
const booksDiv = document.querySelector('.booksLines');
const addBookForm = document.querySelector('.addBook');
const showBook = document.querySelector('.showBook');
const updateBookForm = document.querySelector('.updateBook');
const titleDown = document.querySelector('#title-down');
const titleUp = document.querySelector('#title-up');
const priceUp = document.querySelector('#price-up');
const priceDown = document.querySelector('#price-down');
const pagingLine = document.querySelector('.pagingLine');

const texts = {
    title: document.querySelector('.title'),
    thId: document.querySelector('.th-id'),
    thTitle: document.querySelector('#th-title'),
    thPrice: document.querySelector('#th-price'),
    thDelete: document.querySelector('.th-delete'),
    thUpdate: document.querySelector('.th-update'),
    newBook: document.querySelector('.newBook'),
    loadData: document.querySelector('.loadData'),
}

const displayBooks = () => {
    let i = currentPage;
    const booksPerPage = 10;
    let displayBooks = books.slice(i * booksPerPage, i * booksPerPage + booksPerPage);
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
        <button class="updateBtn" onclick="showUpdateBook(${book.id})">✏️</button>`;
    return bookDiv;
}

const showAddBook = () => {
    addBookForm.classList.remove('hide');
    if (!showBook.classList.contains('hide')) showBook.classList.add('hide');
    if (!updateBookForm.classList.contains('hide')) updateBookForm.classList.add('hide');
}

const showBookDetails = (id) => {
    const selectedBook = getBookById(id);
    if (!updateBookForm.classList.contains('hide')) updateBookForm.classList.add('hide');
    if (!addBookForm.classList.contains('hide')) addBookForm.classList.add('hide');
    showBook.classList.remove('hide');
    showBook.innerHTML = `
    <button onclick="closeElement(showBook)">❌</button>
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
    const selectedBook = getBookById(id);
    console.log(selectedBook.title);
    
    if (!selectedBook) return;
    if (!addBookForm.classList.contains('hide')) addBookForm.classList.add('hide');
    if (!showBook.classList.contains('hide')) showBook.classList.add('hide');
    updateBookForm.classList.remove('hide');
    updateBookForm.innerHTML = `
    <form action="add-update-book" onsubmit="updateBook(event, ${id})">
        <button onclick="closeElement(updateBookForm)">❌</button>
                    <h2 class="title">${languages.updateBookTitle[language]}</h2>
                    <label for="title">title</label>
                    <input type="text" name="title" value="${selectedBook.title}" />
                    <label for="price">price</label>
                    <input type="number" name="price" value=${selectedBook.price} />
                    <label for="rate">Rate</label>
                    <div class="rate-control">
                        <button type="button" class="rate-button" onclick="changeRate(-1)">−</button>
                        <input type="number" name="rate" value=${selectedBook.rate} min="0" readonly />
                        <button type="button" class="rate-button" onclick="changeRate(1)">+</button>
                    </div>
                    <button type="submit" class="submit-button">submit</button>
                </form>`
}

const updateRateDisplay = (rate) => {
    document.querySelector('#rate').value = rate;
}

const closeElement = (element) => {
    element.classList.add('hide');
}

const changeSortIcon = (sortIcon) => {
    switch (sortIcon) {
        case 'title-up':
            titleDown.classList.remove('hidden');
            titleUp.classList.add('hidden');
            break;
        case 'title-down':
            titleUp.classList.remove('hidden');
            titleDown.classList.add('hidden');
            break;
        case 'price-up':
            priceDown.classList.remove('hidden');
            priceUp.classList.add('hidden');
            break;
        case 'price-down':
            priceUp.classList.remove('hidden');
            priceDown.classList.add('hidden');
            break;
    }
}

const pushTextLanguage = () => {
    for (let key in texts) {
        if (texts[key]) {
            texts[key].innerHTML = languages[key][language];
        }
    }
}

const createPagingLine = () => {
    const totalPages = Math.ceil(books.length / booksPerPage);
    let pagingLineStr = '';
    for (let i = 1; i <= totalPages; i++) {
        pagingLineStr += `<button id=pageButton${i} class="page-btn ${currentPage === i - 1 ? 'active' : ''}" onclick="changePage(${i - 1})">${i}</button>`;
    }
    pagingLine.innerHTML = pagingLineStr;
}

const addPageInPagingLine = (page) => {
    const pageBtn = `<button id=pageButton${page} class="page-btn" onclick="changePage(${page - 1})">${page}</button>`;
    pagingLine.innerHTML += pageBtn;
}

const deletePageInPagingLine = (page) => {
    const pageBtn = document.querySelector(`#pageButton${page}`);
    if (pageBtn) {
        pageBtn.parentNode.removeChild(pageBtn);
    }
}

const prevPage = () => {
    if (currentPage -1 < 0) return;
    changePage(currentPage -1);
}

const nextPage = () => {
    if (currentPage > Math.ceil(books.length / booksPerPage) - 1)
        return;
    changePage(currentPage + 1);
}

const changePage = (pageNumber) => {
    document.querySelector(`#pageButton${currentPage+1}`)?.classList.remove('active');
    currentPage = pageNumber;
    document.querySelector(`#pageButton${pageNumber+1}`)?.classList.add('active');
    displayBooks();
}

const changeLanguage = () => {
    const selectedLanguage = document.getElementById('languageSelect').value;
    language = selectedLanguage;
    document.getElementsByTagName('body')[0].style.direction = language === 'english'? 'ltr' : 'rtl';
    document.getElementsByClassName('nav')[0].style.direction = 'ltr';
    pushTextLanguage();
}