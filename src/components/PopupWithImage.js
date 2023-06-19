import Popup from "../components/Popup.js";

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._imageElement = this._popupElement.querySelector(".popup__img");
    this._titleElement = this._popupElement.querySelector(".popup__title");
  }

  open({ link, name }) {
    super.open();
    this._imageElement.src = link;
    this._imageElement.alt = name;
    this._titleElement.textContent = name;
  }
}
