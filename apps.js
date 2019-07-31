import './state/index';
import {SliderDefaultLocator, CSSSlider} from "css-slider";
import './tracking/index';
import './social/index';
import './theme/index';
import './social/index';
import './utils/exitIntent';
import './image/replace';
import {ContentTable, ContentTableLocator} from './heading/anchor';
import './tooltip/index';
import {SplashLocator, SplashScreen} from './splash/index';


(function () {
    const removeSplashScreen = () => {
        [...document.querySelectorAll(SplashLocator.trigger)].forEach((splash) => {
            new SplashScreen(splash).removeSplashScreen();
        });
    };
    const initSliders = () => {
        [...document.querySelectorAll(SliderDefaultLocator)].forEach((slider) => {
            new CSSSlider(slider, slider.dataset);
        });
    };

    const initTableContent = () => {
        [...document.querySelectorAll(ContentTableLocator)].forEach((table) => {
            new ContentTable(table, 'h2');
        });
    };
    const init = () => {
        removeSplashScreen();
        initTableContent();
        initSliders();

    };
    init();
})();