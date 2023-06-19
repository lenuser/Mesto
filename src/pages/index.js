import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import Section from "../components/Section.js";
import { initialCards } from "../utils/constants.js";
import Popup from "../components/Popup.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import UserInfo from "../components/UserInfo.js";
import { formConfig } from "../utils/constants.js";
import PopupWithConfirmation from "../components/PopupWithConfirmation.js";
import Api from "../components/api.js";

import "./index.css";


const popupProfileOpenButton = document.querySelector(".profile__edit-button");
const popupCardOpenButton = document.querySelector(".profile__add-button");
const formPopupProfile = document.querySelector(".popup__form");
const formCards = document.querySelector("#popup-сards-form");
const сardDel = document.querySelector("#card-delete");
const avatarElement = document.querySelector(".profile__avatar");
const popupAvatarForm = document.querySelector("#profileAvatar");

const defaultDeleteTextYes = "Да";
const defaultDeleteTextSave = "Сохранить";
const defaultDeleteTextCreate = "Создать";

const api = new Api({
  baseUrl: "https://mesto.nomoreparties.co/v1/cohort-68",
  headers: {
    authorization: "f4814bdc-9a4c-47b7-ba7d-ea93d4ec3b19",
    "Content-Type": "application/json",
  },
});
// удаление
const deletePopup = new PopupWithConfirmation(
  ".popup_type_delete",".card-delete", 
  ({ card, cardId }) => {
    api
      .deleteCard(cardId)
      .then(() => {
        card.removeCard();
        deletePopup.close();
      })
      .catch((error) => console.error(`Ошибка при удалении карточки ${error}`))
      .finally(
        () => (deletePopup.submitButtonDel.textContent = defaultDeleteTextYes)
      );
  }
);

const handleDeleteButton = (event) => {
  const card = event.target.closest(".element");
  deletePopup.open(card);
};

const imagePopup = new PopupWithImage(".popup_type_image");
const popupProfile = new PopupWithForm(
  { submitCallback: profileFormSubmitHandler },
  ".popup_type_profile",
  ".edit_profile_form"
);
const popupNewCard = new PopupWithForm(
  { submitCallback: сardFormSubmitHandler },
  ".popup_type_cards",
  ".popup-сards-form"
);
const popupEditAvatar = new PopupWithForm(
  { submitCallback: avatarFormSubmitHandler },
  ".popup_type_avatar",
  ".profileAvatar"
);

const validatorProfile = new FormValidator(formConfig, formPopupProfile);
validatorProfile.enableValidation();
const validatorCards = new FormValidator(formConfig, formCards);
validatorCards.enableValidation();
const validatorAvatar = new FormValidator(formConfig, popupAvatarForm);
validatorAvatar.enableValidation();
const validatorCardsDel = new FormValidator(formConfig, сardDel);
validatorCardsDel.enableValidation();

popupProfile.setEventListeners();
popupNewCard.setEventListeners();
imagePopup.setEventListeners();
deletePopup.setEventListeners();
popupEditAvatar.setEventListeners();

// постановка и удаление лайка
function сardItem(element) {
  const card = new Card(
    element,
    "#template-cards",
    handleCardClick,
    deletePopup,
    (likeButton, cardId) => {
      if (likeButton.classList.contains("element__group-hard_active")) {
        api
          .deleteLike(cardId)
          .then((res) => {
            card.toggleLike(res.likes);
          })
          .catch((error) =>
            console.error(`Ошибка при удалении лайка ${error}`)
          );
      } else {
        api
          .addLike(cardId)
          .then((res) => {
            card.toggleLike(res.likes);
          })
          .catch((error) =>
            console.error(`Ошибка при добавлении лайка ${error}`)
          );
      }
    }
  );
  return card.generateCard();
}

const section = new Section((element) => {
  section.addItem(сardItem(element));
}, ".cards-grid");

const userInfo = new UserInfo({
  profileTitleSelector: ".profile__title",
  profileSubtitleSelector: ".profile__subtitle",
  profileAvatarSelector: ".profile__avatar",
});

//профиль редактирование good
function profileFormSubmitHandler(inputValues) {
  api
    .setUserInfo({
      name: inputValues["profile-name"],
      about: inputValues["profile-job"],
    })
    .then((data) => {
      userInfo.setUserInfo({
        title: data.name,
        subtitle: data.about,
        avatar: data.avatar,
      });
      popupProfile.close();
    })
    .catch((error) => console.error(`Ошибка в редактировании профиля ${error}`))
    .finally(() => {
      popupProfile.submitButtonPopupWithForm.textContent =
        defaultDeleteTextSave;
    });
}

//https://i.pinimg.com/originals/93/81/e8/9381e83bcae60ad312f6f770ee649fc4.jpg

// аватар сабмит изменение аватара
function avatarFormSubmitHandler(inputValues) {
  api
    .setAvatarNew({ avatar: inputValues["avatar"] })
    .then((data) => {
      userInfo.setUserInfo({
        title: data.name,
        subtitle: data.about,
        avatar: data.avatar,
      });
      popupEditAvatar.close();
    })
    .catch((error) => console.error(`Ошибка в изменении аватара ${error}`))
    .finally(() => {
      popupEditAvatar.submitButtonPopupWithForm.textContent =
        defaultDeleteTextSave;
    });
}
//добавление новой карточки 
function сardFormSubmitHandler(inputValues) {
  Promise.all([
    api.getInfo(),
    api.addCard({
      name: inputValues["nameCardsInput"],
      link: inputValues["linkCardsInput"],
    }),
  ])
    .then(([dataUser, dataCard]) => {
      dataCard.myId = dataUser._id;
      section.addItem(сardItem(dataCard));
      popupNewCard.close();
    })
    .catch((error) =>
      console.error(`Ошибка при создании новой карточки ${error}`)
    )
    .finally(() => {
      popupNewCard.submitButtonPopupWithForm.textContent =
        defaultDeleteTextCreate;
    });
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
document
  .querySelector(".profile__edit-button")
  .addEventListener("click", () => {
    popupProfile.open();
    validatorProfile.resetValidation();
  });
document.querySelector(".profile__add-button").addEventListener("click", () => {
  popupNewCard.open();
  validatorProfile.resetValidation();
});
document
  .querySelector(".profile__avatar-button")
  .addEventListener("click", () => {
    popupEditAvatar.open();
    validatorAvatar.resetValidation();
  });

function handleCardClick(link, name) {
  imagePopup.open({ link, name });
}

popupProfileOpenButton.addEventListener("click", editButtonHandler);
popupCardOpenButton.addEventListener("click", openCardButtonHandler);
document.querySelectorAll(".element__group-del_active").forEach((button) => {
  button.addEventListener("click", handleDeleteButton);
});

//new
Promise.all([api.getInfo(), api.getCards()])
  .then(([dataUser, dataCard]) => {
    dataCard.forEach((element) => (element.myId = dataUser._id));
    userInfo.setUserInfo({
      title: dataUser.name,
      subtitle: dataUser.about,
      avatar: dataUser.avatar,
    });
    section.renderItems(dataCard.reverse());
  })
  .catch((error) =>
   console.error(
     `Ошибка при создании первоначальных данных на странице ${error}`
   )
 );
