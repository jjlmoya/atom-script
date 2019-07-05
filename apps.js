import './state/index';
import './slider/index';
import './tracking/index';
import './social/index';
import './theme/index';
import './social/index';
import './utils/exitIntent';

(() => {
    const initUtils = () => {
        require('./utils/replace').init();
    }, initServices = () => {
        require('./service/heading').init('.bs_anchor h2', '<span class="a-text--shadow a-text--uppercase a-pad--x-5">#</span>');
    };
    initUtils();
    initServices();
})();


