const locators = {
    layer: 'bs_overflow_layer',
    bodyClass: 'overflow-blocked',
    activeClass: 'is-active'
};


const isOverflowLayerEnable = () => !!document.querySelector('.' + locators.layer);

const getLayer = () => {
    let overflowLayerDiv = document.createElement('DIV');
    overflowLayerDiv.classList.add(locators.layer);
    return overflowLayerDiv;
};

const toggleOverflowBlock = (state) => {
    document.body.classList.toggle(locators.bodyClass, state);
};

const onClickLayer = (component) => {
    component.classList.remove(locators.activeClass);
    HideOverflowLayer();
};

export const ShowOverflowLayer = (component) => {
    if (isOverflowLayerEnable()) return;
    let overflowLayer = getLayer();
    document.body.appendChild(overflowLayer);
    toggleOverflowBlock(true);
    overflowLayer.addEventListener('click', () => {
       onClickLayer(component);
    });
};

export const HideOverflowLayer = () => {
    [...document.querySelectorAll('.' + locators.layer)].forEach((e) => {
        e.remove();
    });
    toggleOverflowBlock();
};