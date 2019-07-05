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
    elements.forEach(element => {
        console.log(window.getComputedStyle(element)[locators.styleTarget]);
        console.log(RGBToHex(window.getComputedStyle(element)[locators.styleTarget]).toUpperCase());
        element.innerHTML = `
            <span class='a-color--replaced'>
                ${RGBToHex(window.getComputedStyle(element)[locators.styleTarget]).toUpperCase()}
            </span>`;
    });
};

(() => {
    replaceColors([... document.getElementsByClassName(locators.trigger)]);
})();