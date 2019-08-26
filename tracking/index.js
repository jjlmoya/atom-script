export class Tracking {
    constructor() {
        this.acc = 0;
        this.stepsInSeconds = 30;
        this.scroll = {
            scroll25: false,
            scroll50: false,
            scroll75: false,
            scroll100: false
        };
        this.isLocal = window.location.href.indexOf('://localhost') > -1;
        setInterval(() => {
            this.acc += this.stepsInSeconds;
            this.timeEvent(this.acc);
        }, this.stepsInSeconds * 1000);
        this.scrollDepthEventListener();
        this.bindClickEvents();
    }

    trackEvent(eventLabel, eventAction, eventCategory, eventValue) {
        if (this.isLocal) {
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
    }

    timeEvent(sessionTime) {
        this.trackEvent(window.location.href, 'Reading', 'Session Time', sessionTime);
    }

    scrollDepthEvent(percent) {
        if (!this.scroll['scroll' + percent]) {
            this.trackEvent(window.location.href, 'scrolled ' + percent, 'Scroll', percent);
            this.scroll['scroll' + percent] = true;
        }
    }

    getScrollPercent() {
        let h = document.documentElement,
            b = document.body,
            st = 'scrollTop',
            sh = 'scrollHeight';
        return Math.round((h[st] || b[st]) / ((h[sh] || b[sh]) - h.clientHeight) * 100);
    }

    scrollDepthEventListener() {
        document.addEventListener('scroll', () => {
            let percent = this.getScrollPercent();
            if (percent % 25 === 0 && percent !== 0) {
                this.scrollDepthEvent(percent);
            }
        });
    }

    bindClickEvents() {
        document.addEventListener('click', ({target}) => {
            if (target.matches('a, button')) {
                this.trackEvent(
                    window.location.href,
                    'Click: ' + target.innerText,
                    'Click Event',
                    this.acc);
            }
        });
    }
}