import {
    LOAD_CATEGORIES,
    SET_CATEGORY
} from './types';

import {
  api,
  headers,
  showError
} from './constants';

// categories
const getCategories = (categories) => {
  return {
    type: LOAD_CATEGORIES,
    categories
  }
}
export const loadCategories = () => {
  return dispatch => {
    fetch(`${ api }categories`, {headers})
      .then(res => {
        if (!res.ok) {
          throw res
        } else  return res.json()
      })
    .then(categories => dispatch(getCategories(categories)))
    .catch( error => showError(error));
  }
}

export const setCategory = (category) => {
  return {
    type: SET_CATEGORY,
    category
  }
}
