import { Map } from 'immutable';

import {
  GET_DRESS_START,
  GET_DRESS_ERROR,
  GET_DRESS_SUCCESS,
} from 'actions/dress';

const initialState = Map({
  loading: false,
  error: null,
  dress: null,
});

const actionsMap = {
  // Async action
  [GET_DRESS_START]: (state) => {
    return state.merge(Map({
      loading: true,
      error: null,
      dress: null,
    }));
  },
  [GET_DRESS_ERROR]: (state, action) => {
    return state.merge(Map({
      loading: false,
      error: action.error.message,
    }));
  },
  [GET_DRESS_SUCCESS]: (state, action) => {
    return state.merge(Map({
      loading: false,
      dress: action.data,
    }));
  },
};

export default function reducer(state = initialState, action = {}) {
  const fn = actionsMap[action.type];
  return fn ? fn(state, action) : state;
}
