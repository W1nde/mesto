const inputName = document.querySelector(".popup__input_type_name");
const inputJob = document.querySelector(".popup__input_type_job");
const userName = document.querySelector(".profile__name");
const userJob = document.querySelector(".profile__job");

const popupEditProfile = document.querySelector(".popup_type_edit");
const popupAddContent = document.querySelector(".popup_type_add");
const popupPic = document.querySelector(".popup_type_pic");
const formEdit = document.querySelector(".popup__form_type_edit");
const formAdd = document.querySelector(".popup__form_type_add");
const inputPic = document.querySelector(".popup__input_type_pic-name");
const inputUrl = document.querySelector(".popup__input_type_url");

const closeBtnPopupEditProfile = popupEditProfile.querySelector(".popup__close");
const closeBtnPopupAddContent = popupAddContent.querySelector(".popup__close");
const closeBtnPopupPic = popupPic.querySelector(".popup__close");

const addContentBtn = document.querySelector(".profile__add-button");
const editProfileBtn = document.querySelector(".profile__edit-button");

const popupOverlayEditProfile = popupEditProfile.querySelector(".popup__overlay");
const popupOverlayAddContent = popupAddContent.querySelector(".popup__overlay")
const popupOverlayPic = popupPic.querySelector(".popup__overlay")

function closeByEsc(event) {
  if (event.key === "Escape") {
    const openedPopup = document.querySelector(".popup_opened");
    closePopup(openedPopup)
   }
}

function openPopup(popup) {
  popup.classList.add("popup_opened");

  document.addEventListener("keydown", closeByEsc);
}

function closePopup(popup) {
  popup.classList.remove("popup_opened");

  document.removeEventListener("keydown", closeByEsc);
}

function formProfileSubmitHandler(evt) {
  evt.preventDefault();
  userName.textContent = inputName.value;
  userJob.textContent = inputJob.value;
  closePopup(popupEditProfile);
}

function formPlaceSubmitHandler(evt) {
  evt.preventDefault();
  new Card(inputPic.value, inputUrl.value)
  closePopup(popupAddContent);
  document.getElementById('addForm').reset();
}

function openPopupEditProfile() {
  if (inputName.value === "" && inputJob.value === "") {
    inputName.value = userName.textContent;
    inputJob.value = userJob.textContent;
  }
  openPopup(popupEditProfile);
}

function openPopupAddContent() {
  const button = popupAddContent.querySelector('.popup__save')
  
  button.disabled = true;

  button.classList.add('popup__save_disabled')
  openPopup(popupAddContent);
}

function closePopupEditProfile() {
  closePopup(popupEditProfile);
}

function closePicPopup() {
  closePopup(popupPic);
}

function closePopupAddContent() {
  closePopup(popupAddContent);
}

editProfileBtn.addEventListener("click", openPopupEditProfile);
addContentBtn.addEventListener("click", openPopupAddContent);
closeBtnPopupEditProfile.addEventListener('click', closePopupEditProfile);
closeBtnPopupAddContent.addEventListener("click", closePopupAddContent);
closeBtnPopupPic.addEventListener("click", closePicPopup);
formAdd.addEventListener("submit", formPlaceSubmitHandler);
formEdit.addEventListener("submit", formProfileSubmitHandler);

popupOverlayEditProfile.addEventListener('click', closePopupEditProfile);
popupOverlayAddContent.addEventListener('click', closePopupAddContent);
popupOverlayPic.addEventListener('click', closePicPopup);

import {Card} from './Card.js'
export {openPopup, popupPic}