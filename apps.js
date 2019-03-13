var stateUtils = require('./utils/state'),
    trackingUtils = require('./utils/tracking'),
    colorsUtil = require('./utils/color');

(function () {
    var init = function () {
        stateUtils.init();
        trackingUtils.basicEvents();
        colorsUtil.init();
    };
    init();
})();

