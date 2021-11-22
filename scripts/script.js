const editButton = document.querySelector(".profile__edit-button");
const popup = document.querySelector(".popup");
const popupClose = document.querySelector(".popup__close");
const form = document.querySelector(".popup__form");
const nameForm = document.querySelector(".popup__input_type_name");
const jobForm = document.querySelector(".popup__input_type_job");
const popupSave = document.querySelector(".popup__save");
const userName = document.querySelector(".profile__name");
const userJob = document.querySelector(".profile__job")

function open() {
    nameForm.value = userName.textContent;
    jobForm.value = userJob.textContent;
    popup.classList.add("popup_opened");
}

function close() {
    popup.classList.remove("popup_opened");
}

function edit (evt) {
    evt.preventDefault();
    userName.textContent = nameForm.value;
    userJob.textContent = jobForm.value;
    close();
} 

editButton.addEventListener('click', open);
popupClose.addEventListener('click', close);
form.addEventListener('submit', edit);
