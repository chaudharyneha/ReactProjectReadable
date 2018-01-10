import { combineReducers } from 'redux'
import {reducer as form} from 'redux-form';
import posts from './posts';
import comments from './comments';
import categories from './categories';
import sortedPosts from './sortedPosts';

const appReducer = combineReducers({
  form,
  posts,
  comments,
  categories,
  sortedPosts
});

export default appReducer;
