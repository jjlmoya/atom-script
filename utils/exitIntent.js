module.exports = {
    locators: {
        trigger: 'bs_exit_intent'
    },
    model: {
        localStorage: 'budget-exit-intent',
        activated: false,
        dayInMilisec: 24*60*60*1000
    },

    isMouseOutside: function (e) {
        return e.clientY < 0;
    },

    getShowedDay: function () {
        var registeredDate = localStorage.getItem(this.model.localStorage)
        registeredDate = registeredDate ? new Date(registeredDate) : new Date(0);
        return registeredDate;
    },
    isDateOldEnough: function (today, register, maxDays) {
        return today.getTime() - (maxDays * model.dayInMilisec) - register.getTime() < 0;
    },
    modalRulesPass: function (settings) {
       // return this.isDateOldEnough(new Date(),this.getShowedDay(), maxDaysForShow());
        return true;
    },
    triggerExitIntent: function (element) {
        var settings = element.dataset;
        var that = this;
        document.addEventListener("mouseleave", function (event) {
            if (that.isMouseOutside(event) &&
                !that.model.activated &&
                that.modalRulesPass(settings)) {
                that.model.activated = true;
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