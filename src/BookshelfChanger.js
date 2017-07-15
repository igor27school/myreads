import React, { Component } from 'react'
import PropTypes from 'prop-types'
import SHELVES from './Shelves'

class BookshelfChanger extends Component {
  static propTypes = {
    optionsState: PropTypes.string.isRequired,
  }

  render() {
    return (
      <div className="book-shelf-changer">
        <select defaultValue={this.props.optionsState}>
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
