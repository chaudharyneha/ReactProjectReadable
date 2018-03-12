import React, { Component } from 'react'
import PropTypes from 'prop-types'
import AddCommentModal from './AddCommentModal'
import { reset } from 'redux-form'
import { connect } from 'react-redux'
import { sendComment } from '../actions'
import Modal from 'react-modal'

class AddComment extends Component {
  static propTypes = {
    postId: PropTypes.string.isRequired
  }

  state = {
    commentModalOpen: false
  }

  openAddCommentModal = () => this.setState(() => ({ commentModalOpen: true }))
  closeAddCommentModal = () => this.setState(() => ({ commentModalOpen: false }))

  submitComment = (comment) => {
    // to create unique IDs for new posts
    const uuidv1 = require('uuid/v1');
    const newComment = {
      id: uuidv1(),
      timestamp: Date.now(),
      body: comment.body,
      author: comment.author,
      parentId: this.props.postId
    }
    this.props.addNewComment(newComment)
    this.props.resetCommentForm()
    this.closeAddCommentModal()
  }

  render() {
    const { commentModalOpen } = this.state

    return (
      <div>
        <Modal
          className='modal'
          overlayClassName='overlay'
          isOpen={commentModalOpen}
          onRequestClose={this.closeAddCommentModal}
          contentLabel='Modal'
        >
          {commentModalOpen && <AddCommentModal onSubmit={this.submitComment} />}
          <button onClick={this.closeAddCommentModal}>close</button>
        </Modal>
        <button className="create-post-btn" onClick={this.openAddCommentModal}>
          <div>Create new comment</div>
        </button>
      </div>
    )
  }
}
const mapStateToProps = (state) => {
  return {}
}

const mapDispatchToProps = (dispatch) => {
  return {
    addNewComment: (comment) => dispatch(sendComment(comment)),
    resetCommentForm:() => dispatch(reset('commentForm'))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddComment)
