(function (PROJECT) {
    var locators = {
            filter: 'bs_step_filter',
            filterSubcategory: 'bs_step_filter_subcategory',
            categoryContainer: '.bs_step_category',
            subCategory: '.bs_step_subcategory',
            title: '.bs_step_title',
            offers: '.bs_step_offers',
            content: '.bs_step_content',
            hideClass: 'u-hide'
        },
        html = require(`./project/${PROJECT}/html`),
        data = {
            categories: require(`./project/${PROJECT}/category`),
            subcategories: require(`./project/${PROJECT}/subcategory`)
        },
        model = {
            activeCategory: '',
            activeSubcategory: '',
            offers: []
        },
        renderButton = function (button, isSubcategory) {
            return html.button(button, isSubcategory ? locators.filterSubcategory : locators.filter);
        },

        getSubCategoriesByCategory = function (category) {
            return data.subcategories.filter(function (sub) {
                return sub.categories.join().indexOf(category) > -1;
            });
        },
        renderButtons = function (isSubcategory) {
            var buttons = isSubcategory ? getSubCategoriesByCategory(model.activeCategory) : data.categories;
            var html = buttons.map(function (category) {
                    return renderButton(category, isSubcategory);
                }).join(''),
                elementLocator = isSubcategory ? locators.subCategory : locators.categoryContainer;
            document.querySelector(elementLocator).innerHTML = html;
        },
        getCategoryName = function (name) {
            try {
                var categories = Object.assign({}, data.categories, data.subcategories);
                return categories.filter({id: name}).concat(undefined).shift().cta;
            } catch (e) {
                return "";
            }
        },
        renderTitle = function () {
            var title = `Las mejoras Ofertas <span class="a-text--brand--secondary">${model.activeCategory ? 'de ' : ''} ${getCategoryName(model.activeCategory)} ${getCategoryName(model.activeSubcategory)}</span>:`;
            document.querySelector(locators.title).innerHTML = title;
        },
        renderOffer = function (offer, position) {
            return html.offers(offer, (position + 1) % 4 === 1);
        },
        getOffers = function (callback) {
            /*Call API fo full list*/
            model.offers = require(`./project/${PROJECT}/products`);
            callback();
        },
        renderOffers = function (filteredOffers) {
            var html = '',
                offers = filteredOffers ? filteredOffers : model.offers;
            for (var i = 0; i < offers.length; i++) {
                html += renderOffer(offers[i], i);
            }
            document.querySelector(locators.content).innerHTML = html;
        },
        showOfferContainers = function () {
            if (model.offers.length > 0) {
                document.querySelector(locators.offers).classList.remove(locators.hideClass);
            } else {
                document.querySelector(locators.offers).classList.add(locators.hideClass);
            }
        },
        filterOffersByTag = function (tag, filterOffers) {
            var offers = filterOffers ? filterOffers : model.offers;
            return offers.filter(function (offer) {
                return offer.tags.join('').indexOf(tag) > -1;
            });
        },

        renderCategoryPage = function () {
            renderOffers();
            renderButtons();
            renderTitle();
            bindFilters('.' + locators.filter);
            showOfferContainers();
            BS.Service.Step.next();
        },
        renderSubCategoryPage = function () {
            var filteredOffers = filterOffersByTag(model.activeCategory);
            renderOffers(filteredOffers);
            renderButtons(true);
            renderTitle();
            bindFilters('.' + locators.filterSubcategory);
            showOfferContainers();
            BS.Service.Step.next();

        },
        renderProductPage = function () {
            var filteredOffers = filterOffersByTag(model.activeSubcategory, filterOffersByTag(model.activeCategory));
            renderOffers(filteredOffers);
            renderTitle();
            showOfferContainers();
            BS.Service.Step.next();
        },
        addFilter = function (element, locator) {
            var tag = element.dataset.tag;
            if (locator === locator.filterSubcategory) {
                model.activeSubcategory = tag;
                renderProductPage();
            } else {
                model.activeCategory = tag;
                renderSubCategoryPage();
            }
        },
        onFilter = function (element, parentLocator) {
            element.addEventListener('mousedown', function (e) {
                addFilter(e.target.closest(parentLocator), parentLocator);
            });
        },
        bindFilters = function (parentLocator) {
            document.querySelectorAll(parentLocator).forEach(function (element) {
                onFilter(element, parentLocator);
            });
        },
        init = function () {
            var offersElements = document.querySelectorAll(locators.offers);
            if (offersElements && offersElements.length > 0) {
                getOffers(function () {
                    renderCategoryPage();
                });
            }
        };
    setTimeout(init, 300);
})('mv');