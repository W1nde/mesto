class Api {
    constructor({address, token}) {
        this._address = address;
        this._token = token;
    }

    _handleResponse = (response) => {
        response.ok
            ? response.json()
            : Promise.reject(`Ошибка ${response.status}`)
    }

    getUsers() {
        return fetch(`${this._address}/users`, {
            headers: {
                authorization: this._token
            }
        }).then(response => {
            if (response.ok) {
                return response.json()
            }
            return Promise.reject(`Ошибка ${response.status}`)
        })
    }

    addCards(data) {
        return fetch(`${this._address}/cards`, {
            method: 'POST',
            headers: {
                authorization: this._token,
                'Content-type': 'application/json'
            },
            body: JSON.stringify({
                user: data.user,
                message: data.message
            })
        }).then(this._handleResponse)
    }

    deleteCards(id) {
        return fetch(`${this._address}/cards/${id}`, {
            method: 'DELETE',
            headers: {
                authorization: this._token
            }
        })
            .then(this._handleResponse)
    }

}

export default Api;