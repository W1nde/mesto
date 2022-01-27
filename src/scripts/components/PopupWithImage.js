import {Popup} from './Popup.js'

class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._image = document.querySelector('.popup__pic');
    this._name = document.querySelector('.popup__pic-title');
  }

  open = (name, link) => {
    this._image.src = link;
    this._name.textContent = name;
    this._image.alt = name;

    super.open();
  }
}

export {PopupWithImage}