const popupPic = document.querySelector(".popup_type_pic");

function openPopup(popup) {
    popup.classList.add("popup_opened");
  
    document.addEventListener("keydown", closeByEsc);
}

function closeByEsc(event) {
    if (event.key === "Escape") {
      const openedPopup = document.querySelector(".popup_opened");
      closePopup(openedPopup)
     }
}

function closePopup(popup) {
    popup.classList.remove("popup_opened");
  
    document.removeEventListener("keydown", closeByEsc);
  }

  const formSelectors = {
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__save',
    inactiveButtonClass: 'popup__save_disabled',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'error',
  };

export {popupPic, openPopup, closePopup, formSelectors};