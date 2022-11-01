const baseURL = "https://register.nomoreparties.co";

const _getResponseData = (res) => {
  if (!res.ok) {
    return Promise.reject(`Error: ${res.status}`);
  }
  return res.json();
};

export const checkToken = async ({ userToken }) => {
  return await fetch(baseURL + "/users/me", {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${userToken}`,
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
    .then((response) => {
      if (response.token) {
        localStorage.setItem("accessToken", response.token);
        localStorage.setItem("userEmail", email);
        return response.token;
      }
    });
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
