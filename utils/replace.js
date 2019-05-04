var ReplaceUtils = ReplaceUtils || {};
ReplaceUtils.replace = {
    locators: {
        trigger:'.bs_replace',
        image: '.bs_image_replace',
    },
    replaceImage: function (target, element) {
        document.querySelector(target).src = element.src;
    },
    bindReplace: function (elements) {
        var that = this;
        elements.forEach((element) => {
            element.addEventListener('click', function (e) {
                const element = e.target,
                    targetClass = element.dataset.target;
                console.log(targetClass);
                if (targetClass) {
                    that.replaceImage(targetClass, element);
                }
            });
        });
    },
    init: function () {
        this.bindReplace(document.querySelectorAll(this.locators.image));
    }
};
ReplaceUtils.init = function () {
    this.replace.init();
};
module.exports = ReplaceUtils;