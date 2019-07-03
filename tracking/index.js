const model = {
    acc: 0,
    stepsInSeconds: 30,
    scroll: {
        scroll25: false,
        scroll50: false,
        scroll75: false,
        scroll100: false
    }
};

const trackEvent = (eventLabel, eventAction, eventCategory, eventValue) => {
    if (window.location.href.indexOf('://localhost') > -1) {
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
};

const timeEvent = sessionTime => {
    trackEvent(window.location.href, 'Reading', 'Session Time', sessionTime);
};

const scrollDepthEvent = percent => {
    if (!model.scroll['scroll' + percent]) {
        trackEvent(window.location.href, 'scrolled ' + percent, 'Scroll', percent);
        model.scroll['scroll' + percent] = true;
    }
};

const getScrollPercent = () => {
    let h = document.documentElement,
        b = document.body,
        st = 'scrollTop',
        sh = 'scrollHeight';
    return Math.round((h[st] || b[st]) / ((h[sh] || b[sh]) - h.clientHeight) * 100);
};

const scrollDepthEventListener = () => {
    document.addEventListener('scroll', () => {
        let percent = getScrollPercent();
        if (percent % 25 === 0 && percent !== 0) {
            scrollDepthEvent(percent);
        }
    });
};

const bindClickEvents = () => {
    document.addEventListener('click', e => {
        if (e.target.matches('a, button')) {
            trackEvent(window.location.href, 'Click: ' + e.target.innerText, 'Click Event', model.acc);
        }
    });
};

(() => {
    setInterval(() => {
        model.acc += model.stepsInSeconds;
        timeEvent(model.acc);
    }, model.stepsInSeconds * 1000);
    scrollDepthEventListener();
    bindClickEvents();
})();

export default {trackEvent};