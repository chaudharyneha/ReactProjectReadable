import  {
    SET_CATEGORY,
    SET_SORT
} from '../actions';

const INITIAL_STATE = {
  category: 'all',
  sortType: 'votesUp',
  error: {}
}

export default function (state = INITIAL_STATE, action) {
  switch (action.type) {
    case SET_CATEGORY:
      return {
        ...state,
        category: action.category
      }
    case SET_SORT:
      return {
        ...state,
        sortType: action.sortType
      }
    default:
      return state;
  }
}
