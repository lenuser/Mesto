
export default class Card {
constructor(data, templateSelector, popupImgElement, handleCardClick) {
this._name = data.name;
this._link = data.link;
this._templateSelector = templateSelector;
this._popupImgElement = popupImgElement;
this._element = this._getTemplate();
this._cardTitle = this._element.querySelector(".element__title");
this._cardImage = this._element.querySelector(".element__image");
this._deleteButton = this._element.querySelector(".element__group-del_active");
this._likeButton = this._element.querySelector(".element__group-hard");
this._cardTitle.textContent = this._name;
this._cardImage.src = this._link;
this._cardImage.alt = this._name;
this._handleCardClick = handleCardClick;
};

_handleDelete() {
this._element.remove();
this._element = null;
};

_handleLike() {
this._likeButton.classList.toggle("element__group-hard_active");
};
//слушатели
_setEventListeners() {
this._deleteButton.addEventListener("click", () => {this._handleDelete();});
this._likeButton.addEventListener("click", () => {this._handleLike();});
this._cardImage.addEventListener("click", () => {this._handleCardClick(this._link, this._name, this._cardTitle.textContent)});
};

_getTemplate() {
const cardTemplate = document.querySelector(this._templateSelector).content.querySelector(".element").cloneNode(true);
return cardTemplate;
};

generateCard() {
this._setEventListeners();
return this._element;
};
}