import { combineReducers } from 'redux';
import app from 'reducers/app';
import people from 'reducers/people';
import dress from 'reducers/dress';

export default combineReducers({
  app,
  people,
  dress,
});
