class Section {
    constructor({ items, renderer }, selector) {
        this._renderer = renderer;
        this._renderedItems = items;
    
        this._container = selector;
    }
    
    renderItems() {
        this._renderedItems.forEach((item) => {
          this._renderer(item);
        })
    }
    
    addItem(element) {
        this._container.append(element);
    }
    
    prependItem(element) {
        this._container.prepend(element);
    }
}

export {Section}