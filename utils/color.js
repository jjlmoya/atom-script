module.exports = {
    locators: {
        trigger: 'bs_color_replace',
        styleTarget: 'backgroundColor'
    },
    RGBToHex: function (orig) {
        if (!orig.replace) {
            return '';
        }
        var rgb = orig.replace(/\s/g, '').match(/^rgba?\((\d+),(\d+),(\d+)/i);
        return (rgb && rgb.length === 4) ? "#" +
            ("0" + parseInt(rgb[1], 10).toString(16)).slice(-2) +
            ("0" + parseInt(rgb[2], 10).toString(16)).slice(-2) +
            ("0" + parseInt(rgb[3], 10).toString(16)).slice(-2) : orig;
    },
    replaceColors: function (elements) {
        for (var i = 0; i < elements.length; i++) {
                elements[i].innerHTML = "<span class='a-color--replaced'>" + this.RGBToHex(window.getComputedStyle(elements[i])[this.locators.styleTarget]).toUpperCase() + "</span>";
        }
    },
    init: function () {
        var elements = document.getElementsByClassName(this.locators.trigger);
        if (elements.length > 0) {
            this.replaceColors(elements);
        }
    },
};