import { Map } from 'immutable';

import {
  GET_DRESS_START,
  GET_DRESS_ERROR,
  GET_DRESS_SUCCESS,

  CREATE_DRESS_START,
  CREATE_DRESS_ERROR,
  CREATE_DRESS_SUCCESS,
} from 'actions/dress';

const initialState = Map({
  loading: false,
  error: null,
  dress: null,

  createLoading: false,
  createError: null,
  createSuccess: null,
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
      error: action.error,
    }));
  },
  [GET_DRESS_SUCCESS]: (state, action) => {
    return state.merge(Map({
      loading: false,
      dress: action.data,
    }));
  },
  [CREATE_DRESS_START]: (state) => {
    return state.merge(Map({
      createLoading: true,
      createError: null,
      createSuccess: null,
    }));
  },
  [CREATE_DRESS_ERROR]: (state, action) => {
    return state.merge(Map({
      createLoading: false,
      createError: action.error,
    }));
  },
  [CREATE_DRESS_SUCCESS]: (state, action) => {
    return state.merge(Map({
      createLoading: false,
      createSuccess: action.data,
    }));
  },
};

export default function reducer(state = initialState, action = {}) {
  const fn = actionsMap[action.type];
  return fn ? fn(state, action) : state;
}
