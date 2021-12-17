const inputName = document.querySelector(".popup__input_type_name");
const inputJob = document.querySelector(".popup__input_type_job");
const userName = document.querySelector(".profile__name");
const userJob = document.querySelector(".profile__job");
const elements = document.querySelector(".elements");
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

const likeButton = document.querySelector(".element__like-button");
const addContentBtn = document.querySelector(".profile__add-button");
const editProfileBtn = document.querySelector(".profile__edit-button");
const popupImage = document.querySelector(".popup__pic");
const popupPicTitle = document.querySelector(".popup__pic-title");
const popup = document.querySelector(".popup");

const popupOverlayEditProfile = popupEditProfile.querySelector(".popup__overlay");
const popupOverlayAddContent = popupAddContent.querySelector(".popup__overlay")
const popupOverlayPic = popupPic.querySelector(".popup__overlay")

function getElement(el) {
  const cardTemplate = document.querySelector("#cardTemplate").content;
  const cardElement = cardTemplate.querySelector(".element").cloneNode(true);
  const cardPicture = cardElement.querySelector(".element__image");
  cardElement.querySelector(".element__title").textContent = el.name;
  cardPicture.src = el.link;
  cardPicture.alt = el.name;
  const delButton = cardElement.querySelector(".element__trash");
  delButton.addEventListener("click", handleDelete);
  const likeButton = cardElement.querySelector(".element__like-button");
  likeButton.addEventListener("click", handleLike);
  cardPicture.addEventListener("click", handleImgClick);
  return cardElement;
}

function render() {
  const htmlCards = initialCards.map((el) => {
    return getElement(el);
  });
  elements.append(...htmlCards);
}

function closeByEsc(evt, popup) {
  if (evt.key === "Escape") {
    closePopup(popup)
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
  const inputs = {
    name: inputPic.value,
    link: inputUrl.value,
  };
  const newElement = getElement(inputs);
  elements.prepend(newElement);
  closePopup(popupAddContent);
  document.getElementById('addForm').reset();
}

render();
function handleDelete(event) {
  const eventTarget = event.target;
  const element = eventTarget.closest(".element");
  element.remove();
}

function handleLike(event) {
  const eventTarget = event.target;
  eventTarget.classList.toggle("element__like-button_active");
}

function handleImgClick(event) {
  const eventTarget = event.target;
  const element = eventTarget.closest(".element");
  popupPicTitle.textContent = element.textContent;
  popupImage.src = element.querySelector(".element__image").src;
  popupImage.alt = element.textContent;
  openPopup(popupPic);
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
