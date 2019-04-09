module.exports = {
    locators: {
        parent: '.bs_slider',
        content: '.bs_slider_content',
        slide: '.bs_slide',
        button: '.bs_slider_button'
    },
    onScroll: function (slider, slideClass) {
        let slides = slider.querySelectorAll(slideClass),
            buttons = this.getSliderButtons(slider) || [],
            activeIndex = this.getActiveSlider(slides, slider);
        this.removeActiveClass(this.locators.slide);
        slides[activeIndex].classList.add('is-active');
        if (buttons.length > 0) {
            this.removeActiveClass(this.locators.button);
            buttons[activeIndex].classList.add('is-active');
        }
    },

    bindScrollEvents: function () {
        var that = this,
            sliders = document.querySelectorAll(this.locators.content),
            slideClass = this.locators.slide;
        sliders.forEach(function (slider) {
            slider.addEventListener('scroll', function (e) {
                that.onScroll(e.target, slideClass);
            });
            that.onScroll(slider, slideClass);
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