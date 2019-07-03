const locators = {
    parent: '.bs_slider',
    content: '.bs_slider_content',
    slide: '.bs_slide',
    button: '.bs_slider_button',
};

const onScroll = (slider, slideClass) => {
    let slides = slider.querySelectorAll(slideClass),
        buttons = getSliderButtons(slider) || [],
        activeIndex = getActiveSlider(slides, slider);
    removeActiveClass(locators.slide);
    slides[activeIndex].classList.add('is-active');
    if (buttons.length > 0) {
        removeActiveClass(locators.button);
        buttons[activeIndex].classList.add('is-active');
    }
};

const bindScrollEvents = () => {
    let sliders = document.querySelectorAll(locators.content),
        slideClass = locators.slide;
    sliders.forEach(function (slider) {
        slider.addEventListener('scroll', function (e) {
            onScroll(e.target, slideClass);
        });
        onScroll(slider, slideClass);
    });
};

const removeActiveClass = locator => {
    const element = document.querySelector(locator + '.is-active');
    if (!!element) {
        element.classList.remove('is-active');
    }
};

const getSliderButtons = target => {
    const parent = target.closest(locators.parent);
    if (!!parent) {
        return parent.querySelectorAll(locators.button);
    }
};

const getActiveSlider = (slides, parent) => {
    const slidesLength = slides.length,
        scrolled = parent.scrollLeft,
        totalScroll = parent.scrollWidth,
        slideWidth = totalScroll / slidesLength;
    return Math.floor(scrolled / (slideWidth - (slideWidth / 10)));
};

(() => {
    bindScrollEvents(locators.trigger);
})();
