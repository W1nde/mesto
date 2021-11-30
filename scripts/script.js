const editButton = document.querySelector(".profile__edit-button");
const popup = document.querySelector(".popup");
const form = document.querySelector(".popup__form");
const nameForm = document.querySelector(".popup__input_type_name");
const jobForm = document.querySelector(".popup__input_type_job");
const popupSave = document.querySelector(".popup__save");
const userName = document.querySelector(".profile__name");
const userJob = document.querySelector(".profile__job");


const addButton = document.querySelector(".profile__add-button")
const popupEdit = document.querySelector(".popup__window_type_edit");
const popupAdd = document.querySelector(".popup__window_type_add");
const formEdit = document.querySelector(".popup__form_type_edit");
const formAdd = document.querySelector(".popup__form_type_add");
const pictureForm = document.querySelector(".popup__input_type_pic-name");
const urlForm = document.querySelector(".popup__input_type_url");

const closeBtnPopupEdit = popupEdit.querySelector('.popup__close');
const closeBtnPopupAdd = popupAdd.querySelector('.popup__close');

const likeButton = document.querySelectorAll('element__like-button')

function like() {
    likeButton.classList.toggle("element__like-button_active")
}


function closeEditPopup() {
    popupEdit.classList.remove("popup_opened");
}

function closeAddPopup() {
    popupAdd.classList.remove("popup_opened");
}

function openEditPopup() {
    nameForm.value = userName.textContent;
    jobForm.value = userJob.textContent;
    popupEdit.classList.add("popup_opened");
}

function openAddPopup() {
    popupAdd.classList.add("popup_opened");
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
formEdit.addEventListener('submit', edit);
formAdd.addEventListener('submit', add);
likeButton.addEventListener('click', like);
