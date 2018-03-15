import {
    ADD_COMMENT,
    UPDATE_COMMENT,
    DELETE_COMMENT,
    INCREMENT_COMMENTS,
    DECREMENT_COMMENTS
} from './types';

import {
  api,
  headers,
  showError
} from './constants';

const deleteComment = (commentId, parentId) => {
  return {
    type: DELETE_COMMENT,
    commentId,
    parentId
  }
}

const decrementComments =(postId) =>{
  return {
    type: DECREMENT_COMMENTS,
    postId
  }
}

export const destroyComment = (comment) => {
  return dispatch => {
    fetch(`${api}comments/${comment.id}`, {
      method: 'DELETE',
      headers: headers
  })
  .then(res => {
    if (!res.ok) {
      throw res
    } else  return
  })
  .then(() => dispatch(deleteComment(comment.id, comment.parentId)))
  .then(() => dispatch(decrementComments(comment.parentId)))
  .catch( error => showError(error));
  }
}

const updateComment = (comment, commentId, parentId) => {
  return {
    type: UPDATE_COMMENT,
    comment,
    commentId,
    parentId
  }
}

export const editComment = (comment) => {
  const parentId = comment.parentId
  const commentId = comment.id
  return dispatch => {
  fetch(`${api}comments/${commentId}`, {
    method: 'PUT',
    headers: headers,
    body: JSON.stringify({
      body: comment.body,
      timestamp: comment.timestamp,
     }),
  })
  .then(res => {
    if (!res.ok) {
      throw res
    } else  return res.json()
  })
  .then(comment => dispatch(updateComment(comment, commentId, parentId )))
  .catch( error => showError(error));
  }
}

const addComment =(comment) =>{
  return {
    type: ADD_COMMENT,
    comment
  }
}

const incrementComments =(postId) =>{
  return {
    type: INCREMENT_COMMENTS,
    postId
  }
}

export const sendComment = (comment) => {
  return dispatch => {
  fetch(`${api}comments`, {
    method: 'POST',
    headers: headers,
    body: JSON.stringify({
      id: comment.id,
      timestamp: comment.timestamp,
      body: comment.body,
      author: comment.author,
      parentId: comment.parentId
     }),
  })
  .then(res => {
    if (!res.ok) {
      throw res
    } else  return res.json()
  })
  .then(comment => dispatch(addComment(comment)))
  .then(() => dispatch(incrementComments(comment.parentId)))
  .catch( error => showError(error));
  }
}
