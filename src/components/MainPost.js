import React, { Component } from 'react';
import PropTypes from 'prop-types'
import formatDate from "../utils/helpers.js"
import UpdatePost from './UpdatePost'

class MainPost extends Component {
  static propTypes = {
    post: PropTypes.object.isRequired,
  }

  render() {
    const {post} = this.props

    return (
      <div>
        <div>
        <div>
          <div>{post.category}</div>
          <h3>{post.title}</h3>
          <div>
            <div>{post.author}</div>
            <div>{post.commentCount}</div>
            <div>{formatDate(post.timestamp)}</div>
          </div>
        </div>
        <UpdatePost post={ post } />
      </div>
        <div>{post.body}</div>
      </div>
    )
  }
}

export default MainPost
