import './state/index';
import {SliderDefaultLocator, CSSSlider} from "css-slider";
import './tracking/index';
import './social/index';
import './theme/index';
import './social/index';
import './utils/exitIntent';
import './image/replace';
import './heading/anchor';
import './tooltip/index';
import {SplashLocator, SplashScreen} from './splash/index';


(function () {
    const removeSplashScreen = () => {
        [...document.querySelectorAll(SplashLocator.trigger)].forEach((splash) => {
            new SplashScreen(splash).removeSplashScreen();
        })
    };
    const initSliders = () => {
        [...document.querySelectorAll(SliderDefaultLocator)].forEach((slider) => {
            new CSSSlider(slider, slider.dataset);
        });
    };
    const init = () => {
        removeSplashScreen();
        initSliders();
    };
    init();
})();