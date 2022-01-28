import '../styles/index.css';

import addButtonImage from '../images/add-button.svg';
import avatarImage from '../images/avatar.svg';
import editButtonImage from '../images/edit-button.svg';
import elementDombayImage from '../images/element-dombay.jpg';
import elementElbrusImage from '../images/element-elbrus.jpg';
import elementKarachaevskImage from '../images/element-karachaevsk.jpg';
import footerLogoImage from '../images/footer-logo.svg';
import headerLogoImage from '../images/header-logo.svg';
import likeButtonImage from '../images/like-button.svg';
import likeButtonActiveImage from '../images/like-button-active.svg';
import popupCloseImage from '../images/popup-close.svg';
import trashImage from '../images/trash.svg';

import interBlackFont from '../vendor/fonts/InterWeb/Inter-Black.woff2';
import interBoldFont from '../vendor/fonts/InterWeb/Inter-Bold.woff2';
import interMediumFont from '../vendor/fonts/InterWeb/Inter-Medium.woff2';
import interRegularFont from '../vendor/fonts/InterWeb/Inter-Regular.woff2';

import { Card } from './components/Card.js'
import { FormValidator } from './components/FormValidator.js';
import { openPopup, popupPic, closePopup } from './utils/utils.js'
import { initialCards } from './utils/initial-cards.js';
import { Section } from './components/Section.js';
import { UserInfo } from './components/UserInfo.js';
import { PopupWithImage } from './components/PopupWithImage.js';
import { PopupWithForm } from './components/PopupWithForm.js';

import {
  inputName,
  inputJob,
  userName,
  userJob,
  popupEditProfile,
  popupAddContent,
  formEdit,
  formAdd,
  inputPic,
  inputUrl,
  addContentBtn,
  editProfileBtn
} from './utils/constants.js'

const closeBtnPopupEditProfile = popupEditProfile.querySelector(".popup__close"); 
const closeBtnPopupAddContent = popupAddContent.querySelector(".popup__close");
const closeBtnPopupPic = popupPic.querySelector(".popup__close");

const popupOverlayEditProfile = popupEditProfile.querySelector(".popup__overlay");
const popupOverlayAddContent = popupAddContent.querySelector(".popup__overlay")
const popupOverlayPic = popupPic.querySelector(".popup__overlay")

const cardsContainer = document.querySelector(".elements");

 const cardList = new Section ({
  items: initialCards,
  renderer: (item) => {
    const card = createCard(item);
    cardList.addItem(card)
  },
},
cardsContainer
);

cardList.renderItems();

const bigImage = new PopupWithImage(popupPic);

const userInfo = new UserInfo({
  profileName: userName,
  profileJob: userJob
});

const popupProfile = new PopupWithForm({popupSelector: popupEditProfile,
  formProfileSubmitHandler: ({name, job}) => {
    userInfo.setUserInfo({name, job});
    popupProfile.close();
  }
});
popupProfile.setEventListeners();

const popupAdd = new PopupWithForm({popupSelector: popupAddContent,
  formPlaceSubmitHandler: ({name, link}) => {
    const newCard = createCard({name: name, link: link});
  cardList.prependItem(newCard)
  popupAdd.close();
}
});
popupProfile.setEventListeners();


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
  cardList.prependItem(createCard(object))
  closePopup(popupAddContent);
  formAdd.reset()

}

function openPopupEditProfile() {
  inputName.value = userName.textContent;
  inputJob.value = userJob.textContent;
  openPopup(popupEditProfile);
}

function openPopupAddContent() {
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
  const card = new Card(object, '#cardTemplate', () => {
    bigImage.open(card._name, card._link)
    document.addEventListener('keydown' , bigImage.close)

  });
  return card.getElement();
}

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