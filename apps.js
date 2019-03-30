(function () {
    var initUtils = function () {
        require('./utils/state').init();
        require('./utils/tracking').basicEvents();
        require('./utils/color').init();
        require('./utils/socialMedia').init();
        require('./utils/exitIntent').init();
    }, initServices = function () {
        require('./service/heading').init('.bs_anchor h2', '<span class="a-text--shadow a-text--uppercase">#</span>');
    };
    initUtils();
    initServices();
})();

