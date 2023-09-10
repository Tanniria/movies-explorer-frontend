// import { checkResponse } from "./constants";
const BASE_URL = 'http://localhost:3000';

export function checkResponse(res) {
  if (res.ok) {
      return res.json();
  }
  return Promise.reject(`Ошибка: ${res.status}`);
};

const headers = {
  Accept: 'application/json',
  'Content-Type': 'application/json',
};

export const register = async ({ name, email, password }) => {
  const res = await fetch('http://localhost:3000/signup', {
    method: 'POST',
    headers,
    body: JSON.stringify({ name, email, password }),
  });
  return checkResponse(res);
};

export const login = async ({ email, password }) => {
  const res = await fetch(`http://localhost:3000/signin`, {
    method: 'POST',
    headers,
    body: JSON.stringify({ email, password }),
  });
  return checkResponse(res);
};

export const checkToken = async (token) => {
  const res = await fetch(`${BASE_URL}/users/me`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  console.log(res);
  return checkResponse(res);
};

export const getUserInfo = async (token) => {
  const res = await fetch(`${BASE_URL}/users/me`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });
  return checkResponse(res);
};

export const editUser = async (data, token) => {
  const res = await fetch(`${BASE_URL}/users/me`, {
    method: 'PATCH',
    headers: {
      ...headers,
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      name: data.name,
      email: data.email,
    }),
  });
  return checkResponse(res);
};