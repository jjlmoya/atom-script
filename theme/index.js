var Theme = Theme || {};
Theme.Brands = require('theme');

Theme.Events = {
    locators: {
        trigger: '.bs_theme',
    },
    model: {
        elements: []
    },


    extractData: function (dataset) {
        return {
            close: dataset.close,
            delay: dataset.delay,
            active: dataset.active
        };
    },

    bindEvents: function () {

    },
    init: function () {
        this.model.elements = document.querySelectorAll(this.locators.trigger);
        if (this.model.elements.length === 0) {
            return;
        }
        this.bindEvents();

    },

};

Theme.init = function () {
    Theme.Events.init();
};

module.exports = Theme;
