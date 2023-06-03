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
  export default initialCards;


  export const formConfigProfile = {
      formSelector: ".popup__form",
      inputSelector: ".popup__text",
      submitButtonSelector: ".popup__button",
      inactiveButtonClass: "popup__button-disabled",
      inputErrorClass: "popup__text_invalid",
      errorClass: "error-message",
    };

  export const formConfigCard = {
    formSelector: "#popup-сards-form",
    inputSelector: ".popup__text",
    submitButtonSelector: ".popup__button",
    inactiveButtonClass: "popup__button-disabled",
    inputErrorClass: "popup__text_invalid",
    errorClass: "error-message",
  };