import { Popup } from './Popup.js'

class popupWithConfirmation extends Popup {
    constructor({popupSelector, formSubmitHandler}) {
        super(popupSelector);
        this._formSubmitHandler = formSubmitHandler;
        this._form = this._popup.querySelector('.popup__form');
    }

    deleteCard() {
        this._element.remove();
    }
}

export { popupWithConfirmation }