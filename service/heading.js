module.exports = {
    locators: {
        container: 'bs_anchor_container'
    },
    slugify: (str) => {
        str = str.replace(/^\s+|\s+$/g, ''); // trim
        str = str.toLowerCase();
        var from = "ÁÄÂÀÃÅČÇĆĎÉĚËÈÊẼĔȆÍÌÎÏŇÑÓÖÒÔÕØŘŔŠŤÚŮÜÙÛÝŸŽáäâàãåčçćďéěëèêẽĕȇíìîïňñóöòôõøðřŕšťúůüùûýÿžþÞĐđßÆa·/_,:;";
        var to = "AAAAAACCCDEEEEEEEEIIIINNOOOOOORRSTUUUUUYYZaaaaaacccdeeeeeeeeiiiinnooooooorrstuuuuuyyzbBDdBAa------";
        for (var i = 0, l = from.length; i < l; i++) {
            str = str.replace(new RegExp(from.charAt(i), 'g'), to.charAt(i));
        }
        str = str.replace(/[^a-z0-9 -]/g, '') // remove invalid chars
            .replace(/\s+/g, '-') // collapse whitespace and replace by -
            .replace(/-+/g, '-'); // collapse dashes
        return str;
    },
    renderAnchors: function (elements, prepend) {
        var containerHTML = '',
            container = document.getElementsByClassName(this.locators.container),
            settings = container.length > 0 ? container[0].dataset : {};
        if (!elements.length && container.length > 0) {
            var parent = container[0].closest('.' + settings.parent);
            parent.style.display = 'none';
        }
        for (var i = 0; i < elements.length; i++) {
            var id = this.slugify(elements[i].innerText),
                html = elements[i].innerHTML;
            elements[i].id = id;
            elements[i].innerHTML = prepend + html;
            containerHTML += this.anchorLink(id, html, settings);
        }
        this.fillContainer(container, containerHTML);
    },
    fillContainer: (container, html) => {
        if (container.length > 0) {
            container[0].innerHTML = html;
        }
    },
    anchorLink: (id, html, settings) => {
        let linkClass = settings.linkClass;
        return '<a class="' + linkClass + '" href="#' + id + '">' + html + '</a>';
    },
    getHeadingElements: (selector) => {
        return document.querySelectorAll(selector);
    },
    init: function (selector, prepend) {
        var elements = this.getHeadingElements(selector);
        this.renderAnchors(elements, prepend);
    }
};