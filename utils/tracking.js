module.exports = {
    model: {
        acc: 0,
        stepsInSeconds: 30,
        scroll: {
            scroll25: false,
            scroll50: false,
            scroll75: false

        }
    },
    trackEvent: (eventLabel, eventAction, eventCategory, eventValue) => {
        if (window.location.href.indexOf('http://localhost') > -1) {
            console.log('Analytics -> %o', {
                eventLabel: eventLabel,
                eventAction: eventAction,
                eventCategory: eventCategory,
                eventValue: eventValue
            });
        }
        if (window.ga) {
            ga('send', {
                hitType: 'event',
                eventCategory: eventCategory,
                eventAction: eventAction,
                eventLabel: eventLabel,
                eventValue: eventValue
            });
        }
        if (window.gtag) {
            gtag('event', eventAction, {
                'event_category': eventCategory,
                'event_label': eventLabel,
                'event_value': eventValue
            });
        }
    },
    timeEvent: (sessionTime) => {
        this.trackEvent(window.location.href, 'Reading', 'Session Time', sessionTime);
    },
    scrollDepthEvent: (percent) => {
        if (!this.model.scroll['scroll' + percent]) {
            this.trackEvent(window.location.href, 'scrolled ' + percent, 'Scroll', percent);
            this.model.scroll['scroll' + percent] = true;
        }

    },
    getScrollPercent: () => {
        var h = document.documentElement,
            b = document.body,
            st = 'scrollTop',
            sh = 'scrollHeight';
        return Math.round((h[st] || b[st]) / ((h[sh] || b[sh]) - h.clientHeight) * 100);
    },
    scrollDepthEventListener: () => {
        var that = this;
        document.addEventListener('scroll', () => {
            var percent = that.getScrollPercent();
            if (percent % 25 === 0 && percent !== 0) {
                that.scrollDepthEvent(percent);
            }
        });
    },
    bindClickEvents: () => {
        var that = this;
        document.addEventListener('click', (e) => {
            if (e.target.matches('a, button')) {
                that.trackEvent(window.location.href, 'button: ' + e.target.innerText, 'Click Event', that.model.acc);
            }
        });
    },
    basicEvents: function () {
        var that = this;
        setInterval(() => {
            that.model.acc += that.model.stepsInSeconds;
            that.timeEvent(that.model.acc);
        }, that.model.stepsInSeconds * 1000);
        this.scrollDepthEventListener();
        this.bindClickEvents();
    }
};