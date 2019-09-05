import './state/index';
import './social/index';
import './theme/index';
import './social/index';
import './service/exitintent.service';
import './service/replace.service';
import './tooltip/index';

import {Tracking} from './tracking/index';
import {initTooltips} from './tooltip/index';
import {SliderDefaultLocator, CSSSlider} from "css-slider";
import {ContentTable, ContentTableLocator} from './components/anchor.component';
import {SplashLocator, SplashScreen} from './components/splash.component';


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
        initTooltips();
        new Tracking();
    };
    init();
})();


