import axios from "axios";

const BASE_URL = "https://job.kitactive.ru/api";

export const register = (obj) => {
  return axios.post(`${BASE_URL}/register`, obj);
};

export const login = (obj) => {
  console.log(obj);
  return axios.post(`${BASE_URL}/login`, obj);
};

export const logout = (token) => {
  return axios.post(
    `${BASE_URL}/logout`,
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};

export const getFiles = (token) => {
  return axios.get(`${BASE_URL}/media`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}

// ! Убран, так как загрузчик XHR от UPPY, лучше делает свою работу
/* export const addFiles = (obj, token) => {
  return axios.post(`${BASE_URL}/media/upload`, {
    obj,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
} */

export const getOneFile = (token, id) => {
  return axios.get(`${BASE_URL}/media/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    responseType: 'blob'
  });
}

export const deleteOneFile = (token, id) => {
  return axios.delete(`${BASE_URL}/media/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}
