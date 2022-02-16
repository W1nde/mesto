import { Popup } from './Popup.js'

class PopupWithConfirmation extends Popup {
    constructor(popupSelector) {
        super(popupSelector);
        this._form = this._popup.querySelector('.popup__form_type_delete-form');
    }
    setSubmitAction(actionFunction) {
        this._handleSubmitCallback = actionFunction;
    }

    setEventListeners = () => {
        super.setEventListeners();
        this._form.addEventListener('submit', (evt) => {
            evt.preventDefault();
            this._handleSubmitCallback();
            this.close();
        })
    }
}

export { PopupWithConfirmation }