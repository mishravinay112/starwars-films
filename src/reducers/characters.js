import { REQUEST_CHARACTER, RECIEVE_CHARACTER } from '../actions/constants';

const initialState = {};

const characters = (state = initialState, action) => {
  switch (action.type) {
  case REQUEST_CHARACTER:
    return {
      ...state,
      [action.url]: {
        isFetching: true
      }
    };
  case RECIEVE_CHARACTER:
    return {
      ...state,
      [action.character.url]: {
        ...action.character,
        isFetching: false
      }
    };
  default:
    return state;
  }
};

export default characters;
