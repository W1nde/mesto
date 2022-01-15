import {Card} from './Card.js'
import {FormValidator} from './FormValidator.js';
import {openPopup, popupPic, closePopup} from './utils.js'
import {initialCards} from './initial-cards.js';

const inputName = document.querySelector(".popup__input_type_name");
const inputJob = document.querySelector(".popup__input_type_job");
const userName = document.querySelector(".profile__name");
const userJob = document.querySelector(".profile__job");

const popupEditProfile = document.querySelector(".popup_type_edit");
const popupAddContent = document.querySelector(".popup_type_add");

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

const cardsContainer = document.querySelector(".elements")

function formProfileSubmitHandler(evt) {
  evt.preventDefault();
  userName.textContent = inputName.value;
  userJob.textContent = inputJob.value;
  closePopup(popupEditProfile);
}

function formPlaceSubmitHandler(evt) {
  evt.preventDefault();
  const object = {
    name: inputPic.value,
    link: inputUrl.value,
  }
  createCard(object)
  closePopup(popupAddContent);
  document.getElementById('formAdd').reset();

}

function openPopupEditProfile() {
  inputName.value = userName.textContent;
  inputJob.value = userJob.textContent;
  openPopup(popupEditProfile);
}

function openPopupAddContent() {
  const button = popupAddContent.querySelector('.popup__save')

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

function createCard(object) {
  const card = new Card(object, '#cardTemplate', openPopup);
  cardsContainer.prepend(card.getElement());
} 

initialCards.forEach(item => {
  const card = createCard(item)
})

editProfileBtn.addEventListener("click", openPopupEditProfile);
addContentBtn.addEventListener("click", openPopupAddContent);
closeBtnPopupEditProfile.addEventListener('click', closePopupEditProfile);
closeBtnPopupAddContent.addEventListener("click", closePopupAddContent);
closeBtnPopupPic.addEventListener("click", closePicPopup);
formAdd.addEventListener("submit", formPlaceSubmitHandler);
formEdit.addEventListener("submit", formProfileSubmitHandler);

popupOverlayEditProfile.addEventListener('mousedown', closePopupEditProfile);
popupOverlayAddContent.addEventListener('mousedown', closePopupAddContent);
popupOverlayPic.addEventListener('mousedown', closePicPopup);


const formSelectors = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__save',
  inactiveButtonClass: 'popup__save_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'error',
};
const editFormValidation = new FormValidator(formEdit);
editFormValidation.enableValidation(formSelectors);

const addFormValidation = new FormValidator(formAdd);
addFormValidation.enableValidation(formSelectors);
