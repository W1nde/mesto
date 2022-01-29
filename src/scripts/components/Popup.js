class Popup {
    constructor(popupSelector){
        this._popup = popupSelector
        this._handleEscClose = this._handleEscClose.bind(this);
    }

    open() {
        this._popup.classList.add('popup_opened');
        
        document.addEventListener('keydown', this._handleEscClose);
    }   

    close = () => {
        this._popup.classList.remove("popup_opened"); 
  
        document.removeEventListener("keydown", this._handleEscClose);
    }

    _handleEscClose(evt) {
        if (evt.key === "Escape") {
        this.close()
        }
    }

    setEventListeners() {
        this._closePopupBtn = this._popup.querySelector('.popup__close');
        this._closePopupBtn.addEventListener('mousedown', () => {
          this.close();
        });

        const popupOverlay = this._popup.querySelector('.popup__overlay');
        popupOverlay.addEventListener('mousedown', () => {
          this.close();
        })
    }
}

export {Popup}