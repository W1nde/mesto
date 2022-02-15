class UserInfo {
    constructor({nameSelector, jobSelector, avatarSelector}){
        this._name = document.querySelector(nameSelector);
        this._about = document.querySelector(jobSelector);
        this._avatar = document.querySelector(avatarSelector);
    }

    getUserInfo(){
        return {
            name: this._name.textContent,
            about: this._about.textContent,
            avatar: this._avatarUrl
        }
    }

    setUserInfo({name, about}){
        this._name.textContent = name;
        this._about.textContent = about;
    }

    setUserAvatar(avatar) {
        this._avatar.style.backgroundImage = `url(${avatar})`;
        this._avatarUrl = avatar;
        
    }
}

export {UserInfo}
