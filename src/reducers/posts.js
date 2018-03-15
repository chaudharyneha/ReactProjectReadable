import  {
    DELETE_POST,
    ADD_POST,
    GET_ALL_POSTS,
    GET_POST_DETAILS,
    GET_CATEGORY_POSTS,
    UPDATE_POST,
    VOTE_POST,
    DECREMENT_COMMENTS,
    INCREMENT_COMMENTS
} from '../actions/types';

const INITIAL_STATE = []

export default function (state = INITIAL_STATE, action) {
  switch (action.type) {
    case ADD_POST:
      return [
        ...state,
        action.post
      ]

    case DELETE_POST:
      return state.filter((post) => post.id !== action.postId)

    case GET_ALL_POSTS:
      return action.posts

    case GET_POST_DETAILS:
        return [action.post]

    case GET_CATEGORY_POSTS:
       return action.posts

    case UPDATE_POST:
      return state.map((post) => post.id === action.postId
        ? {...post, title: action.title, body:action.body}
        : post)

    case VOTE_POST:
      return state.map(
         (post) => post.id === action.post.id ? action.post : post )

    case DECREMENT_COMMENTS:
      return state.map((post) => post.id === action.postId
        ?  {...post, commentCount: post.commentCount - 1}
        : post)

    case INCREMENT_COMMENTS:
      return state.map((post) => post.id === action.postId
        ?  {...post, commentCount: post.commentCount + 1}
        : post)
    default:
      return state;
  }
}
