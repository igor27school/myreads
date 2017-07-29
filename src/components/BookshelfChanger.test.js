import React from 'react'
import BookshelfChanger from './BookshelfChanger'
import ShallowRenderer from 'react-test-renderer/shallow'

test('BookshelfChanger component should render as expected', () => {
  const dummyBook = {
    shelf: 'dummyShelf'
  }
  const dummyOnChangeBookState = () => {}
  const renderer = new ShallowRenderer();
  renderer.render(
    <BookshelfChanger
      book= {dummyBook}
      onChangeBookState={dummyOnChangeBookState}
    />
  )
  const result = renderer.getRenderOutput()
  expect(result.type).toBe('div')
  expect(result.props.children.type).toBe('select')
  expect(result.props.children.props.defaultValue).toBe(dummyBook.shelf)
})
