class Card {

    constructor(CardObjects, cardSelector, openPopupHandler) {
        this._name = CardObjects.name;
        this._link = CardObjects.link;
        this._cardSelector = cardSelector;
        this._openPopupHandler = openPopupHandler;
    }

    getElement() {
        const cardTemplate = document.querySelector("#cardTemplate").content;
        const cardElement = this._getTemplate()
        const cardPicture = cardElement.querySelector(".element__image");
        cardElement.querySelector(".element__title").textContent = this._name;
        cardPicture.src = this._link;
        cardPicture.alt = this._name;
        const delButton = cardElement.querySelector(".element__trash");
        delButton.addEventListener("click", this.handleDelete);
        const likeButton = cardElement.querySelector(".element__like-button");
        likeButton.addEventListener("click", this.handleLike);
        cardPicture.addEventListener("click", this.handleImgClick);
        return cardElement;
    } 
    
    _getTemplate() {
        const cardElement = document
          .querySelector(this._cardSelector)
          .content
          .querySelector('.element')
          .cloneNode(true);
    
        return cardElement;
    } 

    handleDelete(event) {
        const eventTarget = event.target;
        const element = eventTarget.closest(".element");
        element.remove();
    }      

    handleLike(event) {
        const eventTarget = event.target;
        eventTarget.classList.toggle("element__like-button_active");
    }

    handleImgClick(event) {
        const eventTarget = event.target;
        const element = eventTarget.closest(".element");
        popupPicTitle.textContent = element.textContent;
        popupImage.src = element.querySelector(".element__image").src;
        popupImage.alt = element.textContent;
        openPopup(popupPic);        
    }
}

const elements = document.querySelector(".elements");
const popupImage = document.querySelector(".popup__pic");
const popupPicTitle = document.querySelector(".popup__pic-title");
export {Card};
import {popupPic, openPopup} from "./utils.js";