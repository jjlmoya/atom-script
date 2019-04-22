var Theme = Theme || {};
Utils = require('../utils/misc');
Theme.Parameter = {
    model: {
        storageKey: 'bonseo_theme',
    },
    getLocalBrand: function () {
        return localStorage.getItem(this.model.storageKey);
    },
    init: function () {
        const parameters = Utils.searchToObject(window.location.search),
            brand = parameters.brand || this.getLocalBrand();
        if (brand) {
            document.body.className = '';
            document.body.classList.add(brand);
        }
    }
};

Theme.init = () => {
    Theme.Parameter.init();
};

module.exports = Theme;
