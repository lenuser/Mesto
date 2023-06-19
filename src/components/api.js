export default class Api {
  constructor(options) {
    this._url = options.baseUrl;
    this._headers = options.headers;
    this._authorization = options.headers.authorization;
  }
// метод который проверяет ответ
  _checkResponse(res) {
    return res.ok ? res.json() : Promise.reject()
  }
//получение профиля работает 
  getInfo() {
    return fetch(`${this._url}/users/me`, {
      headers: {
        authorization: this._authorization,
      }
    })
    .then(this._checkResponse)
  }

//получение карточек 
  getCards() {
    return fetch(`${this._url}/cards`, {
      headers: {
        authorization: this._authorization,
      }
    })
    .then(this._checkResponse)
  }
  //кладет информацию о имени и профессии в профиле  работает
  setUserInfo({name, about}) {
    return fetch(`${this._url}/users/me`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({ name, about})
    })
    .then(this._checkResponse)
  }
//аватарка работает
  setAvatarNew({ avatar }) {
    return fetch(`${this._url}/users/me/avatar`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({ avatar })
    })
    .then(this._checkResponse)
  }
//создание новой карточки
  addCard({ name , link }) {
    return fetch(`${this._url}/cards`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify({ name, link })
    })
    .then(this._checkResponse)
  }
//постановка лайка
  addLike(cardId) {
    return fetch(`${this._url}/cards/${ cardId }/likes`, {
      method: "PUT",
      headers: {
        authorization: this._authorization,
      }
    })
    .then(this._checkResponse)
  }
  //удаление лайка
  deleteLike(cardId) {
    return fetch(`${this._url}/cards/${ cardId }/likes`, {
      method: "DELETE",
      headers: {
        authorization: this._authorization,
      }
    })
    .then(this._checkResponse)
  }
  //удаление карточки 
  deleteCard(cardId){
    return fetch(`${this._url}/cards/${cardId}`, {
        method: "DELETE",
        headers: {
          authorization: this._authorization,  
        }
      })
      .then(this._checkResponse)
  }

}
