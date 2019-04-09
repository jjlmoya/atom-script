module.exports = {
    locators: {
        trigger: '.bs_slider'
    },
    bindScrollEvents: (trigger) => {
        var sliders = document.querySelectorAll(trigger);
        sliders.forEach(function (slider) {
            slider.addEventListener('scroll', function (e) {
                console.log('scrolling element: %o', e);
            });
        });
    },
    init: function () {
        this.bindScrollEvents(this.locators.trigger);
    },
};