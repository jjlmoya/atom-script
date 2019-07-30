import './state/index';
import CSSSlider from 'css-slider';
import './tracking/index';
import './social/index';
import './theme/index';
import './social/index';
import './utils/exitIntent';
import './image/replace';
import './heading/anchor';
import './tooltip/index';
import './splash/index';

(() => {
    [...document.querySelectorAll('.bs_slider')].forEach((slider) => {
        new CSSSlider(slider, slider.dataset);
    });
})();