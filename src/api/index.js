import axios from "axios";

const BASE_URL = "https://job.kitactive.ru/api";

/* мне удобней через axios */

/* export const register = (email, password, name) => {
  return axios.post(`${BASE_URL}/register`, {
    email: email,
    password: password,
    name: name
  });
}; */

export const register = (obj) => {
  return axios.post(`${BASE_URL}/register`, obj);
};

export const login = (password, email) => {
  return axios.post(`${BASE_URL}/login`, { password: password, email: email });
};

export const logout = (token) => {
  return axios.post(`${BASE_URL}/logout`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const getFiles = (token) => {
  return axios.get(`${BASE_URL}/media`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}

export const addFiles = (obj, token) => {
  return axios.post(`${BASE_URL}/upload`, {
    obj, // !скорее всего неправильно
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}

export const getOneFile = (token, id) => {
  return axios.get(`${BASE_URL}/media/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}

export const deleteOneFile = (token, id) => {
  return axios.delete(`${BASE_URL}/media/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}
