import '../styles/index.css';

import { Card } from './components/Card.js'
import { FormValidator } from './components/FormValidator.js';
import { popupPic, formSelectors } from './utils/utils.js'
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
bigImage.setEventListeners();

const userInfo = new UserInfo({
  profileName: userName,
  profileJob: userJob
});

const popupProfile = new PopupWithForm({popupSelector: popupEditProfile,
  formProfileSubmitHandler: ({name, job}) => {
    userInfo.setUserInfo({name, job});
  }
});
popupProfile.setEventListeners();

const popupAdd = new PopupWithForm({popupSelector: popupAddContent,
  formPlaceSubmitHandler: ({name, link}) => {
    const newCard = createCard({name: name, link: link});
  cardList.prependItem(newCard)
}
});
popupAdd.setEventListeners();


function formProfileSubmitHandler(evt) {
  evt.preventDefault();
  userName.textContent = inputName.value;
  userJob.textContent = inputJob.value;
  popupProfile.close();
  
}

function formPlaceSubmitHandler(evt) {
  evt.preventDefault();
  const object = {
    name: inputPic.value,
    link: inputUrl.value,
  }
  cardList.prependItem(createCard(object));
  popupAdd.close();
  formAdd.reset()

}

function createCard(object) { 
  const card = new Card(object, '#cardTemplate', () => { 
    bigImage.open(object.name, object.link) 
  }); 
  return card.getElement(); 
} 

editProfileBtn.addEventListener('click', () => {popupProfile.open()});
addContentBtn.addEventListener('click', () => {popupAdd.open()})

formAdd.addEventListener('submit', formPlaceSubmitHandler);
formEdit.addEventListener('submit', formProfileSubmitHandler);

const editFormValidation = new FormValidator(formEdit);
editFormValidation.enableValidation(formSelectors);

const addFormValidation = new FormValidator(formAdd);
addFormValidation.enableValidation(formSelectors);