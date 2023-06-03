import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor({ submitCallback }, popupSelector) {
    super(popupSelector);
    this._submitCallback = submitCallback;
    this._form = this._popupElement.querySelector('.popup__form');
    this.setEventListeners();
  }


  _getInputValues() {
    const formData = Array.from(this._form.elements).reduce((values, element) => {
      if (element.name) {
        values[element.name] = element.value;
      }
      return values;
    }, {});

    return formData;
  }

  _submitForm(event) {
    event.preventDefault();
    const inputValues = this._getInputValues();
    this._submitCallback(inputValues);
    this.close();
  }

  close() {
    super.close();
    this._form.reset();
  }

  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener('submit', (event) => {
      event.preventDefault();
      this._submitForm(event);
    });
  }
}