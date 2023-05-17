export const filesReducer = (state = [], action) => {
  switch (action.type) {
  case 'SET_FILES':
  return action.payload;
  default:
  return state;
  }
  };

  export const fileCountReducer = (state = 0, action) => {
  switch (action.type) {
  case 'INCREMENT_FILE_COUNT':
  return state + action.payload;
  case 'DECREMENT_FILE_COUNT':
  return state - action.payload;
  default:
  return state;
  }
  };

  export const tokenReducer = (state = null, action) => {
  switch (action.type) {
  case 'SET_TOKEN':
  return action.payload;
  default:
  return state;
  }
  };
