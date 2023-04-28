function setInputValidState(config, input, errorElement) {
  input.classList.remove(config.inputErrorClass);
  errorElement.textContent = " ";
}
function setInputInvalidState(config, input, errorElement) {
  input.classList.add(config.inputErrorClass);
  errorElement.textContent = input.validationMessage;
}

function checkInputValidity(config, form, input) {
  const errorElement = form.querySelector(`#error-${input.id}`);
  if (input.checkValidity()) {
    setInputValidState(config, input, errorElement);
  } else {
    setInputInvalidState(config, input, errorElement);
  }
}

function disabledButton({ inactiveButtonClass }, button) {
  button.setAttribute("disabled", " ");
  button.classList.add(inactiveButtonClass);
}

function enableButton({ inactiveButtonClass }, button) {
  button.removeAttribute("disabled", " ");
  button.classList.remove(inactiveButtonClass);
}

function toggleButtonValidity({ submitButtonSelector, ...rest }, form) {
  const submitButton = form.querySelector(submitButtonSelector);

  if (form.checkValidity()) {
    enableButton(rest, submitButton);
  } else {
    disabledButton(rest, submitButton);
  }
}

function sedSubmitValidation(config, form) {
  form.addEventListener("submit", function (event) {
    event.preventDefault();
    form.reset();
    toggleButtonValidity(config, form);
  });
}

function enableValidation({ formSelector, inputSelector, ...rest }) {
  const forms = Array.from(document.querySelectorAll(formSelector));

  forms.forEach((form) => {
    const inputs = Array.from(form.querySelectorAll(inputSelector));

    inputs.forEach((input) => {
      input.addEventListener("input", () => {
        checkInputValidity(rest, form, input);
        toggleButtonValidity(rest, form);
      });
    });

    form.addEventListener("submit", (event) => {
      event.preventDefault();
      form.reset();
      toggleButtonValidity(rest, form);
    });
  });
}

enableValidation({
  formSelector: ".popup__form",
  inputSelector: ".popup__text",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button-disabled",
  inputErrorClass: "popup__text_invalid",
  errorClass: "error-message",
});
