class Card {
    render() {
        const htmlCards = initialCards.map((el) => {
          return getElement(el);
        });
        elements.append(...htmlCards);
      }










    constructor(name, link) {
        this.name = name;
        this.link = link;
    }
}

export {Card} 