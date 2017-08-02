import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import Bookshelf from './Bookshelf'
import * as BooksAPI from '../utils/BooksAPI'
import * as Utils from '../utils/Utils'
import PropTypes from 'prop-types'

/**
* @description Manages the Search Mode of MyReads App
*/
class SearchBooks extends Component {
  static propTypes = {
    books: PropTypes.array.isRequired,
    onChangeBookState: PropTypes.func.isRequired,
  }

  state = {
    query: '',
    foundBooks: []
  }

  /**
  * @description Updates the query results based on input. Calls backend
  * @param {string} query - User's search query
  */
  updateQuery = (query) => {
    if (query.trim().length > 0) {
      BooksAPI.search(query.trim(), 20).then((foundBooks) => {
        this.setState({ foundBooks: foundBooks && Array.isArray(foundBooks) ?
          this.assignShelf(Utils.dedupBooks(foundBooks)) : [] })
      }).catch((error) => {
        console.log("An error occurred while searching for books: " + error)
        this.setState({ foundBooks: [] })
      })
    } else {
      this.setState({ foundBooks: [] })
    }
    this.setState({ query })
  }

  /**
  * @description Figures out an appropriate "shelf" for every book in the list
  * @param {array} foundBooks - An array of books
  * @returns {array} An array of books with correctly assigned shelf
  */
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
