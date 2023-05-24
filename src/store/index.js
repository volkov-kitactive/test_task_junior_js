import { createStore, combineReducers } from "redux";
import { filesReducer, tokenReducer, fileCountReducer, userReducer, loggedInReducer } from "./reducers";

const initialState = {
  token: null,
  files: [],
  fileCount: 0,
  user: {
    email: null
  },
  loggedIn: false
};

// стор работает на мейн редьюсере, каждый из них меняет своё значение
const rootReducer = combineReducers({
  token: tokenReducer,
  files: filesReducer,
  fileCount: fileCountReducer,
  user: userReducer,
  loggedIn: loggedInReducer
});

// создаём стор
const store = createStore(rootReducer, initialState);

export default store;
