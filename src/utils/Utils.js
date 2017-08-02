/**
* @description Removes books with duplicate ids
* @param {array} books - an array of book objects that have an id attribute
* @returns {array} An array of books where every book.id is unique
*/
export const dedupBooks = (books) => {
  const setBookIds = new Set()
  const uniqueBooks = []
  books.forEach((book) => {
    if (!setBookIds.has(book.id)) {
      uniqueBooks.push(book)
      setBookIds.add(book.id)
    }
  })
  return uniqueBooks
}
