class Api {
  constructor({ baseUrl }) {
    this._baseUrl = baseUrl;
    this._token = localStorage.getItem("jwt");
  }

  _refreshToken() {
    this._token = localStorage.getItem("jwt");
  }

  _getResponseData(res) {
    if (!res.ok) {
      return Promise.reject(`Error: ${res.status}`);
    }
    return res.json();
  }

  getUserInfo() {
    return fetch(`${this._baseUrl}/users/me`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${this._token}`,
      },
    }).then(this._getResponseData);
  }

  addUserAvatar(data) {
    return fetch(`${this._baseUrl}/users/me/avatar`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${this._token}`,
      },
      method: "PATCH",
      body: JSON.stringify({
        avatar: data.avatarLink,
      }),
    }).then(this._getResponseData);
  }

  addUserInfo(data) {
    return fetch(`${this._baseUrl}/users/me`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${this._token}`,
      },
      method: "PATCH",
      body: JSON.stringify({
        name: data.name,
        about: data.about,
      }),
    }).then(this._getResponseData);
  }

  getCards() {
    return fetch(`${this._baseUrl}/cards`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${this._token}`,
      },
    }).then(this._getResponseData);
  }

  addCard(data) {
    return fetch(`${this._baseUrl}/cards`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${this._token}`,
      },
      method: "POST",
      body: JSON.stringify({
        name: data.title,
        link: data.image,
      }),
    }).then(this._getResponseData);
  }

  deleteCard(id) {
    return fetch(`${this._baseUrl}/cards/${id}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${this._token}`,
      },
      method: "DELETE",
    }).then(this._getResponseData);
  }

  addLikeCard(id) {
    return fetch(this._baseUrl + "/cards/likes/" + id, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${this._token}`,
      },
    }).then(this._getResponseData);
  }

  removeLikeCard(id) {
    return fetch(this._baseUrl + "/cards/likes/" + id, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${this._token}`,
      },
    }).then(this._getResponseData);
  }

  changeLikeCardStatus(id, isLiked) {
    if (isLiked) {
      return this.removeLikeCard(id);
    } else {
      return this.addLikeCard(id);
    }
  }
}

const api = new Api({
  baseUrl: "https://api.kristina.students.nomoredomainssbs.ru",
  // const baseURL = "http://localhost:3000";
});

export default api;
