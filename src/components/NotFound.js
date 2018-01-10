import React, { Component } from 'react'
import { Link } from 'react-router-dom'

class NotFound extends Component {

  render() {
    return (
        <div >
          <h3>Sorry, this page is not available. </h3>
          <Link to="/">
            <h4>Want to try again?</h4>
          </Link>
        </div>
      )
    }
}

export default NotFound
