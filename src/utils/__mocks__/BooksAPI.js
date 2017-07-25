// __mocks__/BooksAPI.js

const BooksAPI = jest.genMockFromModule('./BooksAPI')

const fakeBook = {
  id: 'fake'
}

BooksAPI.getAll = () => Promise.resolve([fakeBook, fakeBook])

module.exports = BooksAPI
