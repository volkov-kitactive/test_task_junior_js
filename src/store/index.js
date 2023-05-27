/* eslint-disable import/no-extraneous-dependencies */
import { createStore, combineReducers } from 'redux';
import {
  filesReducer, tokenReducer, fileCountReducer, userReducer,
} from './reducers';

const initialState = {
  token: null,
  files: [],
  fileCount: 0,
  user: {
    email: null,
  },
};

// стор работает на мейн редьюсере, каждый из них меняет своё значение
const rootReducer = combineReducers({
  token: tokenReducer,
  files: filesReducer,
  fileCount: fileCountReducer,
  user: userReducer,
});

// создаём стор
const store = createStore(rootReducer, initialState);

export default store;
