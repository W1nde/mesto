const popup = document.querySelector(".popup");
const form = document.querySelector(".popup__form");
const nameForm = document.querySelector(".popup__input_type_name");
const jobForm = document.querySelector(".popup__input_type_job");
const popupSave = document.querySelector(".popup__save");
const userName = document.querySelector(".profile__name");
const userJob = document.querySelector(".profile__job");
const elements = document.querySelector(".elements")
const popupEdit = document.querySelector(".popup_type_edit");
const popupAdd = document.querySelector(".popup_type_add");
const popupPic = document.querySelector(".popup_type_pic");
const formEdit = document.querySelector(".popup__form_type_edit");
const formAdd = document.querySelector(".popup__form_type_add");
const formPic = document.querySelector(".popup__input_type_pic-name");
const formUrl = document.querySelector(".popup__input_type_url");
const closeBtnPopupEdit = popupEdit.querySelector('.popup__close');
const closeBtnPopupAdd = popupAdd.querySelector('.popup__close');
const closeBtnPopupPic = popupPic.querySelector('.popup__close');
const likeButton = document.querySelector('.element__like-button');
const addButton = document.querySelector(".profile__add-button");
const editButton = document.querySelector(".profile__edit-button");

const initialCards = [
    {
      name: 'Архыз',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
    },
    {
      name: 'Челябинская область',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
    },
    {
      name: 'Иваново',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
    },
    {
      name: 'Камчатка',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
    },
    {
      name: 'Холмогорский район',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
    },
    {
      name: 'Байкал',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
    }
  ];
  
  function formProfileSubmitHandler (evt) {
    evt.preventDefault();
    profileName.textContent = nameInput.value;
    profileProfession.textContent = jobInput.value;
    closePopup(popupProfile);
  }

  function formPlaceSubmitHandler (evt) {
    evt.preventDefault();
    const inputs = {
      name: formPic.value,
      link: formUrl.value,
      alt: formPic.value
    };
    const newElement = getElement(inputs);
    elements.prepend(newElement);
    closePopup(popupAdd);
  }

function getElement (el) {
  const cardTemplate = document.querySelector("#cardTemplate").content;
  const cardElement = cardTemplate.querySelector(".element").cloneNode(true);
  const cardPicture = cardElement.querySelector(".element__image");
  cardElement.querySelector('.element__title').textContent = el.name;
  cardPicture.src = el.link;
  cardPicture.alt = el.name;
  const delButton = cardElement.querySelector(".element__trash");
  delButton.addEventListener('click', handleDelete);
  const likeButton = cardElement.querySelector(".element__like-button");
  likeButton.addEventListener('click', handleLike);
  cardPicture.addEventListener('click', handleImgClick);
  return cardElement;
}
function render () {
  const htmlCard = initialCards.map((el) => {
  return getElement(el);
});

  elements.append(...htmlCard);
}

render();
function handleDelete (event) {
  const eventTarget = event.target;
  const element = eventTarget.closest('.element');
  element.remove();
}
function handleLike (event) {
  const eventTarget = event.target;
  eventTarget.classList.toggle("element__like-button_active");
}
function handleImgClick (event) {
  const eventTarget = event.target;
  const element = eventTarget.closest('.element');
  const popupImage = document.querySelector('.popup__pic');
  const popupPicTitle = document.querySelector('.popup__pic-title');
  popupPicTitle.textContent = element.textContent;
  popupImage.src = element.querySelector('.element__image').src;
  popupImage.alt = element.textContent;
  openPicPopup(popupPic);
}

function openEditPopup() {
  nameForm.value = userName.textContent;
  jobForm.value = userJob.textContent;
  popupEdit.classList.add("popup_opened");
}

function openAddPopup() {
  popupAdd.classList.add("popup_opened");
}


function openPicPopup() {
  popupPic.classList.add("popup_opened");
}

function closePicPopup() {
  popupPic.classList.remove("popup_opened");
}

function closeEditPopup() {
  popupEdit.classList.remove("popup_opened");
}

function closeAddPopup() {
  popupAdd.classList.remove("popup_opened");
}

function edit (evt) {
  evt.preventDefault();
  userName.textContent = nameForm.value;
  userJob.textContent = jobForm.value;
  closeEditPopup();
}
function add (evt) {
  evt.preventDefault();
  popupAdd.classList.remove("popup_opened");
  closeAddPopup();
}
editButton.addEventListener('click', openEditPopup);
addButton.addEventListener('click', openAddPopup);
closeBtnPopupEdit.addEventListener('click', closeEditPopup);
closeBtnPopupAdd.addEventListener('click', closeAddPopup);
closeBtnPopupPic.addEventListener('click', closePicPopup);
formEdit.addEventListener('submit', edit);
formAdd.addEventListener('submit', formPlaceSubmitHandler);
formPic.addEventListener('submit', formProfileSubmitHandler);