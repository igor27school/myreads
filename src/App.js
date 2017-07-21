import React from 'react'
import { Link, Route } from 'react-router-dom'
import ListBooks from './ListBooks'
import SearchBooks from './SearchBooks'
import * as BooksAPI from './BooksAPI'
import './App.css'

class BooksApp extends React.Component {

  state = {
    books: []
  }

  componentDidMount() {
    BooksAPI.getAll().then((books) => {
      this.setState({ books })
    })
  }

  moveBook = (inputBook, newShelf) => {
    // Updating the book's shelf client-side.
    inputBook.shelf = newShelf;
    this.setState((prevState) => ({
      books: prevState.books.filter(
        (book) => book.id !== inputBook.id).concat([inputBook])
    }))
    // Updating the book's shelf server-side.
    BooksAPI.update({id: inputBook.id}, newShelf)
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
