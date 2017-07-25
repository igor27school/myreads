import React from 'react'
import BookshelfChanger from './BookshelfChanger'
import ShallowRenderer from 'react-test-renderer/shallow'

test('BookshelfChanger component should render as expected', () => {
  const dummyBook = {}
  const dummyOnChangeBookState = () => {}
  const renderer = new ShallowRenderer();
  const component = renderer.render(
    <BookshelfChanger
      book= {dummyBook}
      onChangeBookState={dummyOnChangeBookState}
    />
  )
})
