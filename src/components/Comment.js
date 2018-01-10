import React, { Component } from 'react'
import PropTypes from 'prop-types'
import UpdateCommentModal from './UpdateCommentModal'
import { connect } from 'react-redux';
import formatDate from "../utils/helpers.js"
import { sendCommentVote, editComment, destroyComment } from '../actions'
import { reset } from 'redux-form'
import Modal from 'react-modal'

class Comment extends Component {
  static propTypes = {
    comment: PropTypes.object.isRequired
  }

  state = {
    commentModalOpen: false
  }

  openEditCommentModal = () => this.setState(() => ({ commentModalOpen: true }))
  closeEditCommentModal = () => this.setState(() => ({ commentModalOpen: false }))

  editComment = (comment) => {
    const updatedComment = {
        id: comment.id,
        timestamp: Date.now(),
        body: comment.body,
        author: comment.author,
        parentId: comment.parentId
      }
      this.props.updateComment(updatedComment)
      this.props.resetCommentForm()
      this.closeEditCommentModal()
    }

  deleteComment =(comment) => this.props.destroyComment(comment)

  vote  = (comment, vote) =>  {
    this.props.sendVote(comment, vote)
  }


  render() {
    const { comment } = this.props
    const vote = this.vote
    const { commentModalOpen } = this.state

    return (
      <div className="comment">
        <Modal
          className='modal'
          overlayClassName='overlay'
          isOpen={commentModalOpen}
          onRequestClose={this.closeEditCommentModal}
          contentLabel='Modal'
        >
          {commentModalOpen && <UpdateCommentModal
            initialValues={comment}
            onSubmit={this.editComment} />}
            <button className="close-click" onClick={this.closeEditCommentModal}>close</button>
        </Modal>
        <div className="voting" key={comment.id}>
          <h2 className="vote-score">{comment.voteScore}</h2>
          <button className="up" onClick={() => vote(comment, "upVote")}>
            up
          </button>
          <button className="down" onClick={() =>vote(comment, "downVote")}>
            down
          </button>
        </div>
        <div className="comment-details">
          <div>
            <div>{comment.body}</div>
            <div className="comment-author">{ comment.author }</div>
            <div className="comment-time">{ formatDate(comment.timestamp) }</div>
          </div>
          <div className="comment-changes">
            <button onClick={this.deleteComment.bind(this, comment)}>Delete Comment</button>
            <button onClick={this.openEditCommentModal}>Update Comment</button>
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return { comments: state.comments }
}

const mapDispatchToProps = (dispatch) => {
  return {
    sendVote: (comment, vote) => dispatch(sendCommentVote(comment, vote)),
    updateComment: (comment) => dispatch(editComment(comment)),
    resetCommentForm:() => dispatch(reset('commentForm')),
    destroyComment:  (comment) => dispatch(destroyComment(comment))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Comment)
