module.exports = {
    locators: {
        trigger: 'bs_exit_intent'
    },
    model: {
        localStorage: 'budget-exit-intent',
        dayInMilisec: 24 * 60 * 60 * 1000
    },

    isMouseOutside: (e) => {
        return e.clientY < 0;
    },

    getShowedDay: () => {
        var registeredDate = localStorage.getItem(this.model.localStorage);
        console.log(typeof(registeredDate));
        registeredDate = registeredDate ?
            new Date(parseInt(registeredDate)) : new Date(0);
        return registeredDate;
    },

    isDateOldEnough: (today, register, maxDays) => {
        return (today.getTime() - register.getTime()) / (this.model.dayInMilisec * maxDays) > 1;
    },
    modalRulesPass: (settings) => {
        return this.isDateOldEnough(new Date(), this.getShowedDay(), settings.every);
    },
    triggerExitIntent: (element) => {
        var settings = element.dataset;
        var that = this;
        document.addEventListener("mouseleave", (event) => {
            if (that.isMouseOutside(event) &&
                that.modalRulesPass(settings)) {
                localStorage.setItem('budget-exit-intent', new Date().getTime());
                setTimeout(() => {
                    document.getElementsByClassName(settings.popup)[0].classList.add('is-active');
                    document.body.classList.add('overflow-blocked');
                }, settings.exitDelay);

            }
        }, false);
    },
    init: function() {
        var elements = document.getElementsByClassName(this.locators.trigger);
        if (elements.length > 0) {
            this.triggerExitIntent(elements[0]);
        }
    },
};