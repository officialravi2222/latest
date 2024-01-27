import counterSlice from './counterSlice';
import userSlice from './userSlice';
import { combineReducers } from 'redux';

export const rootReducer = combineReducers({
  user: userSlice,
  counter: counterSlice
});
