import {stringToSlug} from '../utils/misc';

const locators = {
    container: 'bs_anchor_container'
};

const renderAnchors = (elements, prepend) => {
    fillContainer(document.getElementsByClassName(locators.container), elements, prepend);
};

const fillContainer = (containers, elements, prepend) => {
    [...containers].forEach((container) => {
        let settings = container.dataset;
        container.innerHTML = [...elements].map((element) => {
            let slug = stringToSlug(element.innerText),
                html = element.innerHTML;
            element.id = slug;
            element.innerHTML = prepend + html;
            return anchorLink(slug, html, settings.linkClass);
        }).join(' ');

    });
};

const anchorLink = (id, html, linkClass) => {
    return `<a class="${linkClass}" href="#${id}">${html}</a>`;
};

const getHeadingElements = selectors => document.querySelectorAll(selectors);

(() => {
    let selector = '.bs_anchor h2',
        prepend = '<span class="a-text--shadow a-text--uppercase a-pad--x-5"></span>';
    var elements = getHeadingElements(selector);
    renderAnchors(elements, prepend);
})();