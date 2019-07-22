export const Offers = (offer, isDouble) =>
    `<div data-tags="" class="gel-layout__item gel-1/1 gel-1/2@m ${isDouble ? 'gel-2/4@l' : 'gel-1/4@l'}">
            <article class="m-offer m-offer--theme-2 a-zoom-image ${isDouble ? 'm-offer--theme-2-double' : ''}">
               <div class="m-offer__picture-wrap">
                  <a class="m-offer__picture-link m-hero m-hero--top-left" href="${offer.link}">
                     <picture class="m-offer__picture">
                        <source data-srcset="https://d2l4159s3q6ni.cloudfront.net/resize/480x280/filters:max_age(2604800):quality(65)/s3/dam/photos/c7/69/24/3a/a58694e2c127b232c84b8eab7132441d3d15c42032977f85ed7b3fcd.jpg" media="(max-width: 539px)" alt="${offer.name}" title="${offer.name}">
                        <img class="m-offer__image lazy"
                           data-srcset="https://d2l4159s3q6ni.cloudfront.net/resize/280x280/filters:max_age(2604800):quality(65)/s3/dam/photos/c7/69/24/3a/a58694e2c127b232c84b8eab7132441d3d15c42032977f85ed7b3fcd.jpg"
                           src="https://d2eh7florc4mjb.cloudfront.net/ota/dist/assets/img/pegasus/graphics/shim.gif" alt="${offer.name}">
                     </picture>
                  </a>
               </div>
               <div class="m-offer__content-wrap">
                  <h3 class="m-offer__title c-heading c-heading--type-4">
                     <a href="${offer.link}">${offer.name}</a>
                  </h3>
               </div>
               <div class=" m-offer__actions-wrap">
                  <div class="m-offer__price">
                     <a href="${offer.link}" class="c-price c-price--theme-2 c-price--align-left">
                        <div class="c-price__box">
                           <span class="c-price__from">Desde</span>
                           <span class="c-price__element">${offer.price}€</span>
                        </div>
                        <div class="c-price__box c-price__box--arrow">
                           <span class="c-price__arrow c-icon c-icon-direction c-icon--medium"></span>
                        </div>
                     </a>
                  </div>
               </div>
            </article>
        </div>`;

export const Button = (button) =>
    `<div data-tag="${button.id}" class="ml-button-pill l-flex l-flex--direction-column l-flex--justify-start ${button.brand} a-pad--bottom a-mar">
            <button class="a-button a-button--mono-0 a-button-svg--square a-svg--secondary a-pad a-svg--m a-border a-border--secondary a-border--hover--primary a-border--smooth">
                ${button.svg}
            </button>   
        <div class="a-text a-text--link a-text--secondary a-text--center a-pad-5">${button.cta}</div>
    </div>`;
