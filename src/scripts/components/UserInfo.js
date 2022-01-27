class UserInfo {
    constructor(selectors){
        this._name = selectors.profileName
        this._about = selectors.profileJob
    }

    getUserInfo(){
        return {
            name: this._name,
            about: this._about
        }
    }

    setUserInfo(name, about){
        this._name = name
        this._about = about;
    }
}

export {UserInfo}
