import React, { Component } from 'react'
import PropTypes from 'prop-types'
import BookshelfChanger from './BookshelfChanger'

class Bookshelf extends Component {
  static propTypes = {
    title: PropTypes.string.isRequired,
    books: PropTypes.array.isRequired,
    onChangeBookState: PropTypes.func.isRequired,
  }

  render() {
    return this.props.books.length > 0 && (
      <div className="bookshelf">
        <h2 className="bookshelf-title">{this.props.title}</h2>
        <div className="bookshelf-books">
          <ol className="books-grid">
            {this.props.books.map((book, index) => (
                <li key={book.id + index}>
                  <div className="book">
                    <div className="book-top">
                      <div
                        className="book-cover"
                        style={{
                          width: 128,
                          height: 193,
                          backgroundImage: `url(${book.imageLinks && book.imageLinks.thumbnail})`
                        }}>
                      </div>
                      <BookshelfChanger
                        book={book}
                        onChangeBookState={this.props.onChangeBookState}
                      />
                    </div>
                    <div className="book-title">{book.title}</div>
                    <div className="book-authors">{
                      Array.isArray(book.authors) ?
                      book.authors.join(", ") :
                      book.authors
                    }</div>
                  </div>
                </li>
            ))}
          </ol>
        </div>
      </div>
    )
  }
}

export default Bookshelf
