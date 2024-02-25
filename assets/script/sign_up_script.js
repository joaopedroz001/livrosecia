const form = document.querySelector('#form');
const bookName = document.querySelector('#bookName');
const autorName = document.querySelector('#autorName');
const category = document.querySelector('#category');
const publiYear = document.querySelector('#publiYear');
const price = document.querySelector('#price');
let indexID = 0;

function displayerError(mensage) {
    isValid = false;
    alert(mensage);
    event.preventDefault();
}

form.addEventListener('submit', function() {
    let isValid = true;
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

    if (isValid) {    
        const nextID = localStorage.length > 0 ? JSON.parse(localStorage.key(`${localStorage.length - 1}`)) + 1 : 0
        
        const object = {
            'id': nextID,
            'bookName': bookName.value,
            'autorName': autorName.value,
            'category': category.value,
            'publiYear': parseInt(yearValue),
            'price': parseFloat(priceValue),
        };

        localStorage.setItem(`${nextID}`, JSON.stringify(object))
    }
})
