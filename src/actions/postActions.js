
import {
    SET_SORT,
    GET_CATEGORY_POSTS,
    GET_ALL_POSTS,
    GET_POST_DETAILS,
    GET_POST_COMMENTS,
    ADD_POST,
    UPDATE_POST,
    VOTE_POST,
    VOTE_COMMENT,
    DELETE_POST,
    DELETE_POST_COMMENTS
} from './types';

import {
  api,
  headers,
  showError
} from './constants';

// load posts
const getAllPosts = (posts) => {
  return {
    type: GET_ALL_POSTS,
    posts
  }
}

export const loadAllPosts = () => {
  return dispatch => {
    fetch(`${ api }posts`, {headers})
      .then(res => {
        if (!res.ok) {
          throw res
        } else  return res.json()
      })
      .then(posts => dispatch(getAllPosts(posts)))
      .catch( error => showError(error));
  }
}

// load post comments
const getPostComments = (postId, comments)  => {
  return {
    type: GET_POST_COMMENTS,
    postId,
    comments
  }
}

export const loadPostComments = (postId) => {
  return dispatch => {
      fetch(`${api}posts/${postId}/comments`, {headers})
      .then(res => {
        if (!res.ok) {
          throw res
        } else  return res.json()
      })
      .then(comments => dispatch(getPostComments(postId, comments)))
      .catch( error => showError(error));
  }
}

const getCategoryPosts = (posts) => {
  return {
    type: GET_CATEGORY_POSTS,
    posts
  }
}

export const loadPosts = (category) => {
  if (!category || category === 'all') {
    return dispatch => {
      fetch(`${ api }posts`, {headers})
        .then(res => {
          if (!res.ok) {
            throw res
          } else  return res.json()
        })
        .then(posts => dispatch(getAllPosts(posts)))
        .catch( error => showError(error));
    }
  } else {
  return dispatch => {
    fetch(`${ api }${ category}/posts`, {headers})
      .then(res => {
        if (!res.ok) {
          throw res
        } else  return res.json()
      })
      .then(posts => dispatch(getCategoryPosts(posts)))
      .catch( error => showError(error));
  }
}}
// load post details
const getPostDetails = (post) => {
  return {
    type: GET_POST_DETAILS,
    post
  }
}
export const getPost = (postId) => {
  return dispatch => {
    fetch(`${api}posts/${postId}`, {headers})
      .then(res => {
        if (!res.ok) {
          throw res
        } else  return res.json()
      })
    .then(post => dispatch(getPostDetails(post)))
    .catch( error => showError(error));
  }
}

// requests to add data
const addPost = (post) => {
  return {
    type: ADD_POST,
    post
  }
}

export const sendPost = (post) => {
  return dispatch => {
  fetch(`${api}posts`, {
    method: 'POST',
    headers: headers,
    body: JSON.stringify({
      id: post.id,
      timestamp: post.timestamp,
      title: post.title,
      body: post.body,
      author: post.author,
      category: post.category,
      commentCount: post.commentCount
     }),
  })
  .then(res => {
    if (!res.ok) {
      throw res
    } else  return res.json()
  })
  .then(post => dispatch(addPost(post)))
  .catch( error => showError(error));
  }
}

export const destroyPost = (postId) => {

  return dispatch => {
    fetch(`${api}posts/${postId}`, {
      method: 'DELETE',
      headers: headers
    })
  .then(res => {
    if (!res.ok) {
      throw res
    } else return
  })
  .then(() => dispatch(deletePost(postId)))
  .then(() => dispatch(deletePostComments(postId)))
  .catch( error => showError(error));
  }
}

const deletePost = (postId) => {
  return {
    type: DELETE_POST,
    postId
  }
}

const deletePostComments = (postId) => {
  return {
    type: DELETE_POST_COMMENTS,
    postId
  }
}

// used for editing posts
const updatePost = (body, title, postId) => {
  return {
    type: UPDATE_POST,
    body, title, postId
  }
}

export const editPost = (post) => {
  const postId = post.id
  return dispatch => {
  fetch(`${api}posts/${post.id}`, {
    method: 'PUT',
    headers: headers,
    body: JSON.stringify({
      title: post.title,
      timestamp: post.timestamp,
      body: post.body
     }),
  })
  .then(res => {
    if (!res.ok) {
      throw res
    } else {
      return res.json()
    }
  })
  .then(post => dispatch(updatePost(post.body, post.title, postId)))
  .catch( error => showError(error));
  }
}

// voting
const votePost = (post) => {
  return {
    type: VOTE_POST,
    post
  }
}

export const sendPostVote = (postId, vote) => {
  return dispatch => {
   fetch(`${ api}posts/${postId}`, {
        method: 'POST',
        headers: headers,
        body: JSON.stringify({
          option: vote
        })
      })
    .then(res => {
      if (!res.ok) {
        throw res
      } else  return res.json()
    })
    .then(post => dispatch(votePost(post)))
    .catch( error => showError(error));
  }
}

const voteComment = (comment) => {
  return {
    type: VOTE_COMMENT,
    comment
  }
}

export const sendCommentVote = (comment, vote) => {
  return dispatch => {
   fetch(`${ api}comments/${comment.id}`, {
        method: 'POST',
        headers: headers,
        body: JSON.stringify({
          option: vote
        })
      })
    .then(res => {
      if (!res.ok) {
        throw res
      } else  return res.json()
    })
    .then(comment => dispatch(voteComment(comment)))
    .catch( error => showError(error));
  }
}

export const setSort = (sortType) => {
  return {
    type: SET_SORT,
    sortType
  }
}
