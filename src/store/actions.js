/** экшены  */

export const setFiles = (files) => {
  return {
    type: "SET_FILES",
    payload: files,
  };
};

export const incrementFileCount = (count) => {
  return {
    type: "INCREMENT_FILE_COUNT",
    payload: count,
  };
};

export const decrementFileCount = (count) => {
  return {
    type: "DECREMENT_FILE_COUNT",
    payload: count,
  };
};

export const deleteItem = (id) => {
  return {
    type: "DELETE_ITEM",
    payload: id,
  };
};

export const addItem = (file) => {
  return {
    type: "ADD_ITEM",
    payload: file,
  };
};

export const saveToken = (token) => {
  return { type: "SET_TOKEN", payload: token };
};
