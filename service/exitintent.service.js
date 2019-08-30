const locators = {
    trigger: 'bs_exit_intent'
};
const model = {
    localStorage: 'budget-exit-intent',
    dayInMilisec: 24 * 60 * 60 * 1000
};

const isMouseOutside = (e) => {
    return e.clientY < 0;
};

const getShowedDay = () => {
    let registeredDate = localStorage.getItem(model.localStorage);
    registeredDate = registeredDate ?
        new Date(parseInt(registeredDate)) : new Date(0);
    return registeredDate;
};

const isDateOldEnough = (today, register, maxDays) => (today.getTime() - register.getTime()) / (model.dayInMilisec * maxDays) > 1;

const modalRulesPass = settings => isDateOldEnough(new Date(), getShowedDay(), settings.every);

const onMouseLeave = (event, settings) => {
    if (isMouseOutside(event) &&
        modalRulesPass(settings)) {
        localStorage.setItem(model.localStorage, new Date().getTime());
        setTimeout(() => {
            document.getElementsByClassName(settings.popup)[0].classList.add('is-active');
            document.body.classList.add('overflow-blocked');
        }, settings.exitDelay);

    }
};
const triggerExitIntent = element => {
    document.addEventListener("mouseleave", (event) => {
        onMouseLeave(event, element.dataset);
    }, false);
};

(() => {
    let elements = [...document.getElementsByClassName(locators.trigger)].slice(0, 1);
    if (elements.length > 0) {
        triggerExitIntent(elements[0]);
    }
})();

module.exports = {};