import initialCards from "./constants.js";
import Card from "./Card.js";
import FormValidator from "./FormValidator.js";
import { openPopup } from "./utils.js";

const popupProfile = document.querySelector(".popup_type_profile");
const popupProfileCloseButtonElement = document.querySelector(".popup__close-button");
const popupProfileOpenButtonElement = document.querySelector(".profile__edit-button");
const profileTitle = document.querySelector(".profile__title");
const profileSubtitle = document.querySelector(".profile__subtitle");
const formPopupProfile = document.querySelector(".popup__form");
const nameInput = formPopupProfile.querySelector("#profile-name");
const jobInput = formPopupProfile.querySelector("#profile-job");
const cardsGrid = document.querySelector(".cards-grid");
const popupCards = document.querySelector(".popup_type_cards");
const buttonAddCards = document.querySelector(".profile__add-button");
const formCards = document.querySelector("#popup-сards-form");
const cardsPopupCloseButton = document.querySelector(".popup__close-button_type_cards");
const imgPopupCloseButton = document.querySelector(".popup__close-button_type_img");
const popupImgElement = document.querySelector(".popup_type_image");
const cardsElement = document.querySelector(".popup_type_cards");
const nameInputCards = document.querySelector("#nameCardsInput");
const linkInputCards = document.querySelector("#linkCardsInput");
const imgPopupImage = popupImgElement.querySelector(".popup__img");
const imgPopupTitle = popupImgElement.querySelector(".popup__title_type_size");



function fillProfileInputs() {
  nameInput.value = profileTitle.textContent;
  jobInput.value = profileSubtitle.textContent;
}

function closePopup(popupName) {
  popupName.classList.remove("popup_opened");
  removeEscListener();
}

function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  closePopup(popupProfile);
  profileTitle.textContent = nameInput.value;
  profileSubtitle.textContent = jobInput.value;
}

const createCards = (cardsData) => {
  const card = new Card(cardsData, "#template-cards", popupImgElement);
  const cardElement = card.generateCard();
  return cardElement;
};

const validatorProfile = new FormValidator(
  {
    formSelector: ".popup__form",
    inputSelector: ".popup__text",
    submitButtonSelector: ".popup__button",
    inactiveButtonClass: "popup__button-disabled",
    inputErrorClass: "popup__text_invalid",
    errorClass: "error-message",
  },
  formPopupProfile
);
validatorProfile.enableValidation();

const validatorCards = new FormValidator(
  {
    formSelector: "#popup-сards-form",
    inputSelector: ".popup__text",
    submitButtonSelector: ".popup__button",
    inactiveButtonClass: "popup__button-disabled",
    inputErrorClass: "popup__text_invalid",
    errorClass: "error-message",
  },
  formCards
);
validatorCards.enableValidation();

const renderCardElement = (cardsElement) => {
  cardsGrid.prepend(cardsElement);
};

initialCards.forEach((cards) => {
  const card = new Card(cards, "#template-cards", popupImgElement);
  const cardElement = card.generateCard();
  renderCardElement(cardElement);
});

const handleAddCardsSubmit = (event) => {
  event.preventDefault();
  const name = nameInputCards.value;
  const link = linkInputCards.value;
  const dataCards = {
    name,
    link,
  };
  event.target.reset();
  renderCardElement(createCards(dataCards));
  closePopup(popupCards);
};

formPopupProfile.addEventListener("submit", handleProfileFormSubmit);
formCards.addEventListener("submit", handleAddCardsSubmit);

cardsPopupCloseButton.addEventListener("click", () => {
  closePopup(cardsElement);
});
imgPopupCloseButton.addEventListener("click", () => {
  closePopup(popupImgElement);
});
buttonAddCards.addEventListener("click", () => {
  openPopup(popupCards);
});

popupProfileOpenButtonElement.addEventListener("click", () => {
  fillProfileInputs();
  openPopup(popupProfile);
});
popupProfileCloseButtonElement.addEventListener("click", () => {
  closePopup(popupProfile);
});

//пр6
const closePopupByOverlay = (event) => {
  if (event.target === event.currentTarget) {
    closePopup(event.currentTarget);
  }
};
popupProfile.addEventListener("click", closePopupByOverlay);
popupCards.addEventListener("click", closePopupByOverlay);
popupImgElement.addEventListener("click", closePopupByOverlay);

//Esc
function handleEscClose(evt) {
  if (evt.key === "Escape") {
    closePopup(document.querySelector(".popup_opened"));
  }
}

function removeEscListener() {
  document.body.removeEventListener("keydown", handleEscClose);
}

function addEscListener() {
  document.body.addEventListener("keydown", handleEscClose);
}

popupProfileOpenButtonElement.addEventListener("click", () => {
  fillProfileInputs();
  openPopup(popupProfile);
});

popupCards.addEventListener("click", (event) => {
  if (event.target.classList.contains("popup__close-button")) {
    closePopup(popupCards);
  }
});

popupImgElement.addEventListener("click", (event) => {
  if (event.target.classList.contains("popup__close-button")) {
    closePopup(popupImgElement);
  }
});

