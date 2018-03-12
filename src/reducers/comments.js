import  {
    ADD_COMMENT,
    DELETE_COMMENT,
    GET_POST_COMMENTS,
    UPDATE_COMMENT,
    DELETE_POST_COMMENTS,
    VOTE_COMMENT
} from '../actions/types';

const INITIAL_STATE = {}

export default function (state = INITIAL_STATE, action) {
  switch (action.type) {
    case ADD_COMMENT:
      const comment = action.comment
      const parentId = comment.parentId
      return {
        ...state,
        [parentId]: [
          ...state[parentId],
          comment
        ]
      }

    case DELETE_COMMENT:
      return {
        ...state,
        [action.parentId]: state[action.parentId].filter((comment) => comment.id !== action.commentId)
      }

    case GET_POST_COMMENTS:
      return {
        ...state,
        [action.postId]: action.comments
      }

    case UPDATE_COMMENT:
      return {
        ...state,
        [action.parentId]: state[action.parentId].map((comment) => comment.id === action.commentId
          ? {...comment,
            body:action.comment.body,
            timestamp: action.comment.timestamp}
          : comment)
      }

    case DELETE_POST_COMMENTS:
      const newState = Object.assign( {}, state)
      delete newState[action.postId]
      return newState

    case VOTE_COMMENT:
      return {
        ...state,
        [action.comment.parentId]: state[action.comment.parentId].map((comment) => comment.id === action.comment.id
          ? action.comment
          : comment)
      }
    default:
      return state;
  }
}
