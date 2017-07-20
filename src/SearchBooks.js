import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import Bookshelf from './Bookshelf'
import * as BooksAPI from './BooksAPI'
import PropTypes from 'prop-types'

class SearchBooks extends Component {
  static propTypes = {
    books: PropTypes.array.isRequired,
    onChangeBookState: PropTypes.func.isRequired,
  }

  state = {
    query: '',
    foundBooks: []
  }

  updateQuery = (query) => {
    if (query.trim().length > 0) {
      BooksAPI.search(query.trim(), 20).then((foundBooks) => {
        this.setState({ foundBooks: foundBooks && Array.isArray(foundBooks) ?
          this.assignShelf(this.dedupBooks(foundBooks)) : [] })
      })
    } else {
      this.setState({ foundBooks: [] })
    }
    this.setState({ query })
  }

  dedupBooks = (books) => {
    const setBookIds = new Set()
    var uniqueBooks = []
    books.forEach((book) => {
      if (!setBookIds.has(book.id)) {
        uniqueBooks.push(book)
        setBookIds.add(book.id)
      }
    })
    return uniqueBooks
  }

  assignShelf = (foundBooks) => {
    const setBookIds = new Set(this.props.books.map((book) => book.id))
    return foundBooks.map((foundBook) => {
      if (setBookIds.has(foundBook.id)) {
        return this.props.books.find((book) => book.id === foundBook.id)
      } else {
        foundBook.shelf = "none"
        return foundBook
      }
    })
  }

  render() {
    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link
            to="/"
            className="close-search"
          >Close</Link>
          <div className="search-books-input-wrapper">
            <input
              type="text"
              placeholder="Search by title or author"
              value={this.state.query}
              onChange={(event) => this.updateQuery(event.target.value)}
            />
          </div>
        </div>
        <div className="search-books-results">
          <Bookshelf
            key="searchResults"
            title="Matched Books"
            books={this.state.foundBooks}
            onChangeBookState={this.props.onChangeBookState}
          />
        </div>
      </div>
    )
  }
}

export default SearchBooks
