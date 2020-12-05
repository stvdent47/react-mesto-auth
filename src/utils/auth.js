export const BASE_URL = 'https://auth.nomoreparties.co';

const resCheck = (res) => res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`);

export const signup = (email, password) => {
  return fetch(`${BASE_URL}/signup`, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ password, email }),
  })
    .then(resCheck);
};

export const signin = (email, password) => {
  return fetch(`${BASE_URL}/signin`, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      password,
      email
    }),
  })
    .then(resCheck);
}

export const getContent = (token) => {
  return fetch(`${BASE_URL}/users/me`, {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      "Content-Type": "application/json",
      "Authorization" : `Bearer ${token}`
    }
  })
    .then(resCheck);
}