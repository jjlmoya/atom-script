import {stringToSlug} from '../utils/misc';

export class ContentTable {
    constructor(e, selectors) {
        this.contentTable = e;
        this.selectors = selectors || 'h2';
        this.settings = e.dataset || {};
        this.targetElements = document.querySelectorAll(this.selectors);
        this.list = this.contentTable.querySelector(e.dataset.list) || this.contentTable;
        this.renderAnchors();
    }

    renderAnchors() {
        this.fillContainer();
    }

    createPrepend(element, slug) {
        let prepend = document.createElement('SPAN');
        if (this.settings.prepend) {
            prepend.classList.add(...this.settings.prepend.split(' '));
        }
        prepend.id = slug;
        return prepend;
    }

    fillContainer() {
        this.list.innerHTML = [...this.targetElements].map((element) => {
            let html = element.innerText,
                slug = stringToSlug(html);
            element.innerHTML = html;
            element.append(this.createPrepend(element, slug));
            element.classList.add('l-position');
            return this.anchorLink(slug, html, this.settings.linkClass);
        }).join(' ');
    }

    anchorLink(id, html, linkClass) {
        return `<li><a class="${linkClass}" href="#${id}">${html}</a></li>`;
    }
}

export const ContentTableLocator = '.bs_anchor_container';

