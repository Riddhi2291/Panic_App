import {applyMiddleware, createStore} from 'redux';
import promise from 'redux-promise-middleware';
const thunkMiddleware = require('redux-thunk').thunk;
import {rootReducer} from '../reducers';

function getMiddlewares() {
  const middlewares = [thunkMiddleware, promise];
  return middlewares;
}

export const configureStore = initialState => {
  const store = createStore(
    rootReducer,
    initialState,
    applyMiddleware(...getMiddlewares()),
  );

  return store;
};

export const store = configureStore();
