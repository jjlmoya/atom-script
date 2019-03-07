module.exports = {
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