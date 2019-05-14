module.exports = {
    locators: {
        trigger: 'bs_theme',
        button: 'bs_theme_button'
    },
    model: [],
    renderControl: function (themes) {
        let renderElements = themes.map((theme) => {
            return `<div class="${theme} a-bg ${this.locators.button} u-pointer" 
                        data-theme="${theme}"
                        style="width:25px; height: 25px; border-radius: 50%"></div>`;
        }).join('');
        return `<div class="l-position--absolute l-flex">${renderElements}</div>`;
    },
    getThemes: function (next) {
        next(
            [
                'aviator',
                'diable',
                'forest',
                'kino',
                'lime-sports',
                'lollipop',
                'mint',
                'paradise-orange',
                'purple-skies',
                'reverse-sky',
                'sky'
            ]);
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
    addColorThemeAction: function () {
        var that = this, elements = document.querySelectorAll('.' + this.locators.button);
        for (var i = 0; i < elements.length; i++) {
            elements[i].addEventListener('click', (e) => {
                that.actionTheme(e)
            });
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