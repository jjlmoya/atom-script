var Status = Status || {};
Status.active = {
    locators: {
        trigger: '.bs_state',
        activeClass: 'is-active',
        eventClick: 'click'
    },
    bindToggleElement: (element, component, state, closeClass) => {
        var that = this;
        if (element.length > 0) {
            element[0].addEventListener(this.locators.eventClick, (e) => {
                if (state || !closeClass || e.target.classList.contains(closeClass)) {
                    document.body.classList.remove('overflow-blocked');
                    component.classList.toggle(that.locators.activeClass, state);
                }
            }, {passive: true});
        }
    },
    bindClose: (closeElement, component) => {
        if (closeElement) {
            this.bindToggleElement(document.getElementsByClassName(closeElement), component, false, closeElement);
        }

    },
    bindActive: (activeElement, component) => {
        if (activeElement) {
            this.bindToggleElement(document.getElementsByClassName(activeElement), component, true);
        }
    },
    addActiveClass: (component) => {
        component.classList.add(this.locators.activeClass);
    },
    bindDelay: (timeout, component) => {
        var that = this;
        if (timeout) {
            setTimeout(() => {
                that.addActiveClass(component);
            }, timeout);
        }
    },
    extractData: (dataset) => {
        return {
            close: dataset.close,
            delay: dataset.delay,
            active: dataset.active
        };
    },
    bindEvents: (settings, component) => {
        this.bindClose(settings.close, component);
        this.bindDelay(settings.delay, component);
        this.bindActive(settings.active, component);
    },
    init: function () {
        var elementsToActive = document.querySelectorAll(this.locators.trigger);
        for (var i = 0; i < elementsToActive.length; i++) {
            this.bindEvents(this.extractData(elementsToActive[i].dataset), elementsToActive[i]);
        }
    }
};

Status.viewPort = {
    locators: {
        trigger: '.bs_viewport',
        partialClass: 'is-visible',
        fullClass: 'is-all-visible',
        loaded: 'is-loaded'
    },
    model: {
        elements: [],
        offset: {
            y: window.pageYOffset,
            x: window.pageXOffset,
            height: window.innerHeight,
            width: window.innerWidth
        }
    },

    isElementOnPartialViewPort: (el) => {
        var top = el.offsetTop;
        var left = el.offsetLeft;
        var width = el.offsetWidth;
        var height = el.offsetHeight;

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
    },

    isElementOnViewPort: (el) => {
        var top = el.offsetTop;
        var left = el.offsetLeft;
        var width = el.offsetWidth;
        var height = el.offsetHeight;

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
    },
    checkElementsOnViewPort: (elements) => {
        var isVisible, isFullVisible;
        for (var i = 0; i < elements.length; i++) {
            isVisible = this.isElementOnPartialViewPort(elements[i]);
            isFullVisible = this.isElementOnViewPort(elements[i]);
            elements[i].classList
                .toggle(this.locators.partialClass, isVisible);
            elements[i].classList
                .toggle(this.locators.fullClass, isFullVisible);
            if (isVisible) {
                elements[i].classList
                    .add(this.locators.loaded);
            }

        }
    },
    bindScroll: () => {
        var that = this;
        document.addEventListener('scroll', () => {
            that.checkElementsOnViewPort(that.model.elements);
        }, {passive: true});
        that.checkElementsOnViewPort(that.model.elements);
    },
    bindEvents: () => {
        this.bindScroll();
    },
    init: function () {
        this.model.elements = document.querySelectorAll(this.locators.trigger);
        if (this.model.elements.length === 0) {
            return;
        }
        this.bindEvents();
    }
};

Status.init = function () {
    this.active.init();
    this.viewPort.init();
};

module.exports = Status;


