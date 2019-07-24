const locators = {
    parent: '.bs_slider',
    content: '.bs_slider_content',
    slide: '.bs_slide',
    button: '.bs_slider_button',
};


const getNextSlide = (index, direction) => index + (direction === 'left' ? 0 : 2);


const activeButton = (buttons, index) => {
    if (buttons.length > 0) {
        removeActiveClass(locators.button);
        buttons[index].classList.add('is-active');
    }
};

const toggleArrows = (index, slider) => {
    let sliderContent = slider.closest(locators.parent);
    let arrows = [...sliderContent.querySelectorAll(sliderContent.dataset.arrow)];
    if (!arrows.length) return;
    arrows.forEach((arrow) => {
        arrow.classList.remove('u-hide');
    });
    if (index === 0) {
        arrows.find((e) => {
            return e.dataset.direction === 'left';
        }).classList.add('u-hide');
    }
    if (index === sliderContent.querySelectorAll(locators.slide).length - 1) {
        arrows.find(({dataset}) => dataset.direction === 'right').classList.add('u-hide');
    }


};
const onScroll = (slider, slideClass) => {
    let slides = slider.querySelectorAll(slideClass),
        activeIndex = getActiveSlider(slides, slider);
    slider.dataset.lastScroll = slider.scrollLeft;
    removeActiveClass(locators.slide);
    slides[activeIndex].classList.add('is-active');
    activeButton(getSliderButtons(slider), activeIndex);
    toggleArrows(activeIndex, slider);

};

const scrollToElement = (slider, index) => {
    let slideWith = slider.querySelector(locators.slide).scrollWidth,
        targetScroll = slideWith * (index - 1);
    slider.scrollLeft = targetScroll > slider.scrollWidth ? 0 : targetScroll;
};

const bindScrollEvents = (slider) => {
    let contentSlider = slider.querySelector(locators.content);
    contentSlider.addEventListener('scroll', function (e) {
        onScroll(e.target, locators.slide);
    });
    onScroll(contentSlider, locators.slide);
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

const getSliderButtons = target => target.closest(locators.parent).querySelectorAll(locators.button) || [];

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