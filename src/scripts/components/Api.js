class Api {
    constructor( {adress, token} ) {
      this._adress = adress;
      this._token = token;
    }
  
    _handleResponse = (response) => {
      if (response.ok) {
        return response.json();
      }
      return Promise.reject(`Ошибка: ${response.status}`);
    }
  
    getCards() {
      return fetch(`${this._adress}/cards`, {
        headers: {
          authorization: this._token
        }
      }).then(this._handleResponse);
    }
  
    addCard({name, link}) {
      return fetch(`${this._adress}/cards`, {
        method: 'POST',
        headers: {
          authorization: this._token,
          'Content-type': 'application/json'
        },
        body: JSON.stringify({
          name: name,
          link: link
        }) 
      }) .then(res => res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`))
    }
  
    getUserInfo() {
      return fetch(`${this._adress}/users/me`, {
        headers: {
          authorization: this._token
        }
      }).then(response => {
        console.log(response)
        if (response.ok) {
          return response.json();
        }
        return Promise.reject(`Ошибка: ${response.status}`);
      })
    }
  
    updateUserInfo( {name, job} ) {
      return fetch('https://mesto.nomoreparties.co/v1/cohort-35/users/me', {
        method: 'PATCH',
        headers: {
          authorization: this._token,
          'Content-type': 'application/json'
        },
        body: JSON.stringify({
          name,
          about: job
        })
      }) .then(res => res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`))
    }
  }

export {Api}