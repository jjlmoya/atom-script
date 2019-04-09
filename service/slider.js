module.exports = {
    locators: {
        parent: '.bs_slider',
        content: '.bs_slider_content',
        slide: '.bs_slide',
        button: '.bs_slider_button'
    },
    bindScrollEvents: function () {
        var that = this,
            sliders = document.querySelectorAll(this.locators.content),
            slideClass = this.locators.slide;
        sliders.forEach(function (slider) {
            slider.addEventListener('scroll', function (e) {
                let slides = e.target.querySelectorAll(slideClass),
                    buttons = that.getSliderButtons(e.target) || [],
                    activeIndex = that.getActiveSlider(slides, e.target);
                that.removeActiveClass(that.locators.slide);
                slides[activeIndex].classList.add('is-active');
                if (buttons.length > 0) {
                    that.removeActiveClass(that.locators.button);
                    buttons[activeIndex].classList.add('is-active');
                }
            });
        });
    },

    removeActiveClass: function (locator) {
        const element = document.querySelector(locator + '.is-active');
        if (!!element) {
            element.classList.remove('is-active');
        }

    },

    getSliderButtons: function (target) {
        const parent = target.closest(this.locators.parent);
        if (!!parent) {
            return parent.querySelectorAll(this.locators.button);
        }
    },
    getActiveSlider: function (slides, parent) {
        const slidesLength = slides.length,
            scrolled = parent.scrollLeft,
            totalScroll = parent.scrollWidth,
            slideWidth = totalScroll / slidesLength;
        return Math.floor(scrolled / (slideWidth - (slideWidth / 10)));

    },
    init: function () {
        this.bindScrollEvents(this.locators.trigger);
    },
};