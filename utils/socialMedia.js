module.exports = {
    locators: {
        social: {
            init: 'bs_social_media',
            data: {
                name: 'social',
                via: 'via',
                text: 'shareText',
                url: 'shareLink',
                hashtags: 'hashtags'
            }
        }
    },
    social: {
        mappers: {
            twitter: function (data) {
                return {
                    url: data.link,
                    text: data.text,
                    hashtags: data.hashtags,
                    via: data.via
                };
            },
            facebook: function (data) {
                return {
                    u: data.link,
                    quote: data.text,
                    hashtags: data.hashtags
                };
            },
            linkedin: function (data) {
                return {
                    url: data.link,
                    mini: true,
                    title: data.title,
                    summary: data.text,
                    source: data.link
                };
            },
            whatsapp: function (data) {
                return {
                    text: data.link
                };
            },
            google: function (data) {
                return {
                    text: data.text,
                    url: data.link
                };
            }
        },
        action: {
            paramsToArray: function (data) {
                var params = [];
                for (var value in data) {
                    if (data && data[value]) {
                        params.push(value + '=' + encodeURIComponent(data[value]));
                    }
                }
                return params;
            },
            redirectToSocialMedia: function (baseUrl, data) {
                window.open(baseUrl + this.paramsToArray(data).join('&'));
            },
            twitter: function (data) {
                this.redirectToSocialMedia('https://twitter.com/share?', data);
            },

            facebook: function (data) {
                this.redirectToSocialMedia('https://www.facebook.com/sharer/sharer.php?', data);
            },

            linkedin: function (data) {
                this.redirectToSocialMedia('https://www.linkedin.com/shareArticle?', data);
            },

            whatsapp: function (data) {
                this.redirectToSocialMedia('whatsapp://send?', data);
            },

            google: function (data) {
                this.redirectToSocialMedia('https://plus.google.com/share?', data);
            }
        }
    },

    bindListener: function (elementAction) {
        var that = this;
        elementAction.addEventListener('click', function (event) {
            var element = event.target.closest('.' + that.locators.social.init),
                elementData = element.dataset,
                network = elementData.social,
                params = that.getParamsByNetwork(that.getFilledElement(element, elementData), network);
            console.log('network %o', network);
            if (that.social.action[network]) {
                that.social.action[network](params);
            }
        });
    },
    addSocialListener: function () {
        var elements = document.getElementsByClassName(this.locators.social.init);
        for (var i = 0; i < elements.length; i++) {
            this.bindListener(elements[i]);
        }
    },
    getFilledElement: function (element, elementData) {
        var socialTarget = elementData.target,
            targetById = document.getElementById(socialTarget),
            target = !!targetById ? targetById : document.querySelector('.' + socialTarget);
        return !!target ? target : element;
    },

    getParamsByNetwork: function (element, network) {
        var socialMap = this.locators.social.data,
            dataset = element.dataset,
            settings = ({
                network: network,
                text: dataset[socialMap.text],
                link: dataset[socialMap.url],
                hashtags: dataset[socialMap.hashtags],
                via: dataset[socialMap.via]
            });
        console.log({socialMap: socialMap, settings: settings, dataset: dataset, mappers: this.social.mappers});
        return this.social.mappers[network](settings);
    },

    init: function () {
        this.addSocialListener();
    }
};