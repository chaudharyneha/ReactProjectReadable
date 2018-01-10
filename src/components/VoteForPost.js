import React, { Component } from 'react';
import PropTypes from 'prop-types'
import { connect } from 'react-redux';
import { sendPostVote } from '../actions'

class VoteForPost extends Component {
  static propTypes = {
    post: PropTypes.object.isRequired,
  }

  vote  = (postId, vote) =>  {
    this.props.sendVote(postId, vote)
  }

  render() {
    const {post} = this.props
    const postId = post.id || ''

  return (
    <div className="voting">
      <h2 className="vote-score">{post.voteScore}</h2>
      <button className="up"
        onClick={() => this.vote(postId, "upVote")}>
        up vote
      </button>
      <button className="down"
        onClick={() => this.vote(postId, "downVote")}>
        down vote
      </button>
    </div>
    )
  }
}

const mapStateToProps = (state) => {
  return { posts: state.posts }
}

const mapDispatchToProps = (dispatch) => {
  return {
    sendVote: (postId, vote) => dispatch(sendPostVote(postId, vote))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(VoteForPost)
