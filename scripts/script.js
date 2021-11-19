const editButton = document.querySelector(".profile__edit-button");
const popup = document.querySelector(".popup");
const popupClose = document.querySelector(".popup__close");
const form = document.querySelector(".popup__form");
const nameForm = document.querySelector(".popup__subtitle__type_name");
const jobForm = document.querySelector(".popup__subtitle__type_job");
const popupSave = document.querySelector(".popup__save");
const userName = document.querySelector(".profile__name");
const userJob = document.querySelector(".profile__job")

function open() {
    userName.textContent = nameForm.value;
    userJob.textContent = jobForm.value;
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
