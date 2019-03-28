module.exports = {
    slugify: function (text) {
        return text.toString().toLowerCase()
            .replace(/\s+/g, '-')
            .replace(/[^\w\-]+/g, '')
            .replace(/\-\-+/g, '-')
            .replace(/^-+/, '')
            .replace(/-+$/, '');
    },
    renderAnchors: function (elements, prepend) {
        console.log(elements);
        for (var i = 0; i < elements.length; i++) {
            elements[i].id = this.slugify(elements[i].innerText);
            elements[i].prepend(prepend);
        }
    },
    getHeadingElements: function (selector) {
        return document.querySelectorAll(selector);
    },
    init: function (selector, prepend) {
        var elements = this.getHeadingElements(selector);
        this.renderAnchors(elements, prepend);
    }
};