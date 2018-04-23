import { REQUEST_SEARCH_DATA, RECEIVE_SEARCH_DATA } from '../actions/constants';

const initialSearchData = {
  isFetching: false,
  searchString: '',
  searches: []
};

const recievedData = (state = initialSearchData, action) => {
  switch (action.type) {
  case REQUEST_SEARCH_DATA:
    return {
      ...state,
      searchString: action.searchString,
      isFetching: true
    };
  case RECEIVE_SEARCH_DATA:
    return {
      isFetching: false,
      searches: action.searches,
    };
  default:
    return state;
  }
};

const searchesByString = (state = {}, action) => {
  switch (action.type) {
  case RECEIVE_SEARCH_DATA:
  case REQUEST_SEARCH_DATA:
    return {
      ...state,
      [action.searchString]: recievedData(state[action.searchString], action)
    };
  default:
    return state;
  }
};

export default searchesByString;
