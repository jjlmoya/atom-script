const locators = {
    trigger: 'bs_theme',
    button: 'bs_theme_button'
};

const model = [];

const renderControl = themes => {
    let renderElements = themes.map((theme) => {
        return `<div class="ml-theme-selector__item ${theme} a-bg ${locators.button} u-pointer u-layer-2" 
                        data-theme="${theme}"></div>`;
    }).join('');
    return `<div class="ml-theme-selector l-position--absolute l-flex">${renderElements}</div>`;
};
const getThemes = next => {
    next(
        require('../config/index').Themes);
};

const removeThemes = element => {
    model.themes.forEach((theme) => {
        element.classList.remove(theme);
    });
};
const actionTheme = e => {
    var parent = e.target.closest('.' + locators.trigger);
    removeThemes(parent);
    parent.classList.add(e.target.dataset.theme);
};
const bindActionToItem = element => {
    element.addEventListener('click', (e) => {
        actionTheme(e);
    });
};

const addColorThemeAction = () => {
    [... document.querySelectorAll('.' + locators.button)].forEach((element) => {
        bindActionToItem(element);
    });
};
(() => {
    let elements = document.getElementsByClassName(locators.trigger);
    if (!elements || elements.length === 0) return;
    getThemes((themes) => {
        let html = renderControl(themes);
        model.themes = themes;
        [...elements].forEach((element) => {
            element.classList.add('l-position');
            let wrapper = document.createElement('div').innerHTML = element.innerHTML + html;
            element.innerHTML = wrapper;
        });
        addColorThemeAction();
    });
})();