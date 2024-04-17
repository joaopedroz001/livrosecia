const hamburger = document.querySelector('.hamburger')
const navList = document.querySelector('nav')
const cards = document.querySelector('.row')
const bookName = document.querySelector('.bookName')
const autorName = document.querySelector('.autorName')
const category = document.querySelector('.category')
const publiYear = document.querySelector('.publiYear')
const price = document.querySelector('.price')
const bookNotFoundMensage = document.querySelector('.book-not-found-warning')
const searchInput = document.querySelector('.searchBook')
const searchParams = new URLSearchParams(window.location.search)
const moneyFormat = new Intl.NumberFormat('pt-BR', {
	style: 'currency',
	currency: 'BRL'
})
let data = JSON.parse(localStorage.getItem('data')) || []
let isValid = true


hamburger.addEventListener('click', () => {
	navList.classList.toggle('active')
})


document.addEventListener('DOMContentLoaded', () => {
	let currentPage = window.location.pathname
  
	function changeStyleButton(page) {
		let button = document.getElementById(page)
		button.classList.add('active')
	}
	
	if (currentPage.includes('register')) {
		changeStyleButton('register')
	} else if (currentPage.includes('list')) {
		changeStyleButton('list')
	}
})


const validation = () => {
	const yearValue = parseInt(publiYear.value)
	const priceNumber = parseFloat(price.value.replace(',', '.'))
	const date = new Date
	const currentYear = date.getFullYear()
	const displayerError = (mensage) => {
		isValid = false
		alert(mensage)
		event.preventDefault() 
	}

	if (!bookName.value.length) {
		displayerError('Insira o nome do livro.')
		return
	}

	if (!autorName.value.length) {
		displayerError('Insira o nome do autor.')
		return
	}

	if (!category.value) {
		displayerError('Selecione uma categoria.')
		return
	}

	if (!publiYear.value) {
		displayerError('Insira o ano de publicação.')
		return
	}

	if (publiYear.value.length !== 4 || yearValue > currentYear || isNaN(yearValue)) {
		displayerError('Ano inválido.')
		return
	}

	if (!price.value) {
		displayerError('Insira o preço.')
		return
	} 

	if(isNaN(priceNumber)) {
		displayerError('Preço inválido')
		return
	}	
}


const postNewBook = () => {
	validation()

	if (isValid) {    
		data.push({
			'id': data.length ? data.length + 1 : 1,
			'bookName': bookName.value,
			'autorName': autorName.value,
			'category': category.value,
			'publiYear': parseInt(publiYear.value),
			'price': parseFloat(price.value.replace(',', '.'))
		})

		localStorage.setItem('data', JSON.stringify(data))
	}
}


const postUpdatedBook = () => {
	validation()

	if (isValid) {    
		data[searchParams.get('key')] = {
			'id': data[searchParams.get('key')].id,
			'bookName': bookName.value,
			'autorName': autorName.value,
			'category': category.value,
			'publiYear': parseInt(publiYear.value),
			'price': parseFloat(price.value.replace(',', '.'))
		}
			
		localStorage.setItem('data', JSON.stringify(data))
		event.preventDefault()
		window.location.href = './list-book.html'
	} 
}


const listItems = (array = data) => {
	cards.innerHTML = ''

	for (let i = 0; i < array.length; i++) {
		const col = document.createElement('div')
		col.className = 'col-sm-6 p-2'

		const card = document.createElement('div')
		card.className = 'card h-100'

		const cardBody = document.createElement('div')
		cardBody.className = 'card-body d-flex flex-column'

		const cardTitle = document.createElement('h5')
		cardTitle.className = 'card-title'
		cardTitle.innerHTML = array[i].bookName

		const cardTextAutor = document.createElement('p')
		cardTextAutor.className = 'card-text'
		cardTextAutor.innerHTML = `Autor: ${array[i].autorName}`

		const cardTextCategory = document.createElement('p')
		cardTextCategory.className = 'card-text'
		cardTextCategory.innerHTML = `Categoria: ${array[i].category}`

		const cardTextPubliYear = document.createElement('p')
		cardTextPubliYear.className = 'card-text'
		cardTextPubliYear.innerHTML = `Ano de publicação: ${array[i].publiYear}`

		const cardTextPrice = document.createElement('p')
		cardTextPrice.className = 'card-text'
		cardTextPrice.innerHTML = `Preço: ${moneyFormat.format(array[i].price)}`

		const buttonsDiv = document.createElement('div')
		buttonsDiv.className = 'd-flex mt-auto gap-2'

		const editButton = document.createElement('button')
		editButton.className = 'btn w-50 fa-solid fa-pen-to-square'
		editButton.onclick = () => {
			window.location.href = `./src/pages/edit-book.html?key=${i}`
		}

		const deleteButton = document.createElement('button')
		deleteButton.className = 'btn w-50 fa-solid fa-trash'
		deleteButton.onclick = () => {
			data.splice(i, 1)
			localStorage.setItem('data', JSON.stringify(data))
			window.location.reload()
		}

		buttonsDiv.appendChild(editButton)
		buttonsDiv.appendChild(deleteButton)
		cardBody.appendChild(cardTitle)
		cardBody.appendChild(cardTextAutor)
		cardBody.appendChild(cardTextCategory)
		cardBody.appendChild(cardTextPubliYear)
		cardBody.appendChild(cardTextPrice)

		cardBody.appendChild(buttonsDiv)
		card.appendChild(cardBody)
		col.appendChild(card)
		cards.appendChild(col)
	}
}


const showBook = () => {
	let bookSearched = data.filter((book) => {
		return book.bookName.toLowerCase().includes(searchInput.value.toLowerCase())
	})
	
	if (bookSearched.length !== 0) {
		listItems(bookSearched)
	} else {
		cards.innerHTML = ''
		bookNotFoundMensage.classList.add('active')
	}
	
	if (searchInput.value === '') {
		bookNotFoundMensage.classList.remove('active')
	}
}
