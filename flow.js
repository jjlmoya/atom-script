import {Offers, Button} from './project/mv/html';
import {GetCategories, GetSubcategories, GetOffers, GetFilters} from './project/mv/services';
import {next} from './service/step';

const locators = {
    filter: 'bs_step_filter',
    filterSubcategory: 'bs_step_filter_subcategory',
    categoryContainer: '.bs_step_category',
    subCategory: '.bs_step_subcategory',
    title: '.bs_step_title',
    offers: '.bs_step_offers',
    content: '.bs_step_content',
    hideClass: 'u-hide'
};

let categories = [];
let subcategories = [];
let filters = [];
let offers = [];
const model = {
    activeCategory: '',
    activeSubcategory: '',
};

const renderButton = (button, isSubcategory) => Button(button, isSubcategory ? locators.filterSubcategory : locators.filter);

const getSubCategoriesByCategory = category => subcategories.filter(sub => sub.categories.join().indexOf(category) > -1);

const renderButtons = isSubcategory => {
    let buttons = isSubcategory ? getSubCategoriesByCategory(model.activeCategory) : categories;
    let html = buttons.map(category => renderButton(category, isSubcategory)).join(''),
        elementLocator = isSubcategory ? locators.subCategory : locators.categoryContainer;
    document.querySelector(elementLocator).innerHTML = html;
};

const getCategoryName = name => {
    try {
        let mergeCategories = Object.assign({}, categories, subcategories);
        return mergeCategories.filter({id: name}).concat(undefined).shift().cta;
    } catch (e) {
        return "";
    }
};

const renderTitle = () => {
    let title = `Las mejoras Ofertas <span class="a-text--brand--secondary">${model.activeCategory ? 'de ' : ''} ${getCategoryName(model.activeCategory)} ${getCategoryName(model.activeSubcategory)}</span>:`;
    document.querySelector(locators.title).innerHTML = title;
};

const renderOffer = (offer, position) => Offers(offer, (position + 1) % 4 === 1);

const renderOfferList = (offers) =>
    offers.map((offer, index) => {
        renderOffer(offer, index);
    }).join(' ');

const renderOffers = (filteredOffers) => {
    document.querySelector(locators.content).innerHTML = renderOfferList(filteredOffers ? filteredOffers : offers);
};

const showOfferContainers = () => {
    if (offers.length > 0) {
        document.querySelector(locators.offers).classList.remove(locators.hideClass);
    } else {
        document.querySelector(locators.offers).classList.add(locators.hideClass);
    }
};

const filterOffersByTag = (tag, filterOffers) => {
    let newOffers = filterOffers || offers;
    return newOffers.filter((offer) => offer.tags.join('').indexOf(tag) > -1);
};

const renderCategoryPage = () => {
    renderOffers();
    renderButtons();
    renderTitle();
    bindFilters('.' + locators.filter);
    showOfferContainers();
    next();
};

const renderSubCategoryPage = () => {
    var filteredOffers = filterOffersByTag(model.activeCategory);
    renderOffers(filteredOffers);
    renderButtons(true);
    renderTitle();
    bindFilters('.' + locators.filterSubcategory);
    showOfferContainers();
    next();
};

const renderProductPage = () => {
    var filteredOffers = filterOffersByTag(model.activeSubcategory, filterOffersByTag(model.activeCategory));
    renderOffers(filteredOffers);
    renderTitle();
    showOfferContainers();
    next();
};

const addFilter = (element, locator) => {
    var tag = element.dataset.tag;
    if (locator === locator.filterSubcategory) {
        model.activeSubcategory = tag;
        renderProductPage();
    } else {
        model.activeCategory = tag;
        renderSubCategoryPage();
    }
};

const onFilter = (element, parentLocator) => {
    element.addEventListener('mousedown', (e) => {
        addFilter(e.target.closest(parentLocator), parentLocator);
    });
};

const bindFilters = parentLocator => {
    document.querySelectorAll(parentLocator).forEach(function (element) {
        onFilter(element, parentLocator);
    });
};

const getCategoriesByOffer = (offer) => {
    let categories = [];

    if (offer.beach || offer.allin || offer.spa || offer.seapool) {
        categories.push('relax');
    }
    if (offer.thematic) {
        categories.push('party');
    }
    if (offer.gym) {
        categories.push('sport');
    }
    if (offer.animation || offer.kidpool) {
        categories.push('family');
    }
    if (offer.eco) {
        categories.push('eco');
    }
    if (offer.petfriendly) {
        categories.push('pet');
    }
    if (offer.onlyadults) {
        categories.push('adults');
    }
    return categories;
};

const getSubCategoriesByOffer = offer => [];

const getFormatOffers = offers => offers.map((offer) => {
    let categories = getCategoriesByOffer(offer);
    let subcategories = getSubCategoriesByOffer(offer);

    return {
        name: offer.name,
        bhc: offer.bhc,
        categories: categories,
        subcategories: subcategories
    };
});

const init = async () => {
    let offersElements = document.querySelectorAll(locators.offers);
    if (offersElements && offersElements.length > 0) {
        offers = await getFormatOffers(GetOffers());
        categories = await GetCategories(offers);
        subcategories = await GetSubcategories(categories);
        filters = await GetFilters();
        renderCategoryPage();
    }
};
init();