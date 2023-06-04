import Card from "./Card.js";
import FormValidator from "./FormValidator.js";
import Section from "./Section.js";
import initialCards from "./constants.js";
import Popup from "./Popup.js";
import PopupWithImage from "./PopupWithImage.js";
import PopupWithForm from "./PopupWithForm.js";
import UserInfo from "./UserInfo.js";

const popupProfileOpenButton = document.querySelector(".profile__edit-button");
const popupCardOpenButton = document.querySelector(".profile__add-button");
const popupImgElement = document.querySelector(".popup_type_image");
const formPopupProfile = document.querySelector(".popup__form");
const formCards = document.querySelector("#popup-сards-form");

const popupProfile = new PopupWithForm({ submitCallback: profileFormSubmitHandler },".popup_type_profile");
const popupNewCard = new PopupWithForm({ submitCallback: сardFormSubmitHandler },".popup_type_cards");
const imagePopup = new PopupWithImage(".popup_type_image");

//Popup
const profilePopup = new Popup(".popup_type_profile");
const cardsPopup = new Popup(".popup_type_cards");

profilePopup.setEventListeners();
cardsPopup.setEventListeners();
imagePopup.setEventListeners();

//Section
function сardItem(item) {
  const card = new Card(
    item,
    "#template-cards",
    popupImgElement,
    handleCardClick
  );
  const cardElement = card.generateCard();
  section.addItem(cardElement);
}
const section = new Section(
  {
    items: initialCards,
    renderer: (item) => сardItem(item),
  },
  ".cards-grid"
);
section.renderItems();

//UserInfo
const userInfo = new UserInfo({
  profileTitleSelector: ".profile__title",
  profileSubtitleSelector: ".profile__subtitle",
});

//профиль
function profileFormSubmitHandler(inputValues) {
  userInfo.setUserInfo({
    profileTitleContent: inputValues["profile-name"],
    profileSubtitleContent: inputValues["profile-job"],
  });
  validatorProfile.resetValidation();
  popupProfile.close();
}

//карточка
function сardFormSubmitHandler(inputValues) {
  сardItem({
    link: inputValues["linkCardsInput"],
    name: inputValues["nameCardsInput"],
  });
  popupNewCard.close();
}

function editButtonHandler() {
  const nameInput = document.querySelector(".profile__title");
  const jobInput = document.querySelector(".profile__subtitle");
  const userProfile = userInfo.getUserInfo();
  nameInput.value = userProfile.profileTitleContent;
  jobInput.value = userProfile.profileSubtitleContent;
  popupProfile.open();
}

function openCardButtonHandler() {
  validatorCards.resetValidation();
  popupNewCard.open();
}
// Открытие и закрытие попапов
document.querySelector(".profile__edit-button").addEventListener("click", () => {profilePopup.open();});
document.querySelector(".profile__add-button").addEventListener("click", () => {cardsPopup.open();});

//PopupWithImage
function handleCardClick(link, name) {
  imagePopup.open({ link, name });
}
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

popupProfileOpenButton.addEventListener("click", editButtonHandler);
popupCardOpenButton.addEventListener("click", openCardButtonHandler);