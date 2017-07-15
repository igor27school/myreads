import React, { Component } from 'react'
import Bookshelf from './Bookshelf'
import PropTypes from 'prop-types'

const SHELVES = [
  {
    'title': 'Currently Reading',
    'filter': 'currentlyReading',
  },
  {
    'title': 'Want to Read',
    'filter': 'wantToRead',
  },
  {
    'title': 'Read',
    'filter': 'read',
  },
]

class ListBooks extends Component {
  static propTypes = {
    books: PropTypes.array.isRequired,
  }

  render() {
    return (
      <div className="list-books-content">
        <div>
          {SHELVES.map((shelf) => (
            <Bookshelf
              key={shelf.title}
              title={shelf.title}
              books={this.props.books.filter((book) => (
                book.shelf === shelf.filter
              ))}
            />
          ))}
        </div>
      </div>
    )
  }
}

export default ListBooks
