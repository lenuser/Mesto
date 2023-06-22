import Popup from "../components/Popup.js";

export default class PopupWithForm extends Popup {
  constructor({ submitCallback }, popupSelector) {
    super(popupSelector);
    this._submitCallback = submitCallback;
    this._form = this._popupElement.querySelector(".popup__form");
    this._submitForm = this._submitForm.bind(this);
    this._inputList = this._form.querySelectorAll(".popup__text");
    this._submitButton = this.submitButton;
    this.submitButtonPopupWithForm = this._form.querySelector ('.popup__button');
  }

  _getInputValues() {
    this._values = {};
    this._inputList.forEach(input => {
      this._values[input.name] = input.value;
    })
    return this._values
  }

  setInputValues(dataUser){
    this._inputList.forEach(input => {
      input.value = dataUser[input.name];
    });
    
  }
   
  _submitForm(event) {
    event.preventDefault();
    const inputValues = this._getInputValues(); 
    this.submitButtonPopupWithForm.textContent = `${this.submitButtonPopupWithForm.textContent} ...`;
    this._submitCallback(inputValues);
  }

  close() {
    super.close();
    this._form.reset();
  }

  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener("submit", this._submitForm);
  }
}