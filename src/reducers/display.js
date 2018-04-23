import { SHOW_DETAIL, HIDE_DETAIL } from '../actions/constants';

const initialState = {
  show: false
};

const display = (state = initialState, action) => {
  switch (action.type) {
  case SHOW_DETAIL:
    return {
      show: true
    };
  case HIDE_DETAIL:
    return {
      show: false
    };
  default:
    return state;
  }
};

export default display;
