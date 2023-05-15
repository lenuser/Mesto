import { openPopup } from "./utils.js";
import { imgPopupImage, imgPopupTitle } from "./constants.js";

export default class Card {
  constructor(data, templateSelector,popupImgElement) {
    this._name = data.name;
    this._link = data.link;
    this._templateSelector = templateSelector;
    this._popupImgElement = popupImgElement;
  };
  
  _handleDelete() {
    this._element.remove();
    this._element = null;
  };

  _handleLike() {
    this._likeButton.classList.toggle("element__group-hard_active");
  };

_handleCardClick() {
  imgPopupImage.src = this._link;
  imgPopupImage.alt = this._name;
  imgPopupTitle.textContent = this._name;
  openPopup(this._popupImgElement);
}

  _setEventListeners() {
    this._deleteButton.addEventListener("click", () => {
      this._handleDelete();
    });
    this._likeButton.addEventListener("click", () => {
      this._handleLike();
    });
    this._cardImage.addEventListener("click", () => {
      this._handleCardClick();
    });
  };

  _getTemplate() {
    const cardTemplate = document.querySelector(this._templateSelector).content.querySelector(".element").cloneNode(true);
    return cardTemplate;
  };

  generateCard() {
    this._element = this._getTemplate();
    this._cardTitle = this._element.querySelector(".element__title");
    this._cardImage = this._element.querySelector(".element__image");
    this._deleteButton = this._element.querySelector(".element__group-del_active");
    this._likeButton = this._element.querySelector(".element__group-hard");
    this._cardTitle.textContent = this._name;
    this._cardImage.src = this._link;
    this._cardImage.alt = this._name;
    this._setEventListeners();
    return this._element;
  };
}
