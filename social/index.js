import {FacebookData, FacebookUrl} from './facebook';
import {TwitterData, TwitterUrl} from './twitter';
import {LinkedinData, LinkedinUrl} from './linkedin';
import {WhatsappData, WhatsappUrl} from './whatsapp';

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
    console.log(baseUrl, data);
    window.open(baseUrl + paramsToArray(data).join('&'));
};

const social = {
    mappers: {
        twitter: TwitterData,
        facebook: FacebookData,
        linkedin: LinkedinData,
        whatsapp: WhatsappData
    },
    action: {
        twitter: TwitterUrl,
        facebook: FacebookUrl,
        linkedin: LinkedinUrl,
        whatsapp: WhatsappUrl
    }
};

const paramsToArray = data => {
    var params = [];
    for (var value in data) {
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
        var element = event.target.closest('.' + locators.init),
            elementData = element.dataset,
            network = elementData.social,
            params = getParamsByNetwork(getFilledElement(element, elementData), network);
        if (social.action[network]) {

            social.action[network](params, redirectToSocialMedia);
        }
    });
};

const getFilledElement = (element, elementData) => {
    var socialTarget = elementData.target,
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