import { Popup } from './Popup.js'

class PopupWithForm extends Popup {
    constructor ({popupSelector, formSubmitHandler}) {
      super(popupSelector);
      this._formSubmitHandler = formSubmitHandler;
      this._form = this._popup.querySelector('.popup__form');
      console.log(formSubmitHandler)
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
      this._form.reset();
    }
  
    setEventListeners() {
      super.setEventListeners();
      this._form.addEventListener('submit', this._submitHandler);
    }
  
    close() {
      super.close(); 
    }
}

export { PopupWithForm }