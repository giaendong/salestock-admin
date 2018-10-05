import { call, put, fork, take } from 'redux-saga/effects';
import api from 'api';

import {
  GET_DRESS_START,
  GET_DRESS_ERROR,
  GET_DRESS_SUCCESS,
  GET_DRESS_EMPTY,

  CREATE_DRESS_START,
  CREATE_DRESS_ERROR,
  CREATE_DRESS_SUCCESS,
} from 'actions/dress';

// -------- Get all dress

function* getDress(page) {
  try {
    const raw = yield call(api.getDress, page);
    const data = raw.dress;
    if (Object.keys(data).length === 0) {
      yield put({ type: GET_DRESS_EMPTY });
    } else {
      yield put({ type: GET_DRESS_SUCCESS, data });
    }
  } catch (e) {
    yield put({ type: GET_DRESS_ERROR, e });
  }
}

function* watchGetDress() {
  while (true) {
    const { page } = yield take(GET_DRESS_START);
    yield* getDress(page);
  }
}

function* createDress(data) {
  try {
    const res = yield call(api.createDress, data);
    const action = { type: CREATE_DRESS_SUCCESS, res };
    yield put(action);
  } catch (e) {
    yield put({ type: CREATE_DRESS_ERROR, e });
  }
}

function* watchCreateDress() {
  while (true) {
    const { data } = yield take(CREATE_DRESS_START);
    yield* createDress(data);
  }
}


export default function* dressSagas() {
  yield fork(watchGetDress);
  yield fork(watchCreateDress);
}
