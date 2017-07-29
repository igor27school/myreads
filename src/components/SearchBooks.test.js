import React from 'react'
import SearchBooks from './SearchBooks'
import Bookshelf from './Bookshelf'
import ShallowRenderer from 'react-test-renderer/shallow'
import SHELVES from '../utils/Shelves'

jest.mock('../utils/BooksAPI')

const dummyOnChangeBookState = () => {}

test('SearchBooks component renders the results bookshelf', () => {
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
    <SearchBooks
      books= {books}
      onChangeBookState={dummyOnChangeBookState}
    />
  )
  const result = renderer.getRenderOutput()
  expect(result.type).toBe('div')
  const bookResultsElement = result.props.children[1].props.children
  expect(bookResultsElement.type).toBe(Bookshelf)
  expect(bookResultsElement.props.onChangeBookState).toBe(dummyOnChangeBookState)
})
