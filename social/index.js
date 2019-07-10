import {Facebook} from './networks/facebook';
import {Twitter} from './networks/twitter';
import {Linkedin} from './networks/linkedin';
import {Whatsapp} from './networks/whatsapp';

const locators = {
    init: 'bs_social_media',
    data: {
        name: 'social',
        via: 'via',
        text: 'shareText',
        url: 'shareLink',
        hashtags: 'hashtags'
    }
};

const redirectToSocialMedia = (baseUrl, data) => {
    window.open(baseUrl + paramsToArray(data).join('&'));
};

const social = {
    mappers: {
        twitter: Twitter.data,
        facebook: Facebook.data,
        linkedin: Linkedin.data,
        whatsapp: Whatsapp.data
    },
    action: {
        twitter: Twitter.url,
        facebook: Facebook.url,
        linkedin: Linkedin.url,
        whatsapp: Whatsapp.url
    }
};

const paramsToArray = data => {
    let params = [];
    for (let value in data) {
        if (data && data[value]) {
            params.push(value + '=' + encodeURIComponent(data[value]));
        }
    }
    return params;
};


const addSocialListener = () => {
    [... document.getElementsByClassName(locators.init)].forEach(e => {
        bindListener(e);
    });
};

const bindListener = elementAction => {
    elementAction.addEventListener('click', function (event) {
        let element = event.target.closest('.' + locators.init),
            elementData = element.dataset,
            network = elementData.social,
            params = getParamsByNetwork(getFilledElement(element, elementData), network);
        if (social.action[network]) {

            social.action[network](params, redirectToSocialMedia);
        }
    });
};

const getFilledElement = (element, elementData) => {
    let socialTarget = elementData.target,
        targetById = document.getElementById(socialTarget),
        target = !!targetById ? targetById : document.querySelector('.' + socialTarget);
    return !!target ? target : element;
};

const getParamsByNetwork = (element, network) => {
    let socialMap = locators.data,
        dataset = element.dataset,
        settings = ({
            network: network,
            text: dataset[socialMap.text],
            link: dataset[socialMap.url],
            hashtags: dataset[socialMap.hashtags],
            via: dataset[socialMap.via]
        });
    return social.mappers[network](settings);
};
(() => {
    addSocialListener();
})();