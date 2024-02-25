document.addEventListener('DOMContentLoaded', function() {
    if (localStorage.length == 0 || searchInput.value == 0) {
        withoutBook.classList.remove('hiddenElement');
        warningMensage.innerHTML = 'Livro não encontrado';
        table.classList.add('hiddenElement');
    }
});
