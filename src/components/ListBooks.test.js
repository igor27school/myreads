import React from 'react'
import ListBooks from './ListBooks'
import Bookshelf from './Bookshelf'
import ShallowRenderer from 'react-test-renderer/shallow'
import SHELVES from '../utils/Shelves'

const dummyOnChangeBookState = () => {}

test('ListBooks component renders bookshelves', () => {
  const books = [
    {
      id: 'book1',
      shelf: SHELVES[0].value
    },
    {
      id: 'book2',
      shelf: SHELVES[0].value
    }
  ]
  const renderer = new ShallowRenderer();
  renderer.render(
    <ListBooks
      books= {books}
      onChangeBookState={dummyOnChangeBookState}
    />
  )
  const result = renderer.getRenderOutput()
  expect(result.type).toBe('div')
  const bookselfElements = result.props.children.props.children
  expect(bookselfElements.length).toBe(SHELVES.length)
  expect(bookselfElements[0].key).toBe(SHELVES[0].value)
  expect(bookselfElements[1].key).toBe(SHELVES[1].value)
  expect(bookselfElements[2].key).toBe(SHELVES[2].value)
  expect(bookselfElements[0].type).toBe(Bookshelf)
  expect(bookselfElements[0].props.title).toBe(SHELVES[0].title)
  expect(bookselfElements[0].props.optionsState).toBe(SHELVES[0].value)
  expect(bookselfElements[0].props.onChangeBookState).toBe(dummyOnChangeBookState)
  const currentlyReadingBooks = bookselfElements[0].props.books
  const readBooks = bookselfElements[2].props.books
  expect(currentlyReadingBooks.length).toBe(2)
  expect(readBooks.length).toBe(0)
})
