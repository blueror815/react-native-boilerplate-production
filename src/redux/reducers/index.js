import { combineReducers } from 'redux';

import upload from './upload';
import counter from './counter';

export default combineReducers({
  counter,
  upload
});
