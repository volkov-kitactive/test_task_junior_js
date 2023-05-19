import { createStore, combineReducers } from "redux";
import { filesReducer, tokenReducer, fileCountReducer, } from "./reducers";

const initialState = {
  token: null,
  files: [],
  fileCount: 0,
};

const rootReducer = combineReducers({
  token: tokenReducer,
  files: filesReducer,
  fileCount: fileCountReducer,
});

const store = createStore(rootReducer, initialState);

export default store;
