class Api {
  constructor({ url, headers }) {
    this._url = url;
    this._headers = headers;
  }
  /**
   * checking on errors: if a fetch is ok, returns json, if not shows an error
   */
  _checkErrors(res) {
    if (res.ok) {
      return res.json();
    } else {
      return Promise.reject(
        `Something is wrong: 4 8 15 16 23 42 && ${res.status} ${res.statusText}`
      );
    }
  }
  /**
   * @description getting profile info from the server
   */
  getProfileInfo() {
    return fetch(`${this._url}/users/me`, {
      method: 'GET',
      headers: this._headers,
    }).then(this._checkErrors);
  }
  /**
   * getting cards from the server
   */
  getCards() {
    return fetch(`${this._url}/cards`, {
      method: 'GET',
      headers: this._headers,
    }).then(this._checkErrors);
  }
  /**
   * editing user profile info on the server
   */
  editProfile(info) {
    return fetch(`${this._url}/users/me`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        name: info.name,
        about: info.about,
      }),
    }).then(this._checkErrors);
  }
  /**
   * updating profile avatar on the server
   */
  updateAvatar(avatarUrl) {
    return fetch(`${this._url}/users/me/avatar`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        avatar: avatarUrl,
      }),
    }).then(this._checkErrors);
  }
  /**
   * adding a new card to the server
   */
  addCard({ name, link }) {
    return fetch(`${this._url}/cards`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({
        name: name,
        link: link,
      }),
    }).then(this._checkErrors);
  }
  /**
   * removing a card from the server
   */
  removeCard(cardId) {
    return fetch(`${this._url}/cards/${cardId}`, {
      method: 'DELETE',
      headers: this._headers,
    }).then(this._checkErrors);
  }
  /**
   * @description this method sends a fetch request adding or removing like depending on whether a card is liked or not
   * @param {*} cardId is used to identify a card that is to changed
   * @param {*} isLiked is used to identify whether a card is liked or not
   */
  changeLikeCardStatus(cardId, isLiked) {
    if (isLiked) {
      return fetch(`${this._url}/cards/likes/${cardId}`, {
        method: 'DELETE',
        headers: this._headers,
      }).then(this._checkErrors);
    } else {
      return fetch(`${this._url}/cards/likes/${cardId}`, {
        method: 'PUT',
        headers: this._headers,
      }).then(this._checkErrors);
    }
  }
}

const api = new Api({
  url: 'https://mesto.nomoreparties.co/v1/cohort-15',
  headers: {
    authorization: '1ed91742-56fd-4a56-812b-580db32d6be2',
    'Content-Type': 'application/json',
  },
});
export default api;
