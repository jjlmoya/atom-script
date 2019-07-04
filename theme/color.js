const locators = {
    trigger: 'bs_color_replace',
    styleTarget: 'backgroundColor'
};

const RGBToHex = orig => {
    if (!orig.replace) {
        return '';
    }
    var rgb = orig.replace(/\s/g, '').match(/^rgba?\((\d+),(\d+),(\d+)/i);
    return (rgb && rgb.length === 4) ? "#" +
        ("0" + parseInt(rgb[1], 10).toString(16)).slice(-2) +
        ("0" + parseInt(rgb[2], 10).toString(16)).slice(-2) +
        ("0" + parseInt(rgb[3], 10).toString(16)).slice(-2) : orig;
};

const replaceColors = elements => {
    [...elements].forEach(element => {
        element.innerHTML = `
            <span class='a-color--replaced'>
                ${RGBToHex(window.getComputedStyle(element)[locators.styleTarget]).toUpperCase()}
            </span>`;
    });
    for (var i = 0; i < elements.length; i++) {
        elements[i].innerHTML = "";
    }
};

(() => {
    var elements = document.getElementsByClassName(locators.trigger);
    if (elements.length > 0) {
        replaceColors(elements);
    }
})();