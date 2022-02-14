import '../styles/index.css';

import { Card } from '../scripts/components/Card.js'
import { FormValidator } from '../scripts/components/FormValidator.js';
import { popupPic, formSelectors } from '../scripts/utils/utils.js'
import { Section } from '../scripts/components/Section.js';
import { UserInfo } from '../scripts/components/UserInfo.js';
import { PopupWithImage } from '../scripts/components/PopupWithImage.js';
import { PopupWithForm } from '../scripts/components/PopupWithForm.js';
import { popupWithConfirmation } from '../scripts/components/PopupWithConfirmation.js';
import {Api} from '../scripts/components/Api.js';

import {
  inputName,
  inputJob,
  userName,
  userJob,
  popupEditProfile,
  popupAddContent,
  popupDeleteCard,
  formEdit,
  formAdd,
  formAvatar,
  inputPic,
  inputUrl,
  inputAvatarUrl,
  addContentBtn,
  editProfileBtn,
  popupAvatarUpdate,
  avatarUpdateBtn
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
  
   userInfo.setUserAvatar(newUserInfo.avatar);
   popupProfile.setInputValues(newUserInfo);
   cardList.renderItems(cards);
 })


const bigImage = new PopupWithImage(popupPic);
bigImage.setEventListeners();

const userInfo = new UserInfo({
  nameSelector: '.profile__name',
  jobSelector: '.profile__job',
  avatarSelector: '.profile__avatar'
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
    api.addCard({name, link})
    .then(card => {
     const newCard = createCard(card);
     cardList.prepend(newCard);
   })
  }
});
popupAdd.setEventListeners();


const popupAvatar = new PopupWithForm({popupSelector: popupAvatarUpdate,
  formSubmitHandler: ({avatar}) => {
    
    userInfo.setUserAvatar({avatar});
    api.updateUserInfo(userInfo.getUserInfo());
  }
});
popupAvatar.setEventListeners();

function formProfileSubmitHandler(evt) {
  evt.preventDefault();
  userName.textContent = inputName.value;
  userJob.textContent = inputJob.value;
  popupProfile.close();
}

function formAvatarSubmitHandler(evt) {
  const avatar = document.querySelector('.profile__avatar')
  evt.preventDefault();
  avatar.style.backgroundImage = `url(${inputAvatarUrl.value})`;
  popupAvatar.close()
}

function formPlaceSubmitHandler(evt) {
  evt.preventDefault();
  const data = {
    name: inputPic.value,
    link: inputUrl.value
  }
  cardList.prependItem(createCard(data));
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
avatarUpdateBtn.addEventListener('click', () => {popupAvatar.open()})


formAdd.addEventListener('submit', formPlaceSubmitHandler);
formEdit.addEventListener('submit', formProfileSubmitHandler);
formAvatar.addEventListener('submit', formAvatarSubmitHandler)


const editFormValidation = new FormValidator(formEdit);
editFormValidation.enableValidation(formSelectors);

const addFormValidation = new FormValidator(formAdd);
addFormValidation.enableValidation(formSelectors);

const avatarFormValidation = new FormValidator(formAvatar);
avatarFormValidation.enableValidation(formSelectors);
