import Popup from "../components/Popup.js";

export default class PopupWithConfirmation extends Popup {
  constructor(popupSelector, submitCallback) {
    super(popupSelector);
    this._submitCallback = submitCallback;
    this._form = this._popupElement.querySelector(".popup__form");
    this._submitButton = this._form.querySelector(".element__group-del_active");
    this.submitButtonDel = this._form.querySelector(".popup__button");
    this._submitForm = this._submitForm.bind(this);
  }

  open = ({ card, cardId }) => {
    super.open();
    this._element = card;
    this._cardId = cardId;
  };

  _submitForm(event) {
    event.preventDefault();
    this.submitButtonDel.textContent = `${this.submitButtonDel.textContent} ...`;
    this._submitCallback({ card: this._element, cardId: this._cardId });
  }

  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener("submit", this._submitForm.bind(this));
  }
}
