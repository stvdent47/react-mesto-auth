export const BASE_URL = 'https://auth.nomoreparties.co';

export const signup = (email, password) => {
  return fetch(`${BASE_URL}/signup`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password }),
  })
    .then((res) => {
      if (res.ok) {
        res.json();
      }
    })
    .then((res) => res)
    .catch((err) => console.error(err));
};
