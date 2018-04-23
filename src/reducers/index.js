import { combineReducers } from 'redux';

import displayDetail from './display';
import searchesByString from './searchRecord';
import searchString from './searchString';
import films from './films';
import characters from './characters';


export default combineReducers({
  displayDetail,
  searchesByString,
  searchString,
  films,
  characters
});
