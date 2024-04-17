document.addEventListener('DOMContentLoaded', () => {
  const item = data[searchParams.get('key')]
  bookName.value = item.bookName
  autorName.value = item.autorName
  category.value = item.category
  publiYear.value = item.publiYear
  price.value = parseFloat(item.price).toFixed(2).replace('.', ',')
})
