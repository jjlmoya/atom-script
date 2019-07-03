import './state/index';
import './slider/index';
import './tracking/index';

(() => {
    const initUtils = () => {
        require('./utils/color').init();
        require('./utils/socialMedia').init();
        require('./utils/exitIntent').init();
        require('./utils/replace').init();
        require('./theme/index').init();
    }, initServices = () => {
        require('./service/heading').init('.bs_anchor h2', '<span class="a-text--shadow a-text--uppercase a-pad--x-5">#</span>');
        require('./service/theme').init();
    };
    initUtils();
    initServices();
})();


