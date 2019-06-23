module.exports = (function () {
    var locators = {
            filter: '.bs_step_filter'
        },
        model = {
            activeFilters: [],
            offers: []
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
                    name: 'Oferta Deportiva',
                    price: 25,
                    link: 'https://google.com',
                    tags: ['sport']
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
                    tags: ['family']
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
            document.querySelector('.bs_step_content').innerHTML = html;
        },
        showOfferContainers = function () {
            if (model.offers.length > 0) {
                document.querySelector('.bs_step_offers').classList.remove('u-hide');
            } else {
                document.querySelector('.bs_step_offers').classList.add('u-hide');
            }
        },
        filterOffersByTags = function (tags) {
            return _.filter(model.offers, function (offer) {
                return offer.tags.join('').indexOf(tags[0]) > -1
            })
        },
        renderNextPage = function () {
            var filteredOffers = filterOffersByTags(model.activeFilters);
            console.log(filteredOffers);
            renderOffers(filteredOffers);
            showOfferContainers();
        },
        addFilter = function (element) {
            var tag = element.dataset.tag;
            model.activeFilters.push(tag);
            BS.Service.Step.next();
            renderNextPage();
        },
        onFilter = function (element) {
            element.addEventListener('mousedown', function (e) {
                addFilter(e.target.closest(locators.filter));
            });
        },
        bindFilters = function () {
            var elements = document.querySelectorAll(locators.filter);
            for (var i = 0; i < elements.length; i++) {
                onFilter(elements[i]);
            }
        },
        init = function () {
            getOffers(function () {
                renderOffers();
                BS.Service.Step.next();
                bindFilters();
                showOfferContainers();

            });
        };
    setTimeout(init, 300);
});