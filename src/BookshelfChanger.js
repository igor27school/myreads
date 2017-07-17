import React, { Component } from 'react'
import PropTypes from 'prop-types'
import SHELVES from './Shelves'

class BookshelfChanger extends Component {
  static propTypes = {
    bookId: PropTypes.string.isRequired,
    optionsState: PropTypes.string.isRequired,
    onChangeBookState: PropTypes.func.isRequired,
  }

  render() {
    return (
      <div className="book-shelf-changer">
        <select
          // TODO: find a better way to access bookId
          id={this.props.bookId}
          defaultValue={this.props.optionsState}
          onChange={(event) => (
            this.props.onChangeBookState(
              event.target.id,
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
