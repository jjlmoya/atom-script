const locators = {
    image: '.bs_image_replace'
};

const replaceImage = (target, element) => {
    document.querySelector(target).src = element.src;
};

const onImageClick = e => {
    const element = e.target,
        targetClass = element.dataset.target;
    if (targetClass) {
        replaceImage(targetClass, element);
    }
};
const bindReplace = (elements) => {
    elements.forEach((element) => {
        element.addEventListener('click', onImageClick);
    });
};

(() => {
    bindReplace(document.querySelectorAll(locators.image));
})();

