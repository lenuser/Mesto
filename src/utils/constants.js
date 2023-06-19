import altai from '../images/aaltai .jpeg'
import aaltai from '../images/altai.jpeg'

import enisei from '../images/enisei.jpeg'
import eenisei from '../images/eenisei.jpeg'

import hhakasia from '../images/hhakasia.jpeg'
import hakasia from '../images/hakas.jpeg'

export const initialCards = [
  {
    name: "Хакасия",
    link: hhakasia,
  },
  {
    name: "Алтай",
    link: altai,
  },
  {
    name: "Река Енисей",
    link: eenisei,
  },
  {
    name: "Хакасия",
    link: hakasia,
  },
  {
    name: "Алтай",
    link: aaltai,
  },
  {
    name: "Река Енисей",
    link: enisei,
  },
];


export const formConfig = {
  inputSelector: ".popup__text",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button-disabled",
  inputErrorClass: "popup__text_invalid",
  errorClass: "error-message",
};
