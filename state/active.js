const locators = {
    trigger: '.bs_state',
    activeClass: 'is-active',
    eventClick: 'click'
};


const bindToggleElement = (element, component, state, closeClass) => {
    if (element.length > 0) {
        element[0].addEventListener(locators.eventClick, function (e) {
            if (state || !closeClass || e.target.classList.contains(closeClass)) {
                document.body.classList.remove('overflow-blocked');
                component.classList.toggle(locators.activeClass, state);
            }
        });
    }
};

const bindClose = (closeElement, component) => {
    if (closeElement) {
        bindToggleElement(document.getElementsByClassName(closeElement), component, false, closeElement);
    }
};

const bindActive = (activeElement, component) => {
    if (activeElement) {
        bindToggleElement(document.getElementsByClassName(activeElement), component, true);
    }
};

const addActiveClass = (component) => {
    component.classList.add(locators.activeClass);
};

const bindDelay = (timeout, component) => {
    if (timeout) {
        setTimeout(function () {
            addActiveClass(component);
        }, timeout);
    }
};

const extractData = dataset => {
    return {
        close: dataset.close,
        delay: dataset.delay,
        active: dataset.active
    };
};

const bindEvents = (settings, component) => {
    bindClose(settings.close, component);
    bindDelay(settings.delay, component);
    bindActive(settings.active, component);
};

(() => {
    document.querySelectorAll(locators.trigger).forEach((element) => {
        bindEvents(extractData(element.dataset), element);
    });
})();
