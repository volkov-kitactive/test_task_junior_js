/** Редьюсер ответственный за загрузку, удаление и добавление файлов */
export const filesReducer = (state = [], action) => {
  switch (action.type) {
    case "SET_FILES":
      return action.payload;
    case "DELETE_ITEM":
      return state.filter((item) => item.id !== action.payload);
    case "ADD_ITEM":
      return [...state, action.payload];
    default:
      return state;
  }
};

/** Редьюсер ответственный за счётчик кол-во файлов */
export const fileCountReducer = (state = 0, action) => {
  switch (action.type) {
    case "INCREMENT_FILE_COUNT":
      return state + action.payload;
    case "DECREMENT_FILE_COUNT":
      return state - action.payload;
    default:
      return state;
  }
};

/** Редьюсер ответственный за токен */
export const tokenReducer = (state = null, action) => {
  switch (action.type) {
    case "SET_TOKEN":
      return action.payload;
    default:
      return state;
  }
};

/** Редьюсер ответственный за пользователя */
export const userReducer = (state = null, action) => {
  switch (action.type) {
    case "SET_USER":
      return action.payload;
    default:
      return state;
  }
};

/** Редьюсер ответственный состояния входа для защиты роута */
export const loggedInReducer = (state = null, action) => {
  console.log(action);
  switch (action.type) {
    case "SET_LOGGEDIN":
      return { ...state, loggedIn: action.payload };
    default:
      return state;
  }
};
