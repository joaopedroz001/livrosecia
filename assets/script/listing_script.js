document.addEventListener('DOMContentLoaded', function() {
    if (localStorage.length != 0) {
        withoutBook.classList.add('hiddenElement');
        table.classList.remove('hiddenElement');
        listItems();
    } else {
        withoutBook.classList.remove('hiddenElement');
        warningMensage.innerHTML = 'Sem livros cadastrados';
        table.classList.add('hiddenElement');
    }
});
