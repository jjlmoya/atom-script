const locators = {
    trigger: '.bs_step',
    routerClass: 'is-active',
};

const model = {
    elements: [],
    activeIndex: -1,
};

const getElements = () => {
    model.elements = document.querySelectorAll(locators.trigger);
    for (var i = 0; i < model.elements.length; i++) {
        var elementIterator = model.elements[i];
        if (elementIterator.classList.contains(locators.routerClass)) {
            elementIterator.classList.remove(locators.routerClass);
            model.activeIndex = i;
        }
    }
};

const activeElement = element => {
    element.classList.add(locators.routerClass);
};

const showNextElement = () => {
    var elements = model.elements;
    try {
        model.activeIndex++;
        activeElement(elements[model.activeIndex]);
    } catch (e) {
        model.activeIndex--;
        activeElement(elements[model.activeIndex]);
    }
};

export const next = () => {
    getElements();
    if (model.elements.length > 0) {
        showNextElement();
    }
};