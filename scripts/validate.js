
 function enableValidation({ formSelector, inputSelector, ...rest }) {
  const forms = Array.from(document.querySelectorAll(formSelector));

  function toggleButtonValidity({ submitButtonSelector, inactiveButtonClass }, formElement) {
    const buttonElement = formElement.querySelector(submitButtonSelector);
    const inputs = Array.from(formElement.querySelectorAll('input'));
  
    if (formElement.checkValidity()) {
      buttonElement.classList.remove(inactiveButtonClass);
      buttonElement.disabled = false;
    } else {
      buttonElement.classList.add(inactiveButtonClass);
      buttonElement.disabled = true;
    }
  }
  
  forms.forEach((form) => {
    const inputs = Array.from(form.querySelectorAll(inputSelector));

    inputs.forEach((input) => {
      input.addEventListener("input", () => {
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

