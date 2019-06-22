module.exports = {
    locators: {
        trigger: '.bs_step',
        routerClass: 'is-active',
    },
    model: {
        elements: [],
        activeIndex: -1,
    },
    getElements: function () {
        this.model.elements = document.querySelectorAll(this.locators.trigger);
        for (var i = 0; i < this.model.elements.length; i++) {
            var elementIterator = this.model.elements[i];
            if (elementIterator.classList.contains(this.locators.routerClass)) {
                elementIterator.classList.remove(this.locators.routerClass);
                this.model.activeIndex = i;
            }
        }
    },
    activeElement: function (element) {
        element.classList.add(this.locators.routerClass);
    },
    showNextElement: function () {
        try {
            var elements = this.model.elements;
            this.model.activeIndex++;
            this.activeElement(elements[this.model.activeIndex]);
        } catch (e) {
            this.model.activeIndex--;
            this.activeElement(elements[this.model.activeIndex]);
        }

    },
    next: function () {
        this.getElements();
        if (this.model.elements.length > 0) {
            this.showNextElement();
        }

    }
};