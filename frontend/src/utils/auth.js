// const baseURL = "https://api.kristina.students.nomoredomainssbs.ru";
const baseURL = "http://localhost:3000";
const _getResponseData = (res) => {
  if (!res.ok) {
    return Promise.reject(`Error: ${res.status}`);
  }
  return res.json();
};

export const checkToken = (token) => {
  return fetch(baseURL + "/users/me", {
    method: "GET",
    headers: {
      Accept: 'application/json',
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  }).then(_getResponseData);
};

export const signIn = ({ email, password }) => {
  return fetch(baseURL + "/signin", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({ email, password }),
  })
    .then(_getResponseData)
};

export const signUp = ({ email, password }) => {
  return fetch(baseURL + "/signup", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({ email, password }),
  }).then(_getResponseData);
};
