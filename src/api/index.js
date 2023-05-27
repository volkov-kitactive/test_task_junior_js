import axios from 'axios';

const BASE_URL = 'https://job.kitactive.ru/api';

export const register = (obj) => axios.post(`${BASE_URL}/register`, obj);

export const login = (obj) => axios.post(`${BASE_URL}/login`, obj);

export const logout = (token) => axios.post(
  `${BASE_URL}/logout`,
  {},
  {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  },
);

export const getFiles = (token) => axios.get(`${BASE_URL}/media`, {
  headers: {
    Authorization: `Bearer ${token}`,
  },
});

export const getOneFile = (token, id) => axios.get(`${BASE_URL}/media/${id}`, {
  headers: {
    Authorization: `Bearer ${token}`,
  },
  responseType: 'blob',
});

export const deleteOneFile = (token, id) => axios.delete(`${BASE_URL}/media/${id}`, {
  headers: {
    Authorization: `Bearer ${token}`,
  },
});
