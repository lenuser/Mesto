const popupProfile = document.querySelector(".popup_type_profile");
const popupProfileCloseButtonElement = document.querySelector(
  ".popup__close-button"
);
const popupProfileOpenButtonElement = document.querySelector(
  ".profile__edit-button"
);
const profileTitle = document.querySelector(".profile__title");
const profileSubtitle = document.querySelector(".profile__subtitle");
const formPopupProfile = document.querySelector(".popup__form");
const nameInput = formPopupProfile.querySelector("#profile-name");
const jobInput = formPopupProfile.querySelector("#profile-job");
const templateСards = document.getElementById("template-cards");
const cardsGrid = document.querySelector(".cards-grid");
const popupCards = document.querySelector(".popup_type_cards");
const buttonAddCards = document.querySelector(".profile__add-button");
const popupImgOpen = document.querySelector(".popup_type_image");
const popupTitle = document.querySelector(".popup__title_type_size");
const imgElement = document.querySelector(".popup__img");
const formCards = document.querySelector("#popup-сards-form");
const cardsPopupCloseButton = document.querySelector(
  ".popup__close-button_type_cards"
);
const imgPopupCloseButton = document.querySelector(
  ".popup__close-button_type_img"
);
const popupImgElement = document.querySelector(".popup_type_image");
const cardsElement = document.querySelector(".popup_type_cards");

function openPopup(popupName) {
  popupName.classList.add("popup_opened");
  addEscListener();
}

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

const initialCards = [
  {
    name: "Хакасия",
    link: "./images/hhakasia.jpeg",
  },
  {
    name: "Алтай",
    link: "./images/aaltai .jpeg",
  },
  {
    name: "Река Енисей",
    link: "./images/eenisei.jpeg",
  },
  {
    name: "Хакасия",
    link: "./images/hakas.jpeg",
  },
  {
    name: "Алтай",
    link: "./images/altai.jpeg",
  },
  {
    name: "Река Енисей",
    link: "./images/enisei.jpeg",
  },
];

const createCards = (cardsData) => {
  const cardsElement = templateСards.content
    .querySelector(".element")
    .cloneNode(true);
  const cardsTitle = cardsElement.querySelector(".element__title");
  const cardsImg = cardsElement.querySelector(".element__image");
  cardsTitle.textContent = cardsData.name;
  cardsImg.src = cardsData.link;
  cardsImg.alt = cardsData.link;
  const deleteButton = cardsElement.querySelector(".element__group-del_active");
  const likeButton = cardsElement.querySelector(".element__group-hard");
  cardsImg.addEventListener("click", (event) => openImgPopup(event));
  const handleDelete = (event) => {
    cardsElement.remove();
  };

  const handleLike = () => {
    likeButton.classList.toggle("element__group-hard_active");
  };

  const openImgPopup = (event) => {
    openPopup(popupImgOpen);
    imgElement.src = cardsData.link;
    imgElement.alt = cardsData.link;
    popupTitle.textContent = cardsData.name;
  };
  deleteButton.addEventListener("click", handleDelete);
  likeButton.addEventListener("click", handleLike);
  return cardsElement;
};

const renderCardElement = (cardsElement) => {
  cardsGrid.prepend(cardsElement);
};
initialCards.forEach((cards) => {
  renderCardElement(createCards(cards));
});

const nameInputCards = document.querySelector("#nameCardsInput");
const linkInputCards = document.querySelector("#linkCardsInput");
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
  };
};
popupProfile.addEventListener("click", closePopupByOverlay);
popupCards.addEventListener("click", closePopupByOverlay);
popupImgElement.addEventListener("click", closePopupByOverlay);

//Esc
function handleEscClose(evt) {
  if (evt.key === "Escape") {
    closePopup(document.querySelector('.popup_opened'));
  };
};
function removeEscListener() {
  document.body.removeEventListener("keydown", handleEscClose);
};

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
