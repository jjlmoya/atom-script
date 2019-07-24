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
    let slideWith = slider.querySelector(locators.slide).scrollWidth,
        targetScroll = slideWith * (index - 1);
    slider.scrollLeft = targetScroll > slider.scrollWidth ? 0 : targetScroll;
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
    console.log(target);
    let slider = target.closest(locators.parent).querySelector(locators.content);
    let slides = slider.querySelectorAll(locators.slide);
    let direction = target.dataset.direction === 'left' ? 0 : 2;

    scrollToElement(slider, (getActiveSlider(slides, slider) + direction));

};

const bindArrowsEvent = () => {
    let sliders = document.querySelectorAll(locators.parent);
    sliders.forEach(function (slider) {
        let arrows = slider.querySelectorAll(slider.dataset.arrow) || slider.querySelectorAll(locators.content);
        console.log(arrows);
        console.log(slider.dataset);
        [...arrows].forEach((arrow) => {
            console.log(arrow);
            arrow.addEventListener('click', onClickArrow);
        });
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