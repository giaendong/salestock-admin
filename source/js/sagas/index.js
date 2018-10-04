import { all } from 'redux-saga/effects';

import peopleSagas from 'sagas/people';
import dressSagas from 'sagas/dress';

export default function* rootSaga() {
  yield all([
    ...peopleSagas,
    dressSagas(),
  ]);
}
