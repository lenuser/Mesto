export default class FormValidator {
  constructor(config, formElement) {
    this._formSelector = config.formSelector;
    this._inputSelector = config.inputSelector;
    this._submitButtonSelector = config.submitButtonSelector;
    this._inactiveButtonClass = config.inactiveButtonClass;
    this._inputErrorClass = config.inputErrorClass;
    this._formElement = formElement;
    this._buttonElement = this._formElement.querySelector(
      this._submitButtonSelector
    );
  }
  

  _showInputError(inputElement, errorMessage) {
    const errorElement = this._formElement.querySelector(`#error-${inputElement.id}`);
    console.log(errorElement);
    if (!errorElement) return;
    inputElement.classList.add(this._inputErrorClass);
    errorElement.textContent = errorMessage;
    }
    
  _hideInputError(inputElement) {
    const errorElement = this._formElement.querySelector(`#error-${inputElement.id}`);
   inputElement.classList.remove(this._inputErrorClass);
   errorElement.textContent = " ";
  
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
   
    if (this._formElement.checkValidity()) {
      this._buttonElement.classList.remove(this._inactiveButtonClass);
      this._buttonElement.disabled = false;
    } else {
      this._buttonElement.classList.add(this._inactiveButtonClass);
      this._buttonElement.disabled = true;
    }
  }

  _disableSubmitBtn() {
    this._buttonElement.classList.add(this._inactiveButtonClass);
    this._buttonElement.disabled = true;
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
  resetValidation() {
    this._disableSubmitBtn();
  }
}



