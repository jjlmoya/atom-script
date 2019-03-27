var stateUtils = require('./utils/state'),
    trackingUtils = require('./utils/tracking'),
    colorsUtil = require('./utils/color'),
    socialMedia = require('./utils/socialMedia'),
    exitIntent = require('./utils/exitIntent');

(function () {
    var init = function () {
        stateUtils.init();
        trackingUtils.basicEvents();
        colorsUtil.init();
        exitIntent.init();
        socialMedia.init();
    };
    init();
})();

