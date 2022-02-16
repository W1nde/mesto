class Card {
    constructor(data, cardSelector, handleCardClick, handleDeleteBtnClick, userId) {
        this._name = data.name;
        this._link = data.link;
        this._cardSelector = cardSelector;
        this.handleCardClick = handleCardClick;
        this._handleDeleteBtnClick = handleDeleteBtnClick;
        this._likes = data.likes || [];
        this._id = data._id;
        this._deletable = !(data.owner._id == userId);
    }
 
    getElement() {
        this._element = this._getTemplate()
        const cardPicture = this._element.querySelector('.element__image');
        this._element.querySelector('.element__title').textContent = this._name;
        cardPicture.src = this._link;
        cardPicture.alt = this._name;
        const delButton = this._element.querySelector('.element__trash');
        if (!this._deletable) {
            delButton.style.display = 'block';
            delButton.addEventListener('click', this._handleDeleteBtnClick);
    }
        const likeButton = this._element.querySelector('.element__like-button');
        likeButton.addEventListener('click', this.handleLike);
        cardPicture.addEventListener('click', this.handleCardClick);

        return this._element;
    } 
    
    
    _getTemplate() {
        const cardElement = document
          .querySelector(this._cardSelector)
          .content
          .querySelector('.element')
          .cloneNode(true);
    
        return cardElement;
    } 
    

    deleteCard = () => {
        this._element.remove();
    }

    getId() {
        return this._id
    }

    handleLike(event) {
        const eventTarget = event.target;
        eventTarget.classList.toggle('element__like-button_active');
    }
}

export {Card};