import api from '../lib/api';
import { REQUEST_CHARACTER, RECIEVE_CHARACTER } from './constants';

const requestCharacter = url => ({
  type: REQUEST_CHARACTER,
  url
});

export const recieveCharacter = character => ({
  type: RECIEVE_CHARACTER,
  character
});

const shouldFetchCharacter = (state, url) => {
  const character = state.characters[url];

  if (!character) {
    return true;
  } else if (character.isFetching) {
    return false;
  }

  return false;
};

export const fetchCharacterIfNeeded = url => (dispatch, getState) => {
  if (shouldFetchCharacter(getState(), url)) {
    dispatch(fetchCharacter(url));
  }
};

const fetchCharacter = url => async dispatch => {
  dispatch(requestCharacter(url));
  const character = await api(url).then(character => character.json());
  dispatch(recieveCharacter(character));
};
