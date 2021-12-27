class Card {

    getElement() {
        const cardTemplate = document.querySelector("#cardTemplate").content;
        const cardElement = cardTemplate.querySelector(".element").cloneNode(true);
        const cardPicture = cardElement.querySelector(".element__image");
        cardElement.querySelector(".element__title").textContent = this.name;
        cardPicture.src = this.link;
        cardPicture.alt = this.name;
        const delButton = cardElement.querySelector(".element__trash");
        delButton.addEventListener("click", this.handleDelete);
        const likeButton = cardElement.querySelector(".element__like-button");
        likeButton.addEventListener("click", this.handleLike);
        cardPicture.addEventListener("click", this.handleImgClick);
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
      
    constructor(name, link) {
        this.name = name;
        this.link = link;

        elements.prepend(this.getElement());
    }
}

const elements = document.querySelector(".elements");
const popupImage = document.querySelector(".popup__pic");
const popupPicTitle = document.querySelector(".popup__pic-title");

new Card('Архыз', 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg');

new Card('Челябинская область', 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg');

new Card('Иваново', 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg');

new Card('Камчатка', 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg');

new Card('Холмогорский район', 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg');

new Card('Байкал', 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg');

export {Card};
import {openPopup, popupPic} from "./index.js";