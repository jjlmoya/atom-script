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

const scrollToElement = (slider, index) => {
    console.log(index);
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

const onClickArrow = ({target}) => {
    let slider = target.closest(locators.content);
    let slides = slider.querySelectorAll(locators.slide);
    let direction = target.dataset.right ? 2 : 0;

    scrollToElement(slider, (getActiveSlider(slides, slider) + direction));

};

const bindArrowsEvent = () => {
    let sliders = document.querySelectorAll(locators.content);
    sliders.forEach(function (slider) {
        slider.addEventListener('click', onClickArrow);
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
    bindArrowsEvent();
})();
