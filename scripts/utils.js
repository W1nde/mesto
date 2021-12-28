const popupPic = document.querySelector(".popup_type_pic");

function openPopup(popup) {
    popup.classList.add("popup_opened");
  
    document.addEventListener("keydown", closeByEsc);
}

export {popupPic, openPopup};