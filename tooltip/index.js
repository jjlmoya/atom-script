import {tooltipTemplates} from "./templates";

const locators = {
    trigger: '.bs_tooltip',
    tooltip: '.bs_tooltip_content'
};

const getTooltipTemplate = (content, template) => {
    try {
        return tooltipTemplates[template ? template : 'default'](content);
    } catch (e) {
        console.error(`Error: Template "${template}" not found`);
        return tooltipTemplates['default'](content);
    }
};

const openTooltip = (settings, target) => {
    target.insertAdjacentHTML('beforeend', getTooltipTemplate(settings.content, settings.template));
};

const closeTooltip = (tooltip) => {
    if (tooltip) {
        tooltip.remove();
    }
};

const onClickBody = event => {
    const tooltip = document.querySelector(locators.tooltip),
        isClickInside = event.target.closest(locators.tooltip),
        clickedElement = event.target,
        triggerElement = document.querySelector(locators.trigger);
    if (tooltip && !isClickInside && clickedElement !== triggerElement) {
        closeTooltip(tooltip);
        document.removeEventListener('click', onClickBody);
    }
};

const getSettings = el => el.dataset;

const onMouseOut = event => {
    closeTooltip(document.querySelector(locators.tooltip));
    event.target.removeEventListener('mouseout', onMouseOut);
};
const triggerTooltip = (event) => {
    const tooltip = document.querySelector(locators.tooltip),
        isClickEvent = event.type === 'click',
        isHoverEvent = event.type === 'mouseover',
        target = event.target;

    closeTooltip(tooltip);
    openTooltip(getSettings(target), event.target);

    if (isClickEvent) {
        document.addEventListener('click', onClickBody);
    }
    if (isHoverEvent) {
        target.addEventListener('mouseout', function () {
            closeTooltip(document.querySelector(locators.tooltip));
        });
    }

};

const bindEvents = (elements) => {
    elements.forEach((el) => {
        const settings = getSettings(el);
        if (settings.mode === 'click') {
            el.addEventListener('click', triggerTooltip);
        }
        if (settings.mode === 'hover') {
            el.addEventListener('mouseover', triggerTooltip);
        }
    });
};

(() => {
    bindEvents([...document.querySelectorAll(locators.trigger)]);
})();