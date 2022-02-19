class Card {
    constructor(data, cardSelector, handleCardClick, handleDeleteBtnClick, handleLikeBtnClick, userId) {
        this._name = data.name;
        this._link = data.link;
        this._cardSelector = cardSelector;
        this.handleCardClick = handleCardClick;
        this._handleDeleteBtnClick = handleDeleteBtnClick;
        this._likes = data.likes || [];
        this._id = data._id;
        this._deletable = !(data.owner._id == userId);
        this._handleLikeBtnClick = handleLikeBtnClick;
        this._owner = userId
    }
 
    getElement() {
        this._element = this._getTemplate()
        const cardPicture = this._element.querySelector('.element__image');
        this._likeCounter = this._element.querySelector('.element__like-counter')
        this._likeCounter.textContent = this._likes.length;
        this._element.querySelector('.element__title').textContent = this._name;
        cardPicture.src = this._link;
        cardPicture.alt = this._name;
        const delButton = this._element.querySelector('.element__trash');
        if (!this._deletable) {
            delButton.classList.add('element__trash_visible');
            delButton.addEventListener('click', this._handleDeleteBtnClick);
    }   
        this._likeButton = this._element.querySelector('.element__like-button');
        this._likeButton.addEventListener('click', this.handleLike);
        this._likes.forEach(user => {
            if(user._id == this._owner){
                this._likeButton.classList.add('element__like-button_active');
            }
        });
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

    handleLike = (event) => {
        const eventTarget = event.target;
        
        eventTarget.classList.toggle('element__like-button_active');
        if(eventTarget.classList.contains('element__like-button_active')){
            this._handleLikeBtnClick(this._id, 'PUT')
        }
        else{
            this._handleLikeBtnClick(this._id, 'DELETE')
        }
    }

    updateLikes = (likes) => {
        this._likeCounter.textContent = likes.length;
        this._likes = likes
    }
}

export {Card};