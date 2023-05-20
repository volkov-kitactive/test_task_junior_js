import { createStore, combineReducers } from "redux";
import { filesReducer, tokenReducer, fileCountReducer, } from "./reducers";

const initialState = {
  token: null,
  files: [],
  fileCount: 0,
};

// стор работает на мейн редьюсере, каждый из них меняет своё значение
const rootReducer = combineReducers({
  token: tokenReducer,
  files: filesReducer,
  fileCount: fileCountReducer,
});

// создаём стор
const store = createStore(rootReducer, initialState);

export default store;
