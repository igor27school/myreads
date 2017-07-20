import React, { Component } from 'react'
import PropTypes from 'prop-types'
import SHELVES from './Shelves'

class BookshelfChanger extends Component {
  static propTypes = {
    book: PropTypes.object.isRequired,
    onChangeBookState: PropTypes.func.isRequired,
  }

  render() {
    return (
      <div className="book-shelf-changer">
        <select
          data-book={JSON.stringify(this.props.book)}
          defaultValue={this.props.book.shelf}
          onChange={(event) => (
            this.props.onChangeBookState(
              event.target.dataset.book,
              event.target.value
          ))}
        >
          <option value="none" disabled>Move to...</option>
          {SHELVES.map((shelf) => (
            <option
              key={shelf.value}
              value={shelf.value}
            >{shelf.title}</option>
          ))}
          <option value="none">None</option>
        </select>
      </div>
    )
  }
}

export default BookshelfChanger