module.exports = {
    locators: {
        trigger: 'bs_theme',
        button: 'bs_theme_button'
    },
    model: [],
    renderControl: function (themes) {
        let renderElements = themes.map((theme) => {
            return `<div class="ml-theme-selector__item ${theme} a-bg ${this.locators.button} u-pointer u-layer-2" 
                        data-theme="${theme}"></div>`;
        }).join('');
        return `<div class="ml-theme-selector l-position--absolute l-flex">${renderElements}</div>`;
    },
    getThemes: function (next) {
        next(
            require('../config/index').Themes);
    },

    removeThemes: function (element) {
        this.model.themes.forEach((theme) => {
            element.classList.remove(theme);
        });
    },
    actionTheme: function (e) {
        var parent = e.target.closest('.' + this.locators.trigger);
        this.removeThemes(parent);
        parent.classList.add(e.target.dataset.theme);
    },
    bindActionToItem: function (elements, i, that) {
        elements[i].addEventListener('click', (e) => {
            that.actionTheme(e);
        });
    }, addColorThemeAction: function () {
        var that = this, elements = document.querySelectorAll('.' + this.locators.button);
        for (var i = 0; i < elements.length; i++) {
            this.bindActionToItem(elements, i, that);
        }
    },
    init: function () {
        let elements = document.getElementsByClassName(this.locators.trigger);
        if (!elements || elements.length === 0) return;
        this.getThemes((themes) => {
            let html = this.renderControl(themes);
            this.model.themes = themes;
            for (var i = 0; i < elements.length; i++) {
                elements[i].classList.add('l-position');
                var wrapper = document.createElement('div').innerHTML = elements[i].innerHTML + html;
                elements[i].innerHTML = wrapper;
            }
            this.addColorThemeAction();
        });
    }
};