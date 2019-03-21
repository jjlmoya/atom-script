module.exports = {
    locators: {
        trigger: 'bs_exit_intent'
    },
    model: {
        localStorage: 'budget-exit-intent',
        dayInMilisec: 24 * 60 * 60 * 1000
    },

    isMouseOutside: function (e) {
        return e.clientY < 0;
    },

    getShowedDay: function () {
        var registeredDate = localStorage.getItem(this.model.localStorage);
        console.log(typeof(registeredDate));
        registeredDate = registeredDate ?
            new Date(parseInt(registeredDate)) : new Date(0);
        return registeredDate;
    },

    isDateOldEnough: function (today, register, maxDays) {
        return (today.getTime() - register.getTime()) / (this.model.dayInMilisec * maxDays) > 1;
    },
    modalRulesPass: function (settings) {
        console.log(settings);
        return this.isDateOldEnough(new Date(), this.getShowedDay(), settings.every);
    },
    triggerExitIntent: function (element) {
        var settings = element.dataset;
        var that = this;
        document.addEventListener("mouseleave", function (event) {
            if (that.isMouseOutside(event) &&
                that.modalRulesPass(settings)) {
                localStorage.setItem('budget-exit-intent', new Date().getTime());
                setTimeout(function () {
                    document.getElementsByClassName(settings.popup)[0].classList.add('is-active');
                }, settings.exitDelay);

            }
        }, false);
    },
    init: function () {
        var elements = document.getElementsByClassName(this.locators.trigger);
        if (elements.length > 0) {
            this.triggerExitIntent(elements[0]);
        }
    },
};