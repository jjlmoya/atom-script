module.exports = (function () {
    var icons = require('./icon'),
        locators = {
            filter: '.bs_step_filter',
            filterSubcategory: '.bs_step_filter_subcategory',
            categoryContainer: '.bs_step_category',
            subCategory: '.bs_step_subcategory',
            title: '.bs_step_title',
            offers: '.bs_step_offers',
            content: '.bs_step_content',
            hideClass: 'u-hide'
        },
        model = {
            categories: [
                {
                    id: 'relax',
                    cta: 'Relax',
                    svg: icons.relax,
                    brand: ''
                }, {
                    id: 'work',
                    cta: 'Trabajo',
                    svg: icons.work,
                    brand: '',
                },
                {
                    id: 'sport',
                    cta: 'Deporte',
                    svg: icons.sports,
                    brand: '',
                },
                {
                    id: 'party',
                    cta: 'Ocio',
                    svg: icons.party,
                    brand: '',
                },
                {
                    tag: 'culture',
                    cta: 'Cultural',
                    svg: icons.cultural,
                    brand: '',
                }],
            subcategories: [{
                id: 'ski',
                cta: 'Esquí',
                svg: icons.ski,
                brand: '',
                categories: ['sports']
            }],
            activeCategory: '',
            activeSubcategory: '',
            offers: []
        },

        renderButton = function (button, isSubcategory) {
            var actionClass = isSubcategory ? 'bs_step_filter_subcategory' : 'bs_step_filter';
            return `<div data-tag="${button.id}" class="ml-button-pill l-flex l-flex--direction-column l-flex--justify-center ${actionClass} a-pad ${button.brand}">
                            <button class="a-button-svg--square a-svg a-pad a-svg--m a-svg--secondary a-border a-border--secondary a-border--hover--primary a-border--smooth">
                                ${button.svg}
                            </button>   
                        <div class="a-text a-text--link a-text--center a-pad-5">${button.cta}</div>
                    </div>`;
        },

        getSubCategoriesByCategory = function (category) {
            return _.filter(model.subcategories, function (sub) {
                return sub.categories.join().indexOf(category) > -1;
            })
        },
        renderButtons = function (isSubcategory) {
            var buttons = isSubcategory ? getSubCategoriesByCategory(model.activeCategory) : model.categories;
            var html = buttons.map(function (category) {
                    return renderButton(category, isSubcategory);
                }).join(''),
                elementLocator = isSubcategory ? locators.subCategory : locators.categoryContainer;
            document.querySelector(elementLocator).innerHTML = html;
        },
        getCategoryName = function (name) {
            try {
                var categories = Object.assign({}, model.categories, model.subcategories);
                return _.first(_.filter(categories, {id: name})).cta;
            } catch (e) {
                return "";
            }
        },
        renderTitle = function () {
            var title = `Las mejoras Ofertas <span class="a-text--shadow">${model.activeCategory ? 'de ' : ''} ${getCategoryName(model.activeCategory)} ${getCategoryName(model.activeSubcategory)}</span>:`;
            document.querySelector(locators.title).innerHTML = title;
        },
        renderOffer = function (offer, position) {
            var isDouble = (position + 1) % 4 === 1;
            return `
        <div data-tags="" class="gel-layout__item gel-1/1 gel-1/2@m ${isDouble ? 'gel-2/4@l' : 'gel-1/4@l'}"
                 data-gtm-promotion=""
                 data-gtm-lblevent="Promociones para caribe">
        <article class="m-offer m-offer--theme-2 a-zoom-image ${isDouble ? 'm-offer--theme-2-double' : ''}"
               id="${offer.name}"
               data-prop="priceCurrency"
               data-content="EUR" itemprop="offers" itemscope itemtype="http://schema.org/Offer"
               data-gtm-activation="appClick"
               data-gtm-promoid="${offer.name}"
               data-gtm-id="${offer.name}"
               data-gtm-name="${offer.name}"
               data-gtm-creative="reactive_${offer.name}"
               data-gtm-position="link_${position}">
               <meta itemprop="priceCurrency" content="EUR">
               <div class="m-offer__picture-wrap">
                  <a class="m-offer__picture-link m-hero m-hero--top-left" href="${offer.link}">
                     <picture class="m-offer__picture">
                        <source data-srcset="https://d2l4159s3q6ni.cloudfront.net/resize/480x280/filters:max_age(2604800):quality(65)/s3/dam/photos/c7/69/24/3a/a58694e2c127b232c84b8eab7132441d3d15c42032977f85ed7b3fcd.jpg" media="(max-width: 539px)" alt="Bayahibe" title="Bayahibe">
                        <source data-srcset="https://d2l4159s3q6ni.cloudfront.net/resize/750x400/filters:max_age(2604800):quality(65)/s3/dam/photos/c7/69/24/3a/a58694e2c127b232c84b8eab7132441d3d15c42032977f85ed7b3fcd.jpg" media="(max-width: 768px)" alt="Bayahibe" title="Bayahibe">
                        <source data-srcset="https://d2l4159s3q6ni.cloudfront.net/resize/480x280/filters:max_age(2604800):quality(65)/s3/dam/photos/c7/69/24/3a/a58694e2c127b232c84b8eab7132441d3d15c42032977f85ed7b3fcd.jpg" media="(max-width: 1023px)" alt="Bayahibe" title="Bayahibe">
                        <source data-srcset="https://d2l4159s3q6ni.cloudfront.net/resize/280x280/filters:max_age(2604800):quality(65)/s3/dam/photos/c7/69/24/3a/a58694e2c127b232c84b8eab7132441d3d15c42032977f85ed7b3fcd.jpg" alt="Bayahibe" title="Bayahibe">
                        <img class="m-offer__image lazy"
                           data-srcset="https://d2l4159s3q6ni.cloudfront.net/resize/280x280/filters:max_age(2604800):quality(65)/s3/dam/photos/c7/69/24/3a/a58694e2c127b232c84b8eab7132441d3d15c42032977f85ed7b3fcd.jpg"
                           itemprop="image" data-prop="image"
                           content="https://d2l4159s3q6ni.cloudfront.net/resize/80x80/filters:max_age(2604800):quality(65)/s3/dam/photos/c7/69/24/3a/a58694e2c127b232c84b8eab7132441d3d15c42032977f85ed7b3fcd.jpg"
                           data-content="https://d2l4159s3q6ni.cloudfront.net/resize/80x80/filters:max_age(2604800):quality(65)/s3/dam/photos/c7/69/24/3a/a58694e2c127b232c84b8eab7132441d3d15c42032977f85ed7b3fcd.jpg"
                           src="https://d2eh7florc4mjb.cloudfront.net/ota/dist/assets/img/pegasus/graphics/shim.gif" alt="Bayahibe" title="Bayahibe">
                     </picture>
                  </a>
               </div>
               <div class="m-offer__content-wrap">
                  <h3 class="m-offer__title c-heading c-heading--type-4"
                     itemprop="name"
                     content="${offer.name}" data-prop="name"
                     data-content="${offer.name}">
                     <a href="${offer.link}"
                        data-prop="url" data-content="${offer.link}" itemprop="url"
                        content="${offer.link}">${offer.name}</a>
                  </h3>
                  <span class="m-offer__description">
                  <span class="m-offer__description-highlight"
                     itemprop="duration"
                     content="9 días y 7 noches"
                     data-prop="duration"
                     data-content="9 días y 7 noches">9 días y 7 noches</span>
                  </span>
               </div>
               <div class=" m-offer__actions-wrap"
                  data-gtm-listener="click">
                  <div class="m-offer__price">
                     <a class="c-price c-price--theme-2 c-price--align-left js-modal-trigger"
                        href="${offer.link}">
                        <div class="c-price__box">
                           <span class="c-price__from" data-prop="pricePrefix"
                              data-content="Desde">Desde</span>
                           <span class="c-price__element" itemprop="price"
                              content="${offer.price}" data-prop="price"
                              data-content="${offer.price} €">${offer.price}€</span>
                        </div>
                        <div class="c-price__box c-price__box--arrow">
                           <span class="c-price__arrow c-icon c-icon-direction c-icon--medium"></span>
                        </div>
                     </a>
                  </div>
               </div>
            </article>
            </div>`;
        },
        getOffers = function (callback) {
            /*Call API fo full list*/
            model.offers = [
                {
                    name: 'Oferta Deporte, Familia y Trabajo',
                    price: '25',
                    link: 'https://google.es',
                    tags: ['sport', 'family', 'work']
                },
                {
                    name: 'Oferta Deportiva de Ski',
                    price: 25,
                    link: 'https://google.com',
                    tags: ['sport', 'ski']
                },
                {
                    name: 'Oferta Familia',
                    price: 25,
                    link: 'https://google.co.uk',
                    tags: ['family']
                },
                {
                    name: 'Oferta Trabajo',
                    link: 'https://yahoo.es',
                    price: 25,
                    tags: ['work']
                }
            ];
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
        filterOffersByTag = function (tag, offers) {
            var offers = offers ? offers : model.offers;
            return _.filter(offers, function (offer) {
                return offer.tags.join('').indexOf(tag) > -1
            })
        },

        renderCategoryPage = function () {
            renderOffers();
            renderButtons();
            renderTitle();
            bindFilters();
            showOfferContainers();
            BS.Service.Step.next();
        },
        renderSubCategoryPage = function () {
            var filteredOffers = filterOffersByTag(model.activeCategory);
            renderOffers(filteredOffers);
            renderButtons(true);
            renderTitle();
            bindFilters(true);
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
        addFilter = function (element, isSubcategory) {
            var tag = element.dataset.tag;
            console.log(model);
            console.log(isSubcategory);
            if (isSubcategory) {
                model.activeSubcategory = tag;
                renderProductPage();
            } else {
                model.activeCategory = tag;
                renderSubCategoryPage();
            }
        },
        onFilter = function (element, isSubcategory) {
            var parentLocator = isSubcategory ? locators.filterSubcategory : locators.filter;
            element.addEventListener('mousedown', function (e) {
                addFilter(e.target.closest(parentLocator), isSubcategory);
            });
        },
        bindFilters = function (isSubcategory) {
            var elements = isSubcategory
                ? document.querySelectorAll(locators.filterSubcategory)
                : document.querySelectorAll(locators.filter);
            for (var i = 0; i < elements.length; i++) {
                onFilter(elements[i], isSubcategory);
            }
        },
        init = function () {
            getOffers(function () {
                renderCategoryPage();
            });
        };
    setTimeout(init, 300);
});