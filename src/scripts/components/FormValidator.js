class FormValidator { 

	constructor(form) {

		this._form = form;
		this._inputList = this._form.querySelectorAll('.popup__input');
		this._submitButton = this._form.querySelector('.popup__save')
	}

	showError (input, errorMessageText, errorMessageClass, inputErrorClass) {
		const errorMessage = this._form.querySelector(`#${input.id}-error`);
		errorMessage.textContent = errorMessageText;
		errorMessage.classList.add(errorMessageClass);
		input.classList.add(inputErrorClass);
	}

	hideError (input, errorMessageClass, inputErrorClass) {
		const errorMessage = this._form.querySelector(`#${input.id}-error`);
		errorMessage.textContent = '';
		errorMessage.classList.remove(errorMessageClass);
		input.classList.remove(inputErrorClass);
	}

	hasInvalidInput () {
		return Array.from(this._inputList).some((el) => !el.validity.valid);
	}

	toggleButtonError (inactiveButtonClass) {
		if (this.hasInvalidInput()) {
			this._submitButton.classList.add(inactiveButtonClass);
			this._submitButton.disabled = true;
		} else {
			this._submitButton.classList.remove(inactiveButtonClass);
			this._submitButton.disabled = false;
		}
	}

	checkInputValid (input, {inputErrorClass, errorClass}) {
		if (!input.validity.valid) {
			this.showError(input, input.validationMessage, errorClass, inputErrorClass);
		} else {
			this.hideError(input, errorClass, inputErrorClass);
		}
	}

	setInputListeners ({inputSelector, submitButtonSelector, inactiveButtonClass, ...rest}) {

		this._inputList.forEach((input) => {
			input.addEventListener('input', () => {
				this.checkInputValid(input, rest);
				this.toggleButtonError(inactiveButtonClass);
			});
		});
	}

	enableValidation ({ formSelector, ...rest }) {
			this._form.addEventListener('submit', (event) => {
				event.preventDefault();
			});

			this.setInputListeners(rest);

	}

	setDefaultForm(clearInput = true) {
		this._inputList.forEach((input) => {
			this.hideError(input);
			if (clearInput) {
				input.value = "";
			}
		});
		this.toggleButtonError();
	}
}

export {FormValidator};