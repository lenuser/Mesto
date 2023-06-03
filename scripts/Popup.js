
export default class Popup {
    constructor(popupSelector) {
      this._popupElement = document.querySelector(popupSelector);
    }
  
    open() {
      this._popupElement.classList.add('popup_opened');
      this._setEventListeners();
    }
  
    close() {
      this._popupElement.classList.remove('popup_opened');
      this._removeEventListeners();
    }
  
    _handleEscClose = (event) => {
      if (event.key === 'Escape') {
        this.close();
      }
    }
  
    _handleOverlayClose = (event) => {
      if (event.target === this._popupElement) {
        this.close();
      }
    }
  
    _handleCloseButtonClick = () => {
      this.close();
    }
  
    _setEventListeners() {
      this._popupElement.addEventListener('click', this._handleOverlayClose);
      document.addEventListener('keydown', this._handleEscClose);
      const closeButton = this._popupElement.querySelector('.popup__close-button');
      if (closeButton) {
        closeButton.addEventListener('click', this._handleCloseButtonClick);
      }
    }
  
    _removeEventListeners() {
      this._popupElement.removeEventListener('click', this._handleOverlayClose);
      document.removeEventListener('keydown', this._handleEscClose);
      const closeButton = this._popupElement.querySelector('.popup__close-button');
      if (closeButton) {
        closeButton.removeEventListener('click', this._handleCloseButtonClick);
      }
    }
  
    setEventListeners() {
      this._setEventListeners();
    }
  }



  