import React, { Component } from 'react'
import { connect } from 'react-redux'
import CreatePostModal from './CreatePostModal'
import { sendPost } from '../actions'
import { reset } from 'redux-form';
import Modal from 'react-modal'

class CreatePost extends Component {

  state = {
    showPostModal: false
  }

  showCreatePostModal = () => this.setState(() => ({ showPostModal: true }))
  hideCreatePostModal = () => this.setState(() => ({ showPostModal: false }))

  addPost = (post) => {
    const uuidv1 = require('uuid/v1');
    const newPost = {
      id: uuidv1(),
      timestamp: Date.now(),
      title: post.title,
      body: post.body,
      author: post.author,
      category: post.category
    }
    this.props.addNewPost(newPost)
    this.props.resetPostForm()
    this.hideCreatePostModal()
  }

  render() {
    const { showPostModal } = this.state

    return (
    <div>
      <Modal
        className='modal'
        overlayClassName='overlay'
        isOpen={showPostModal}
        onRequestClose={this.hideCreatePostModal}
        contentLabel='Modal'
      >
        {showPostModal && <CreatePostModal onSubmit={this.addPost} />}
        <button onClick={this.hideCreatePostModal}>back</button>
      </Modal>
      <button className="create-post-btn" onClick={this.showCreatePostModal}>
        <div className="create-post-txt">Create a new post</div>
      </button>
    </div>

    )
  }
}

const mapStateToProps = (state) => {
  return {

  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    addNewPost: (post) => dispatch(sendPost(post)),
    resetPostForm:() => dispatch(reset('CreatePostModal')),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CreatePost)
