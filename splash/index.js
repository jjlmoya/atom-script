const locators = {
    trigger: 'bs_splash_screen',
    activeClass: 'is-loaded'
};

const removeSplashScreen = () => {
    [...document.getElementsByClassName(locators.trigger)].forEach(e => {
        e.classList.add(locators.activeClass);
    });
};

(() => {
    setTimeout(removeSplashScreen, 200);
})();