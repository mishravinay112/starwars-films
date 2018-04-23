import { UPDATE_SEARCH } from '../actions/constants';

const initialState = '';

const searchString = (state = initialState, action) => {
  switch (action.type) {
  case UPDATE_SEARCH:
    return action.searchString;
  default:
    return state;
  }
};

export default searchString;
