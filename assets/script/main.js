const form = document.querySelector('#form');
const bookName = document.querySelector('#bookName');
const autorName = document.querySelector('#autorName');
const category = document.querySelector('#category');
const publiYear = document.querySelector('#publiYear');
const price = document.querySelector('#price');
const tbody = document.querySelector('tbody');
const withoutBook = document.querySelector('.without-book-container');
const table = document.querySelector('.table-page-list');
const warningMensage = document.querySelector('.without-book-warning');
const searchInput = document.querySelector('.search-book');
const searchButton = document.querySelector('.search-button');
const searchParams = new URLSearchParams(window.location.search);
const moneyFormat = new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL'
});

let isValid = true;

document.addEventListener('DOMContentLoaded', function() {
    let currentPage = window.location.pathname;
    
    function changeStyleButton(page) {
        let button = document.getElementById(page);

        button.style.color = 'aqua';
        button.style.paddingBottom = '5px';
        button.style.borderBottom = '4px solid aqua';
    }

    if (currentPage.includes('sign_up')) {
        changeStyleButton('sign-up');
    } else if (currentPage.includes('listing')) {
        changeStyleButton('listing');
    } else if (currentPage.includes('search')) {
        changeStyleButton('search');
    }
});

// FUNCTIONS

function displayerError(mensage) {
    isValid = false;
    alert(mensage);
    event.preventDefault();
}

function validation() {
    const yearValue = publiYear.value;
    const priceValue = price.value.replace(',', '.');
    const date = new Date;
    const currentYear = date.getFullYear();

    // BOOKNAME FIELD VALIDATION
    if (!bookName.value.length) {
        displayerError('Insira o nome do livro.');
        return;
    }

    // AUTORNAME FIELD VALIDATION
    if (!autorName.value.length) {
        displayerError('Insira o nome do autor.');
        return;
    }

    // CATEGORY FIELD VALIDATION

    if (!category.value) {
        displayerError('Selecione uma categoria.');
        return;
    }

    // YEAR FIELD VALIDATION

    if (!yearValue) {
        displayerError('Insira o ano de publicação.');
        return;
    } else if (yearValue.length !== 4 || yearValue > currentYear) {
        displayerError('Ano inválido.');
        return;
    } else {
        for (let i in yearValue) {
            if (isNaN(parseInt(yearValue[i]))) {
                displayerError('Ano inválido.');
                return;
            }
        }
    }

    // PRICE FIELD VALIDATION

    if (!priceValue) {
        displayerError('Insira o preço.');
        return;
    } else {
        for (let i in priceValue) {
            if (isNaN(parseInt(priceValue[i])) && priceValue[i] != '.') {
                displayerError('Preço inválido.');
                return;
            }
        }
    }
}

function editItem(index) {
    window.location.href = `./edit_item.html?key=${index}`;
}

function deleteItem(index) {
    localStorage.removeItem(`${index}`);
    location.reload();
}

// SIGN UP

function postForm() {
    validation();

    if (isValid) {    
        const nextID = localStorage.length > 0 ? JSON.parse(localStorage.key(`${localStorage.length - 1}`)) + 1 : 0
        
        const object = {
            'id': nextID,
            'bookName': bookName.value,
            'autorName': autorName.value,
            'category': category.value,
            'publiYear': parseInt(publiYear.value),
            'price': parseFloat(price.value),
        };
        
        localStorage.setItem(`${nextID}`, JSON.stringify(object))
        location.reload();
    }
}

// EDIT ITEM

function postUpdatedItem() {
    validation();

    if (isValid) {    
        const object = {
            'id': searchParams.get('key'),
            'bookName': bookName.value,
            'autorName': autorName.value,
            'category': category.value,
            'publiYear': parseInt(publiYear.value),
            'price': parseFloat(price.value),
        };
        
        localStorage.setItem(`${searchParams.get('key')}`, JSON.stringify(object));
        event.preventDefault();
        window.location.href = './listing.html?next=1';
    } 
}

// LIST

function listItems() {
    for (let i in localStorage) {
        if (i == 'length') {
            continue;
        };

        const data = JSON.parse(localStorage[i]);
        
        const tr = tbody.insertRow();
        const cellName = tr.insertCell();
        const cellAutor = tr.insertCell();
        const cellCategory = tr.insertCell();
        const cellPubliYear = tr.insertCell();
        const cellPrice = tr.insertCell();
        const cellButtons = tr.insertCell();

        cellName.innerText = data.bookName;
        cellAutor.innerText = data.autorName;
        cellCategory.innerText = data.category;
        cellPubliYear.innerText = data.publiYear;
        cellPrice.innerText = moneyFormat.format(data.price);
        cellButtons.innerHTML = `<button class="edit-button table-button" onclick="editItem(${data.id})"><i class="fa-solid fa-2x fa-pen-to-square"></i></button> <button class="delete-button table-button" onclick="deleteItem(${data.id})"><i class="fa-solid fa-2x fa-trash"></i></button>`;
        cellButtons.className = 'td-buttons';
    }
}

// SEARCH

function showBook() {
    for (let i in localStorage) {
        if (i == 'length') {
            continue;
        };

        const data = JSON.parse(localStorage[i]);
        
        if (data.bookName == searchInput.value) {
            withoutBook.classList.add('hiddenElement');
            table.classList.remove('hiddenElement');
            tbody.innerHTML = '';
            
            const tr = tbody.insertRow();
            tr.innerHTML = `
            <td>${data.bookName}</td>
            <td>${data.autorName}</td>
            <td>${data.category}</td>
            <td>${data.publiYear}</td>
            <td>${moneyFormat.format(data.price)}</td>
            <td><button class="edit-button table-button" onclick="editItem(${data.id})"><i class="fa-solid fa-2x fa-pen-to-square"></i></button> <button class="delete-button table-button" onclick="deleteItem(${data.id})"><i class="fa-solid fa-2x fa-trash"></i></button>
            `;

            break;
        }
    }
};
