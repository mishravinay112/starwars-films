import api from '../lib/api';
import { FILMS_ENDPOINT, CHARACTERS_ENDPOINT } from '../util/api-endpoints';
import { REQUEST_SEARCH_DATA, RECEIVE_SEARCH_DATA, UPDATE_SEARCH } from './constants';
import { recieveFilm, fetchFilmIfNeeded } from './films';
import { recieveCharacter } from './characters';

const updateSearchString = searchString => ({
  type: UPDATE_SEARCH,
  searchString,
});

const requestData = searchString => ({
  type: REQUEST_SEARCH_DATA,
  searchString,
});

export const receiveData = (searchString, searches) => ({
  type: RECEIVE_SEARCH_DATA,
  searchString,
  searches,
  receivedAt: Date.now(),
});

export const preparesearches = async (array, dispatch) => {
  let combined = [];

  array.forEach(item => {
    combined = combined.concat(item.results);
  });

  // Iterating films seprate helps to reduce network request which is more efficient
  await combined.map(item => {
    if (item.title) {
      dispatch(recieveFilm(item));
    }
  });

  return combined.map(item => {
    if (item.name) {
      dispatch(recieveCharacter(item));
      item.films.map(url => dispatch(fetchFilmIfNeeded(url)));
    }
    return item.url;
  });
};

const fetchAllSearches = (searchString, getState) => {
  const endpoints = [
    `${FILMS_ENDPOINT}/?search=${searchString}`,
    `${CHARACTERS_ENDPOINT}/?search=${searchString}`
  ];

  return dispatch => {
    dispatch(updateSearchString(searchString));
    dispatch(requestData(searchString));
    return Promise.all(endpoints.map(url =>
      api(url).then(resp => resp.json())
    ))
    .then(array => preparesearches(array, dispatch, getState))
    .then(json => dispatch(receiveData(searchString, json)));
  };
};

const shouldFetchSearches = (state, searchString) => {
  const searches = state.searchesByString[searchString];
  if (!searches) {
    return true;
  } else if (searches.isFetching) {
    return false;
  }
  return false;
};

export const fetchSearchesIfNeeded = searchString => (dispatch, getState) => {
  if (shouldFetchSearches(getState(), searchString)) {
    return dispatch(fetchAllSearches(searchString, getState));
  }
  return dispatch(updateSearchString(searchString));
};
