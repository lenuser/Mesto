export default class FormValidator {
  constructor(config, formElement) {
    this._formSelector = config.formSelector;
    this._inputSelector = config.inputSelector;
    this._submitButtonSelector = config.submitButtonSelector;
    this._inactiveButtonClass = config.inactiveButtonClass;
    this._inputErrorClass = config.inputErrorClass;
    this._errorClass = config.errorClass;
    this._formElement = formElement;
  }
//не загружаются ошибки 
  _showInputError(inputElement, errorMessage) {
    const errorElement = this._formElement.querySelector(`#error-${inputElement.id}`);
    console.log(errorElement);
    if (!errorElement) return;
    inputElement.classList.add(this._inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(this._errorClass);
    }
    
  _hideInputError(inputElement) {
    const errorElement = this._formElement.querySelector(`#error-${inputElement.id}`);
   inputElement.classList.remove(this._inputErrorClass);
   errorElement.textContent = " ";
    errorElement.classList.remove(this._errorClass);
  }
  
  _checkInputValidity(inputElement) {
    if (!inputElement.validity.valid) {
    this._showInputError(inputElement, inputElement.validationMessage);
    } else {
    this._hideInputError(inputElement);
    }
    this._toggleButtonState();
    }

  _toggleButtonState() {
    const buttonElement = this._formElement.querySelector(
      this._submitButtonSelector
    );
    if (this._formElement.checkValidity()) {
      buttonElement.classList.remove(this._inactiveButtonClass);
      buttonElement.disabled = false;
    } else {
      buttonElement.classList.add(this._inactiveButtonClass);
      buttonElement.disabled = true;
    }
  }

  _setEventListeners() {
    const inputList = this._formElement.querySelectorAll(this._inputSelector);
    inputList.forEach((inputElement) => {
      inputElement.addEventListener("input", () => {
        this._checkInputValidity(inputElement);
        this._toggleButtonState(inputList);
      });
    });
    this._formElement.addEventListener("submit", (evt) => {
      evt.preventDefault();
    });
    this._toggleButtonState(inputList);
  }

  enableValidation() {
    this._formElement.addEventListener("submit", (evt) => {
      evt.preventDefault();
    });
    this._setEventListeners();
  }
}


