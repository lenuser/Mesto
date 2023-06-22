export default class Card {
  constructor(
    data,
    templateSelector,
    handleCardClick,
    deletePopup,
    changeLike
  ) {
    this._name = data.name;
    this._link = data.link;
    this._myId = data.myId;
    this._ownerId = data.owner._id;
    this._likes = data.likes;
    this._likesLength = data.likes.length;
    this._changeLike = changeLike;
    this._cardId = data._id;
    this._templateSelector = templateSelector;
    this._handleCardClick = handleCardClick;
    this._deletePopup = deletePopup;
  }

  _handleDelete = () => {
    this._deletePopup.open({ card: this, cardId: this._cardId });
  };

  _handleLike() {
    this._changeLike(this._likeButton, this._cardId);
  }

  _setEventListeners() {
    this._deleteButton.addEventListener("click", () => {
      this._handleDelete();
    });
    this._likeButton.addEventListener("click", () => {
      this._handleLike();
    });
    this._cardImage.addEventListener("click", () => {
      this._handleCardClick(
        this._link,
        this._name,
        this._cardTitle.textContent
      );
    });
  }

  toggleLike(likes) {
    this._likeButton.classList.toggle("element__group-hard_active");
    this._counter.textContent = likes.length;
  }

  _getTemplate() {
    const cardTemplate = document
      .querySelector(this._templateSelector)
      .content.querySelector(".element")
      .cloneNode(true);

    this._element = cardTemplate;
    this._cardTitle = this._element.querySelector(".element__title");
    this._cardImage = this._element.querySelector(".element__image");
    //this._deleteButton = this._element.querySelector( ".element__group-del_active");
    this._deleteButton = this._element.querySelector( ".element__group-del");
    this._likeButton = this._element.querySelector(".element__group-hard");
    this._counter = this._element.querySelector(".element__counter");
    this._cardTitle.textContent = this._name;
    this._cardImage.src = this._link;
    this._cardImage.alt = this._name;

    return cardTemplate;
  }
  _checkLike() {
    this._likes.forEach((element) => {
      if (element._id === this._myId) {
        this._likeButton.classList.add("element__group-hard_active");
        return;
      }
    });
    this._counter.textContent = this._likesLength;
  }

  _changeDeleteButton() {
    this._myId === this._ownerId
      ? (this._deleteButton.style.display = "block")
      : (this._deleteButton.style.display = "none");
  }

  removeCard() {
    this._element.remove();
    this._element = null;
  }

  generateCard() {
    this._getTemplate();
    this._setEventListeners();
    this._changeDeleteButton();
    this._checkLike();
    return this._element;
  }
}
