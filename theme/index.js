import {Themes} from '../config/index';
import {searchToObject} from '../utils/misc';
import './color';

const model = {
    storageKey: 'bonseo_theme',
    themes: Themes
};

const getLocalBrand = () => localStorage.getItem(model.storageKey);
const removeActiveThemes = element => {
    if (element.className) {
        model.themes.forEach(function (theme) {
            element.classList.remove(theme);
        });
    }
};

(() => {
    const parameters = searchToObject(window.location.search),
        brand = parameters.brand || getLocalBrand();
    if (brand) {
        removeActiveThemes(document.body);
        document.body.classList.add(brand);
    }
})();




