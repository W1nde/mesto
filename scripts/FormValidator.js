class EnableValidation { 

	showError (form, input, errorMessageText, errorMessageClass, inputErrorClass) {
		const errorMessage = form.querySelector(`#${input.id}-error`);
		errorMessage.textContent = errorMessageText;
		errorMessage.classList.add(errorMessageClass);
		input.classList.add(inputErrorClass);
	}

	hideError (form, input, errorMessageClass, inputErrorClass) {
		const errorMessage = form.querySelector(`#${input.id}-error`);
		errorMessage.textContent = '';
		errorMessage.classList.remove(errorMessageClass);
		input.classList.remove(inputErrorClass);
	}

	hasInvalidInput (inputs) {
		return Array.from(inputs).some((el) => !el.validity.valid);
	}

	toggleButtonError (inputs, button, inactiveButtonClass) {
		if (this.hasInvalidInput(inputs)) {
			button.classList.add(inactiveButtonClass);
			button.disabled = true;
		} else {
			button.classList.remove(inactiveButtonClass);
			button.disabled = false;
		}
	}

	checkInputValid (form, input, { inputErrorClass, errorClass }) {
		if (!input.validity.valid) {
			this.showError(form, input, input.validationMessage, errorClass, inputErrorClass);
		} else {
			this.hideError(form, input, errorClass, inputErrorClass);
		}
	}

	setInputListeners (form, { inputSelector, submitButtonSelector, inactiveButtonClass, ...rest }) {
		const inputs = form.querySelectorAll(inputSelector);
		const submitButton = form.querySelector(submitButtonSelector);

		inputs.forEach((input) => {
			input.addEventListener('input', () => {
				this.checkInputValid(form, input, rest);
				this.toggleButtonError(inputs, submitButton, inactiveButtonClass);
			});
		});
	}

	enableValidation ({ formSelector, ...rest }) {
		const forms = document.querySelectorAll(formSelector);

		forms.forEach((form) => {
			form.addEventListener('submit', (event) => {
				event.preventDefault();
			});

			this.setInputListeners(form, rest);
		});
	}

	constructor() {

		this.enableValidation({
    		formSelector: '.popup__form',
    		inputSelector: '.popup__input',
    		submitButtonSelector: '.popup__save',
    		inactiveButtonClass: 'popup__save_disabled',
    		inputErrorClass: 'popup__input_type_error',
    		errorClass: 'error',
		});
	}
}
new EnableValidation()