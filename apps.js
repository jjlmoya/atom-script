(() => {
    document.getElementById('kss-node').classList.add('clouds');
    document.getElementById('kss-node').classList.add('bs_theme');
    const initUtils = () => {
        require('./utils/state').init();
        require('./utils/tracking').basicEvents();
        require('./utils/color').init();
        require('./utils/socialMedia').init();
        require('./utils/exitIntent').init();
        require('./utils/replace').init();
        require('./theme/index').init();
    }, initServices = () => {
        require('./service/heading').init('.bs_anchor h2', '<span class="a-text--shadow a-text--uppercase a-pad--x-5">#</span>');
        require('./service/slider').init();
        require('./service/theme').init();
    };
    initUtils();
    initServices();
})();