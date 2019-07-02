const locators = {
    trigger: '.bs_viewport',
    partialClass: 'is-visible',
    fullClass: 'is-all-visible',
    loaded: 'is-loaded'
};

const model = {
    elements: [],
    offset: {
        y: window.pageYOffset,
        x: window.pageaXOffset,
        height: window.innerHeight,
        width: window.innerWidth
    }
};


const isElementOnPartialViewPort = el => {
    var top = el.offsetTop,
        left = el.offsetLeft,
        width = el.offsetWidth,
        height = el.offsetHeight;

    while (el.offsetParent) {
        el = el.offsetParent;
        top += el.offsetTop;
        left += el.offsetLeft;
    }
    return (
        top < (window.pageYOffset + window.innerHeight) &&
        left < (window.pageXOffset + window.innerWidth) &&
        (top + height) > window.pageYOffset &&
        (left + width) > window.pageXOffset
    );
};

const isElementOnViewPort = el => {
    let top = el.offsetTop,
        left = el.offsetLeft,
        width = el.offsetWidth,
        height = el.offsetHeight;

    while (el.offsetParent) {
        el = el.offsetParent;
        top += el.offsetTop;
        left += el.offsetLeft;
    }

    return (
        top >= window.pageYOffset &&
        left >= window.pageXOffset &&
        (top + height) <= (window.pageYOffset + window.innerHeight) &&
        (left + width) <= (window.pageXOffset + window.innerWidth)
    );
};


const checkElementsOnViewPort = (elements) => {
    let isVisible, isFullVisible;
    elements.forEach((element) => {
        isVisible = isElementOnPartialViewPort(element);
        isFullVisible = isElementOnViewPort(element);
        element.classList
            .toggle(locators.partialClass, isVisible);
        element.classList
            .toggle(locators.fullClass, isFullVisible);
        if (isVisible) {
            element.classList
                .add(locators.loaded);
        }
    });
};

const bindEvents = () => {
    bindScroll();
};

const bindScroll = () => {
    document.addEventListener('scroll', () => {
        checkElementsOnViewPort(model.elements);
    }, {passive: true});
    checkElementsOnViewPort(model.elements);
};

(() => {
    model.elements = document.querySelectorAll(locators.trigger);
    if (model.elements.length === 0) {
        return;
    }
    bindEvents();
})();
