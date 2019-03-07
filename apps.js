var stateUtils = require('./utils/state'),
    trackingUtils = require('./utils/tracking');

(function () {
    var init = function () {
        stateUtils.init();
        trackingUtils.basicEvents();
    };
    init();
})();

