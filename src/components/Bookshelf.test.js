import React from 'react'
import Bookshelf from './Bookshelf'
import ShallowRenderer from 'react-test-renderer/shallow'

const dummyTitle = 'dummyTitle'
const dummyOnChangeBookState = () => {}

test('Bookshelf component should not render anything ' +
    'when there are no books', () => {
  const emptyBooks = []
  const renderer = new ShallowRenderer();
  renderer.render(
    <Bookshelf
      title = {dummyTitle}
      books= {emptyBooks}
      onChangeBookState={dummyOnChangeBookState}
    />
  )
  const result = renderer.getRenderOutput()
  expect(result).toBe(null)
})

test('Bookshelf component renders books', () => {
  const books = [
    {
      id: 'book1'
    },
    {
      id: 'book2'
    }
  ]
  const renderer = new ShallowRenderer();
  renderer.render(
    <Bookshelf
      title = {dummyTitle}
      books= {books}
      onChangeBookState={dummyOnChangeBookState}
    />
  )
  const result = renderer.getRenderOutput()
  expect(result.type).toBe('div')
  const titleElement = result.props.children[0]
  expect(titleElement.props.children).toBe(dummyTitle)
  const booksElements = result.props.children[1].props.children.props.children
  expect(booksElements.length).toBe(2)
  expect(booksElements[0].key).toBe(books[0].id)
  expect(booksElements[1].key).toBe(books[1].id)
})
