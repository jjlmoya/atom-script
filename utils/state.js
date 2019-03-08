var Status = Status || {};
Status.active = {
    locators: {
        trigger: '.bs_state',
        activeClass: 'is-active',
        eventClick: 'click'
    },
    bindToggleElement: function (element, component, state) {
        if (element.length > 0) {
            element[0].addEventListener(this.locators.eventClick, function () {
                component.classList.toggle(this.locators.activeClass, state);
            });
        }
    },
    bindClose: function (closeElement, component) {
        this.bindToggleElement(document.getElementsByClassName(closeElement), component, false);

    },
    bindActive: function (activeElement, component) {
        this.bindToggleElement(document.getElementsByClassName(activeElement), component, true);
    },
    bindDelay: function (timeout, component) {
        if (timeout) {
            setTimeout(function () {
                component.classList.add(this.locators.activeClass);
            }, timeout);
        }
    },
    extractData: function (dataset) {
        return {
            close: dataset.close,
            delay: dataset.delay,
            active: dataset.active
        };
    },
    bindEvents: function (settings, component) {
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
        activeClass: 'is-visible'
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

    isElementOnViewPort: function (el) {
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
    checkElementsOnViewPort: function (elements) {
        var isVisible;
        for (var i = 0; i < elements.length; i++) {
            isVisible = this.isElementOnViewPort(elements[i]);
            console.log(isVisible);
            elements[i].classList
                .toggle(this.locators.activeClass, isVisible);
        }
    },
    extractData: function (dataset) {
        return {
            view: dataset.delay
        };
    },
    bindScroll: function () {
        var that = this;
        document.addEventListener('scroll', function () {
            that.checkElementsOnViewPort(that.model.elements);
        });
    },
    bindEvents: function () {
        this.bindScroll();
    },
    init: function () {
        this.model.elements = document.querySelectorAll(this.locators.trigger);
        if (this.model.elements.length === 0) {
            return;
        }
        this.bindEvents();

    },

};

Status.init = function () {
    this.active.init();
    this.viewPort.init();
};

module.exports = Status;


