export default class Popup {
  constructor(popupSelector) {
    this._popupElement = document.querySelector(popupSelector);
    this._closeButton = this._popupElement.querySelector(".popup__close-button");
    this._handleEscClose = this._handleEscClose.bind(this);
    this._handleOverlayClose = this._handleOverlayClose.bind(this);
    this._handleCloseButtonClick = this._handleCloseButtonClick.bind(this);
  }

  open() {
    this._popupElement.classList.add("popup_opened");
    document.addEventListener("keydown", this._handleEscClose);
  }

  close() {
    this._popupElement.classList.remove("popup_opened");
    document.removeEventListener("keydown", this._handleEscClose);
  }

  _handleEscClose = (event) => {
    if (event.key === "Escape") {
      this.close();
    }
  };

  _handleOverlayClose = (event) => {
    if (event.target === this._popupElement) {
      this.close();
    }
  };

  _handleCloseButtonClick = () => {
    this.close();
  };

  setEventListeners() {
    this._popupElement.addEventListener("click", this._handleOverlayClose);
    if (this._closeButton) {
    this._closeButton.addEventListener("click", this._handleCloseButtonClick);
    }
    }

}