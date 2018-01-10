import React, { Component } from 'react'
import VoteForPost from './VoteForPost'
import UpdatePost from './UpdatePost'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import formatDate from '../utils/helpers.js'

class PostLayout extends Component {
  static propTypes = {
    post: PropTypes.object.isRequired,
  }

  render() {
    const {post} = this.props
    const link = `${post.category}/${post.id}`

    return (

        <div className="post">
          <VoteForPost post={post} />
          <div>
            <div>
              <Link to={link}>
                <div className="post-heading">
                  <div>{post.category}:</div>
                  <div className="post-title">{post.title}</div>
                </div>
                <div>
                  <div>written by: {post.author}</div>
                  <div>date/time: {formatDate(post.timestamp)}</div>
                  <button>check comments {post.commentCount}</button>
                </div>
              </Link>
            </div>
            <UpdatePost post={ post } />
          </div>
        </div>
    )
  }
}

export default PostLayout
