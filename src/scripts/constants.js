 const initialCards = [
    {
      name: "Хакасия",
      link: "https://github.com/lenuser/Mesto/blob/main/images/hhakasia.jpeg?raw=true",
    },
    {
      name: "Алтай",
      link: "https://github.com/lenuser/Mesto/blob/main/images/aaltai%20.jpeg?raw=true",
    },
    {
      name: "Река Енисей",
      link: "https://github.com/lenuser/Mesto/blob/main/images/enisei.jpeg?raw=true",
    },
    {
      name: "Хакасия",
      link: "https://github.com/lenuser/Mesto/blob/main/images/hakas.jpeg?raw=true",
    },
    {
      name: "Алтай",
      link: "https://github.com/lenuser/Mesto/blob/main/images/altai.jpeg?raw=true",
    },
    {
      name: "Река Енисей",
      link: "https://github.com/lenuser/Mesto/blob/main/images/eenisei.jpeg?raw=true",
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