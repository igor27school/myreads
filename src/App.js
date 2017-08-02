import React from 'react'
import { Link, Route } from 'react-router-dom'
import ListBooks from './components/ListBooks'
import SearchBooks from './components/SearchBooks'
import * as BooksAPI from './utils/BooksAPI'
import './App.css'

class BooksApp extends React.Component {

  state = {
    books: []
  }

  componentDidMount() {
    BooksAPI.getAll().then((books) => {
      this.setState({ books })
    }).catch((error) => {
      console.log("An error occurred while retrieving books: " + error)
    })
  }

  /**
  * @description Assigns the new shelf to the book, both client-side and server-side. NOTE: If server-side update fails, we don't undo the change
  * @param {object} inputBook - A book object being changed
  * @param {string} newShelf - The value of the shelf onto which the book is being transferred
  */
  moveBook = (inputBook, newShelf) => {
    // Updating the book's shelf client-side.
    inputBook.shelf = newShelf;
    this.setState((prevState) => ({
      books: prevState.books.filter(
        (book) => book.id !== inputBook.id).concat([inputBook])
    }))
    // Updating the book's shelf server-side.
    BooksAPI.update({id: inputBook.id}, newShelf).catch((error) => {
      console.log("An error occurred while updating " + inputBook.title + ": " + error)
    })
  }

  render() {
    return (
      <div className="app">
        <Route path="/search" render={() => (
          <SearchBooks
            books={this.state.books}
            onChangeBookState={this.moveBook}
          />
        )}/>
        <Route path="/" exact render={() => (
          <div className="list-books">
            <div className="list-books-title">
              <h1>MyReads</h1>
            </div>
            <ListBooks
              books={this.state.books}
              onChangeBookState={this.moveBook}
            />
            <div className="open-search">
              <Link
                to="/search"
              >Add a book</Link>
            </div>
          </div>
        )}/>
      </div>
    )
  }
}

export default BooksApp
