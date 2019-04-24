var Theme = Theme || {},
    Utils = require('../utils/misc'),
    Config = require('../config/index');
Theme.Parameter = {
    model: {
        storageKey: 'bonseo_theme',
        themes: Config.Themes
    },
    getLocalBrand: function () {
        return localStorage.getItem(this.model.storageKey);
    },
    removeActiveThemes: function (element) {
        if (element.className) {
            this.model.themes.forEach(function (theme) {
                element.classList.remove(theme);
            });
        }
    },
    init: function () {
        const parameters = Utils.searchToObject(window.location.search),
            brand = parameters.brand || this.getLocalBrand();
        if (brand) {
            this.removeActiveThemes(document.body);
            document.body.classList.add(brand);
        }
    }
};

Theme.init = () => {
    Theme.Parameter.init();
};

module.exports = Theme;
/**
 *
 * Write a JavaScript method receiving an array of objects containing name+age+gender,
 * returning everyone between 30 and 40 years old grouped by gender. Keep it simple but reusable.
 * Create a secret gist (https://gist.github.com/) and paste the URL below. *
 */
(function () {
    var model = {},
        getDataForTest = function () {
            return [{}];
        },
        init = function () {
        };
    init();
})();