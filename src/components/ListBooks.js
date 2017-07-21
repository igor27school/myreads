import React, { Component } from 'react'
import Bookshelf from './Bookshelf'
import SHELVES from '../utils/Shelves'
import PropTypes from 'prop-types'

class ListBooks extends Component {
  static propTypes = {
    books: PropTypes.array.isRequired,
    onChangeBookState: PropTypes.func.isRequired,
  }

  render() {
    return (
      <div className="list-books-content">
        <div>
          {SHELVES.map((shelf) => (
            <Bookshelf
              key={shelf.value}
              title={shelf.title}
              optionsState={shelf.value}
              books={this.props.books.filter((book) => (
                book.shelf === shelf.value
              ))}
              onChangeBookState={this.props.onChangeBookState}
            />
          ))}
        </div>
      </div>
    )
  }
}

export default ListBooks
