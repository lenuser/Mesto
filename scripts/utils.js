export function openPopup(popupName) {
  popupName.classList.add("popup_opened");
  addEscListener();
}
 function addEscListener() {
  document.body.addEventListener("keydown", handleEscClose);
}

 function handleEscClose(evt) {
  if (evt.key === "Escape") {
    closePopup(document.querySelector(".popup_opened"));
   
  }
}
function closePopup(popupName) {
  popupName.classList.remove("popup_opened");
  removeEscListener();
}
function removeEscListener() {
  document.body.removeEventListener("keydown", handleEscClose);
}