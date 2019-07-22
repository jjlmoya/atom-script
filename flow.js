import {Offers, Button} from './project/mv/html';
import {GetCategories, GetSubcategories, GetOffers, GetFilters} from './project/mv/services';

const locators = {
    categories: '.bs_step_categories',
    subcategories: '.bs_step_subcategories',
    filters: '.bs_step_filters',
    offers: '.bs_step_offers',
    content: '.bs_step_content',
};

const levels = [
    'categories',
    'subcategories',
    'filters'
];
const model = {
    categories: [],
    subcategories: [],
    filters: [],
    offers: []
};

const renderButton = (button) => Button(button);

const renderButtons = () => {
    levels.forEach((level) => {
        console.log(level);
        console.log(model);
        console.log(model[level]);
        let html = model[level].map(button => renderButton(button)).join('');
        document.querySelector(locators[level]).innerHTML = html;
    });
};

const renderOffer = (offer, position) => Offers(offer, (position + 1) % 4 === 1);

const renderOfferList = (offers) =>
    offers.map((offer, index) => {
        renderOffer(offer, index);
    }).join(' ');

const renderOffers = (filteredOffers) => {
    document.querySelector(locators.content).innerHTML = renderOfferList(filteredOffers ? filteredOffers : model.offers);
};

const renderPage = () => {
    document.querySelector('.og-banner-screen').classList.remove('is-active');
    renderOffers();
    renderButtons();
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

const getFormatOffers = offers => offers.map((offer) => {
    let categories = getCategoriesByOffer(offer);
    return {
        name: offer.name,
        bhc: offer.bhc,
        categories: categories,
        subcategories: []
    };
});

const init = async () => {
    model.offers = await getFormatOffers(GetOffers());
    model.categories = await GetCategories();
    model.subcategories = await GetSubcategories();
    model.filters = await GetFilters();
    renderPage();
};
init();