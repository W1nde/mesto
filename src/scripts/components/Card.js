import { popupPic, openPopup, closePopup } from "../utils/utils.js";
import { popupImage, popupPicTitle } from '../utils/constants.js'

class Card {
    constructor(cardObjects, cardSelector, handleCardClick) {
        this.close
        this._name = cardObjects.name;
        this._link = cardObjects.link;
        this._cardSelector = cardSelector;
        this.handleCardClick = handleCardClick
    }
 
    getElement() {
        this._element = this._getTemplate()
        const cardPicture = this._element.querySelector(".element__image");
        this._element.querySelector(".element__title").textContent = this._name;
        cardPicture.src = this._link;
        cardPicture.alt = this._name;
        const delButton = this._element.querySelector(".element__trash");
        
        const likeButton = this._element.querySelector(".element__like-button");
        likeButton.addEventListener("click", this.handleLike);
        cardPicture.addEventListener("click", this.handleCardClick);
        delButton.addEventListener("click", this.handleDelete);
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

    close() {
        //this._cardSelector.classList.remove("popup_opened"); 
        closePopup(popupPic)
        
        
  
        document.removeEventListener("keydown", this._handleEscClose);
    }    
    
    _handleEscClose(evt) {
        if (evt.key === "Escape") {
        this.close()
        }
    }
    
    handleDelete = () => {
        this._element.remove();
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
        document.addEventListener('keydown' ,this._handleEscClose)
        openPopup(popupPic);        
    }
}

export {Card};