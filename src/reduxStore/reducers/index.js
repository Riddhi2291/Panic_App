import {combineReducers} from 'redux';
import modelReducer from './modelReducer';

export const rootReducer = combineReducers({
  models: modelReducer,
});

export default rootReducer;
