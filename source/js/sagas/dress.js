import { call, put, fork, take } from 'redux-saga/effects';
import api from 'api';

import {
  GET_DRESS_START,
  GET_DRESS_ERROR,
  GET_DRESS_SUCCESS,
} from 'actions/dress';

// -------- Get all dress

function* getDress(page) {
  try {
    const raw = yield call(api.getDress, page);
    const data = raw.dress;
    const action = { type: GET_DRESS_SUCCESS, data };
    yield put(action);
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


export default function* dressSagas() {
  yield fork(watchGetDress);
}
