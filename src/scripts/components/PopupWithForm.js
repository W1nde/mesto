import { Popup } from './Popup.js'

class PopupWithForm extends Popup {
    constructor ({popupSelector, formSubmitHandler}) {
      super(popupSelector);
      this._formSubmitHandler = formSubmitHandler;
      this._form = this._popup.querySelector('.popup__form');
      this._submitButton = this._popup.querySelector('.popup__save');
    }
  
    _getInputValues() {
      this._formInputs = this._popup.querySelectorAll('.popup__input');
      this._formValues = {};
      
  
      this._formInputs.forEach((input) => {
        this._formValues[input.name] = input.value;
      
      })
      return this._formValues;
    }

    _submitHandler = (evt) => {
      evt.preventDefault();

      this._formSubmitHandler(this._getInputValues());
    }
  
    setEventListeners() {
      super.setEventListeners();
      this._form.addEventListener('submit', this._submitHandler);
    }
  
    close(){
      super.close();
      this._form.reset()
    }
    
    renderLoading(isLoading, defaultBtnText) {
      if (isLoading) {
        this._submitButton.textContent = 'Сохранение...';
      }
      else {
        this._submitButton.textContent = defaultBtnText;
      }
    }
}

export { PopupWithForm }