const locators = {
    parent: '.bs_slider',
    content: '.bs_slider_content',
    slide: '.bs_slide',
    button: '.bs_slider_button',
};


const getScrollDirection = (lastScroll, currentScroll) => !!lastScroll & lastScroll > currentScroll ? 'left' : 'right';
const getNextSlide = (index, direction) => index + (direction === 'left' ? 0 : 2);

const onScroll = (slider, slideClass) => {
    let slides = slider.querySelectorAll(slideClass),
        buttons = getSliderButtons(slider) || [],
        activeIndex = getActiveSlider(slides, slider),
        direction = getScrollDirection();
    slider.dataset.lastScroll = slider.scrollLeft;
    removeActiveClass(locators.slide);
    slides[activeIndex].classList.add('is-active');
    if (buttons.length > 0) {
        removeActiveClass(locators.button);
        buttons[activeIndex].classList.add('is-active');
    }
    //scrollToElement(slider, getNextSlide(activeIndex, direction));
};

const scrollToElement = (slider, index) => {
    console.log(slider, index);
    let slideWith = slider.querySelector(locators.slide).scrollWidth,
        targetScroll = slideWith * (index - 1);
    slider.scrollLeft = targetScroll > slider.scrollWidth ? 0 : targetScroll;
};

const bindScrollEvents = (slider) => {
    let slideClass = locators.slide;
    slider.addEventListener('scroll', function (e) {
        onScroll(e.target, slideClass);
    });
    onScroll(slider, slideClass);
};

const onClickArrow = ({target}) => {
    let slider = target.closest(locators.parent).querySelector(locators.content);
    let slides = slider.querySelectorAll(locators.slide);
    scrollToElement(slider, getNextSlide(getActiveSlider(slides, slider), target.dataset.direction));

};

const bindArrowsEvent = (slider) => {
    let arrows = slider.querySelectorAll(slider.dataset.arrow) || slider.querySelectorAll(locators.content);
    [...arrows].forEach((arrow) => {
        arrow.addEventListener('click', onClickArrow);
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
const bindAutoPlay = (slider, autoplay) => {
    if (autoplay) {
        setInterval(() => {
            let slides = slider.querySelectorAll(locators.slide);
            let sliderContent = slider.querySelector(locators.content);
            scrollToElement(sliderContent, getNextSlide(getActiveSlider(slides, sliderContent), 'right'));
        }, parseInt(autoplay));
    }
};
(() => {
    let sliders = document.querySelectorAll(locators.parent);
    sliders.forEach((slider) => {
        bindScrollEvents(slider);
        bindArrowsEvent(slider);
        bindAutoPlay(slider, slider.dataset.autoplay);
    });
})();