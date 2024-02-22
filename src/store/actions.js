/** экшены  */

export const setFiles = (files) => ({
  type: 'SET_FILES',
  payload: files,
});

export const incrementFileCount = (count) => ({
  type: 'INCREMENT_FILE_COUNT',
  payload: count,
});

export const decrementFileCount = (count) => ({
  type: 'DECREMENT_FILE_COUNT',
  payload: count,
});

export const deleteItem = (id) => ({
  type: 'DELETE_ITEM',
  payload: id,
});

export const addItem = (file) => ({
  type: 'ADD_ITEM',
  payload: file,
});

export const saveToken = (token) => ({ type: 'SET_TOKEN', payload: token });

export const setUser = (user) => ({ type: 'SET_USER', payload: user });

export const setCount = (count) => ({ type: 'SET_COUNT_NULL', payload: count });
