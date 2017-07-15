import React, { Component } from 'react'
import Bookshelf from './Bookshelf'
import PropTypes from 'prop-types'

class ListBooks extends Component {
  static propTypes = {
    books: PropTypes.array.isRequired,
  }

  render() {
    const CURRENTLY_READING_STRING = 'currentlyReading';
    const WANT_TO_READ_STRING = 'wantToRead';
    const READ_STRING = 'read';
    return (
      <div className="list-books-content">
        <div>
          <Bookshelf
            title='Currently Reading'
            filter={CURRENTLY_READING_STRING}
            books={this.props.books}
          />
          <Bookshelf
            title='Want to Read'
            filter={WANT_TO_READ_STRING}
            books={this.props.books}
          />
          <Bookshelf
            title='Read'
            filter={READ_STRING}
            books={this.props.books}
          />
        </div>
      </div>
    )
  }
}

export default ListBooks
