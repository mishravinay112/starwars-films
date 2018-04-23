import { REQUEST_FILM, RECIEVE_FILM } from '../actions/constants';

const initialState = {};

const films = (state = initialState, action) => {
  switch (action.type) {
  case REQUEST_FILM:
    return {
      ...state,
      [action.url]: {
        isFetching: true
      }
    };
  case RECIEVE_FILM:
    return {
      ...state,
      [action.film.url]: {
        ...action.film,
        isFetching: false
      }
    };
  default:
    return state;
  }
};

export default films;
