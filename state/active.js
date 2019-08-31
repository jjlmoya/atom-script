import {ShowOverflowLayer, HideOverflowLayer} from "../components/overlay";

const locators = {
    trigger: '.bs_state',
    activeClass: 'is-active',
    eventClick: 'click'
};

const bindToggleElement = (component, state, stateLocator) => {
    [...document.querySelectorAll(stateLocator)].forEach((element) => {
        element.addEventListener(locators.eventClick, (e) => {
            component.classList.toggle(component.dataset.activeClass || locators.activeClass, state);
            if (component.dataset.block) {
                if (state) {
                    ShowOverflowLayer(component);
                } else {
                    HideOverflowLayer();
                }
            }
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

const extractData = ({close, delay, active, block, activeClass}) => {
    return {
        close: close,
        delay: delay,
        active: active,
        block: block,
        activeClass: activeClass
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
