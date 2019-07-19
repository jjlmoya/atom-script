const locators = {
    trigger: '.bs_state',
    activeClass: 'is-active',
    eventClick: 'click'
};

const bindToggleElement = (component, state, stateLocator) => {
    [...document.querySelectorAll(stateLocator)].forEach((element) => {
        element.addEventListener(locators.eventClick, (e) => {
            component.classList.toggle(locators.activeClass, state);
        });
    });
};

const bindClose = (closeTrigger, element) => {
    bindToggleElement(element, false, closeTrigger);
};

const bindActive = (activeTrigger, element) => {
    bindToggleElement(element, true, activeTrigger);
};

const addActiveClass = (element) => {
    element.classList.add(locators.activeClass);
};

const bindDelay = (timeout, element) => {
    if (timeout) {
        setTimeout(function () {
            addActiveClass(element);
        }, timeout);
    }
};

const extractData = ({close, delay, active}) => {
    return {
        close: close,
        delay: delay,
        active: active
    };
};

const bindEvents = (settings, element) => {
    bindClose(settings.close, element);
    bindDelay(settings.delay, element);
    bindActive(settings.active, element);
};

(() => {
    document.querySelectorAll(locators.trigger).forEach((element) => {
        bindEvents(extractData(element.dataset), element);
    });
})();
