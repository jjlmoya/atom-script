module.exports = {
    slugify: function(str) {
        str = str.replace(/^\s+|\s+$/g, ''); // trim
        str = str.toLowerCase();

        // remove accents, swap ñ for n, etc
        var from = "ÁÄÂÀÃÅČÇĆĎÉĚËÈÊẼĔȆÍÌÎÏŇÑÓÖÒÔÕØŘŔŠŤÚŮÜÙÛÝŸŽáäâàãåčçćďéěëèêẽĕȇíìîïňñóöòôõøðřŕšťúůüùûýÿžþÞĐđßÆa·/_,:;";
        var to   = "AAAAAACCCDEEEEEEEEIIIINNOOOOOORRSTUUUUUYYZaaaaaacccdeeeeeeeeiiiinnooooooorrstuuuuuyyzbBDdBAa------";
        for (var i=0, l=from.length ; i<l ; i++) {
            str = str.replace(new RegExp(from.charAt(i), 'g'), to.charAt(i));
        }

        str = str.replace(/[^a-z0-9 -]/g, '') // remove invalid chars
            .replace(/\s+/g, '-') // collapse whitespace and replace by -
            .replace(/-+/g, '-'); // collapse dashes

        return str;
    },
    renderAnchors: function (elements, prepend) {
        console.log(elements);
        for (var i = 0; i < elements.length; i++) {
            elements[i].id = this.slugify(elements[i].innerText);
            elements[i].innerHTML = prepend + elements[i].innerHTML;
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