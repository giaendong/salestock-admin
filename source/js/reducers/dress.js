import { Map } from 'immutable';

import {
  GET_DRESS_START,
  GET_DRESS_ERROR,
  GET_DRESS_SUCCESS,
  GET_DRESS_EMPTY,

  CREATE_DRESS_START,
  CREATE_DRESS_ERROR,
  CREATE_DRESS_SUCCESS,
} from 'actions/dress';

const initialState = Map({
  loading: false,
  error: null,
  dress: null,
  dressEmpty: false,

  createLoading: false,
  createError: false,
  createSuccess: false,
});

const actionsMap = {
  // Async action
  [GET_DRESS_START]: (state) => {
    return state.merge(Map({
      loading: true,
      error: null,
      dress: null,
      dressEmpty: false,
    }));
  },
  [GET_DRESS_ERROR]: (state, action) => {
    return state.merge(Map({
      loading: false,
      error: action.error,
      dressEmpty: false,
    }));
  },
  [GET_DRESS_SUCCESS]: (state, action) => {
    return state.merge(Map({
      loading: false,
      dress: action.data,
      dressEmpty: false,
    }));
  },
  [GET_DRESS_EMPTY]: (state) => {
    return state.merge(Map({
      loading: false,
      dressEmpty: true,
    }));
  },
  [CREATE_DRESS_START]: (state) => {
    return state.merge(Map({
      createLoading: true,
      createError: false,
      createSuccess: false,
    }));
  },
  [CREATE_DRESS_ERROR]: (state) => {
    return state.merge(Map({
      createLoading: false,
      createError: true,
    }));
  },
  [CREATE_DRESS_SUCCESS]: (state) => {
    return state.merge(Map({
      createLoading: false,
      createSuccess: true,
    }));
  },
};

export default function reducer(state = initialState, action = {}) {
  const fn = actionsMap[action.type];
  return fn ? fn(state, action) : state;
}
