import api from '../lib/api';
import { REQUEST_FILM, RECIEVE_FILM } from './constants';

const requestFilm = url => ({
  type: REQUEST_FILM,
  url
});

export const recieveFilm = film => ({
  type: RECIEVE_FILM,
  film
});

const shouldFetchFilm = (state, url) => {
  const film = state.films[url];

  if (!film) {
    return true;
  } else if (film.isFetching) {
    return false;
  }

  return false;
};

export const fetchFilmIfNeeded = url => (dispatch, getState) => {
  if (shouldFetchFilm(getState(), url)) {
    return dispatch(fetchFilm(url));
  }
};

const fetchFilm = url => async dispatch => {
  dispatch(requestFilm(url));
  const film = await api(url).then(film => film.json());

  if (film.title) {
    dispatch(recieveFilm(film));
  } else {
    // when we won't found the film in specified URL
    dispatch(recieveFilm({
      url,
      ...film
    }));
  }
};
