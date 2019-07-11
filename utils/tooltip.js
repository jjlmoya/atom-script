const locators = {
    trigger: '.js_tooltip',
    tooltip: '.tooltip',
    close: '.tooltip__close'
}

const renderCloseElement = isFixed => isFixed ? '<a class="tooltip__close">X</a>' : ''

const open = (content, isFixed) => {
    const tooltip = `
        <div class="tooltip">
            ${renderCloseElement(isFixed)}
            <div class="tooltip__inner">${content}</div>
        </div>
    `
    document.body.insertAdjacentHTML('beforeend', tooltip)
}

const close = (tooltip) => {
    tooltip.remove()
}

const onClickBody = event => {
    const tooltip = document.querySelector(locators.tooltip)
    const isClickInside = event.target.closest(locators.tooltip)
    const clickedElement = event.target
    const triggerElement = document.querySelector(locators.trigger)
    const closeElement = document.querySelector(locators.close)

    if ((tooltip && !isClickInside && clickedElement !== triggerElement) || clickedElement === closeElement) {
        close(tooltip)
        document.removeEventListener('click', onClickBody)
    }
}
const bindEvents = (elements) => {
    elements.forEach((el) => {
        const content = el.dataset.content
        const isFixed = el.dataset.fixed

        if (isFixed) {
            el.addEventListener('click', function (event) {
                const tooltip = document.querySelector(locators.tooltip)
                if (!tooltip) open(content, isFixed)
                if (tooltip) close(tooltip)
                document.addEventListener('click', onClickBody)
            })
        } else {
            el.addEventListener('mouseover', function (event) {
                const tooltip = document.querySelector(locators.tooltip)
                const content = el.dataset.content
                const isFixed = el.dataset.fixed
                if (!tooltip) open(content, isFixed)
            })

            el.addEventListener('mouseout', function (event) {
                const tooltip = document.querySelector(locators.tooltip)
                if (tooltip) close(tooltip)
            })
        }
    })
}

const init = () => {
    const elements = document.querySelectorAll(locators.trigger)
    if (elements) bindEvents(elements)
}

export default init()
