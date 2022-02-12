import '../styles/index.css';

import { Card } from '../scripts/components/Card.js'
import { FormValidator } from '../scripts/components/FormValidator.js';
import { popupPic, formSelectors } from '../scripts/utils/utils.js'
import { Section } from '../scripts/components/Section.js';
import { UserInfo } from '../scripts/components/UserInfo.js';
import { PopupWithImage } from '../scripts/components/PopupWithImage.js';
import { PopupWithForm } from '../scripts/components/PopupWithForm.js';
import {Api} from '../scripts/components/Api.js';

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
  editProfileBtn,
} from '../scripts/utils/constants.js'

const api = new Api ({
  adress: 'https://mesto.nomoreparties.co/v1/cohort-35/',
  token: '3fdbcb9c-8f37-4908-83ea-7fa8f283a235'
})

const cardList = new Section ({
  renderer: (item) => {
    return createCard(item);
  },
},
'.elements'
);

Promise.all([api.getUserInfo(), api.getCards()])
 .then(([newUserInfo, cards]) => {
   userInfo.setUserInfo(newUserInfo);
   cardList.renderItems(cards);
 })
//   .catch((err) =>
//   // console.log(`${err}`)
//   );

const bigImage = new PopupWithImage(popupPic);
bigImage.setEventListeners();

const userInfo = new UserInfo({
  nameSelector: ".profile__name",
  jobSelector: ".profile__job"
});

const popupProfile = new PopupWithForm({popupSelector: popupEditProfile,
  formSubmitHandler: ({name, job}) => {
    userInfo.setUserInfo({name, job});
    api.updateUserInfo({name, job});
  }
});
popupProfile.setEventListeners();

const popupAdd = new PopupWithForm({popupSelector: popupAddContent,
  formSubmitHandler: ({name, link}) => {
    const newCard = createCard({name: name, link: link});
    cardList.prependItem(newCard)
    api.addCard({name, link});
  }
});

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