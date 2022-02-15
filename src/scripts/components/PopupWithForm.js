import { Popup } from './Popup.js'

class PopupWithForm extends Popup {
    constructor ({popupSelector, formSubmitHandler}) {
      super(popupSelector);
      this._formSubmitHandler = formSubmitHandler;
      this._form = this._popup.querySelector('.popup__form');
    }
  
    _getInputValues() {
      this._formInputs = this._popup.querySelectorAll('.popup__input');
      this._formValues = {};
      
  
      this._formInputs.forEach((input) => {
        this._formValues[input.name] = input.value;
      
      })
      return this._formValues;
    }
  
    setInputValues(new_info) {
      const name = document.querySelector('.popup__input_type_name');
      const job = document.querySelector('.popup__input_type_job');
      const avatar = document.querySelector('.popup__input_type_avatar-url');
      name.value = new_info.name;
      job.value = new_info.about;
      avatar.value = new_info.avatar;

    }

    _submitHandler = (evt) => {
      evt.preventDefault();
      this._formSubmitHandler(this._getInputValues());
    }
  
    setEventListeners() {
      super.setEventListeners();
      this._form.addEventListener('submit', this._submitHandler);
    }
  
    close() {
      super.close(); 
    }
    
    open() {
      super.open();
      this._form.reset()
    }
}

export { PopupWithForm }