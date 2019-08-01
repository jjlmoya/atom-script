import {tooltipTemplates} from "./templates";
let locators = {
    trigger: '.bs_tooltip',
    tooltip: '.bs_tooltip_content'
};

export class Tooltip {
    constructor(el) {
        this.tooltipTrigger = el;
        this.settings = this.tooltipTrigger.dataset;
        this.bindEvents();
    }

    getTooltipTemplate() {
        const {template, content} = this.settings;
        try {
            return tooltipTemplates[template ? template : 'default'](content);
        } catch (e) {
            console.error(`Error: Template "${template}" not found`);
            return tooltipTemplates['default'](content);
        }
    }

    openTooltip() {
        this.tooltipTrigger
            .insertAdjacentHTML('beforeend', this.getTooltipTemplate());
    }

    closeTooltip() {
        const tooltip = document.querySelector(locators.tooltip);
        if (tooltip) {
            tooltip.remove();
        }
    }

    onClickBody(event) {
        const isClickInside = this.tooltipTrigger.closest(locators.tooltip),
            clickedElement = event.target,
            triggerElement = document.querySelector(locators.trigger);
        if (!isClickInside && clickedElement !== triggerElement) {
            this.closeTooltip();
            document.removeEventListener('click', this.onClickBody);
        }
    }

    onMouseOut() {
        this.closeTooltip();
        this.tooltipTrigger.removeEventListener('mouseout', this.onMouseOut);
    }

    triggerTooltip({type}) {
        this.closeTooltip();
        this.openTooltip();


        if (type === 'click') {
            document.addEventListener('click', this.onClickBody.bind(this));
        } else {
            this.tooltipTrigger.addEventListener('mouseout', this.onMouseOut.bind(this));
        }
    }

    bindEvents() {
        if (this.settings.mode === 'click') {
            this.tooltipTrigger.addEventListener('click', this.triggerTooltip.bind(this));
        }
        if (this.settings.mode === 'hover') {
            this.tooltipTrigger.addEventListener('mouseover', this.triggerTooltip.bind(this));
        }
    }
}

export const initTooltips = () => {
    [...document.querySelectorAll(locators.trigger)].forEach((tooltip) => {
        new Tooltip(tooltip);
    });
};

