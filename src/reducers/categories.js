import {
    LOAD_CATEGORIES,
    SET_CATEGORY,
    SET_SORT
} from '../actions/types';

const INITIAL_STATE = [];

export default function (state = INITIAL_STATE, action) {
    switch (action.type) {
        case LOAD_CATEGORIES:
            return [{name: 'all', path:'all'}].concat(action.categories.categories)
        default:
            return state;
    }
}
