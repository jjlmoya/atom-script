import {stringToSlug} from '../utils/misc';

const locators = {
    container: 'bs_anchor_container'
};

const renderAnchors = (elements, prepend) => {
    fillContainer(document.getElementsByClassName(locators.container), elements, prepend);
};

const fillContainer = (containers, elements) => {
    [...containers].forEach((container) => {
        let settings = container.dataset;

        container.innerHTML = [...elements].map((element) => {
            let prepend = document.createElement('SPAN'),
                slug = stringToSlug(element.innerText),
                html = element.innerText;
            prepend.classList.add('a-text--shadow','a-text--uppercase', 'a-pad--x-5', 'l-position--absolute', 'l-position--absolute--anchor');
            prepend.id = slug;
            element.innerHTML = html;
            element.append(prepend);
            element.classList.add('l-position');
            return anchorLink(slug, html, settings.linkClass);
        }).join(' ');

    });
};

const anchorLink = (id, html, linkClass) => `<a class="${linkClass}" href="#${id}">${html}</a>`;

const getHeadingElements = selectors => document.querySelectorAll(selectors);

(() => {
    let selector = '.bs_anchor h2, .bs_anchor h3';
    renderAnchors(getHeadingElements(selector));
})();