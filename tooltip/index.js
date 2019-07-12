const locators = {
    trigger: '.bs_tooltip',
    tooltip: '.tooltip',
    close: '.tooltip__close'
}

const renderCloseElement = isFixed => isFixed ? '<a class="tooltip__close">X</a>' : ''

const openTooltip = (content, isFixed) => {
    const tooltip = `
        <div class="tooltip l-position--fixed">
            ${renderCloseElement(isFixed)}
            <div class="tooltip__inner">${content}</div>
        </div>
    `
    document.body.insertAdjacentHTML('beforeend', tooltip)
}

const closeTooltip = (tooltip) => {
    tooltip.remove()
}

const onClickBody = event => {
    const tooltip = document.querySelector(locators.tooltip)
    const isClickInside = event.target.closest(locators.tooltip)
    const clickedElement = event.target
    const triggerElement = document.querySelector(locators.trigger)
    const closeElement = document.querySelector(locators.close)

    if ((tooltip && !isClickInside && clickedElement !== triggerElement) || clickedElement === closeElement) {
        closeTooltip(tooltip)
        document.removeEventListener('click', onClickBody)
    }
}
const bindEvents = (elements) => {
    elements.forEach((el) => {
        const content = el.dataset.content;
        const isFixed = el.dataset.fixed;

        if (isFixed) {
            el.addEventListener('click', function () {
                const tooltip = document.querySelector(locators.tooltip)
                if (!tooltip) openTooltip(content, isFixed)
                if (tooltip) closeTooltip(tooltip)
                document.addEventListener('click', onClickBody)
            })
        } else {
            el.addEventListener('mouseover', function () {
                const tooltip = document.querySelector(locators.tooltip)
                const content = el.dataset.content
                const isFixed = el.dataset.fixed
                if (!tooltip) openTooltip(content, isFixed)
            })

            el.addEventListener('mouseout', function () {
                const tooltip = document.querySelector(locators.tooltip)
                if (tooltip) closeTooltip(tooltip)
            })
        }
    })
}

const init = () => {
    bindEvents([...document.querySelectorAll(locators.trigger)])
}

export default init()
