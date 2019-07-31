export class SplashScreen {
    constructor(e) {
        console.log(e);
        this.splash = e;
    }

    removeSplashScreen() {
        this.splash.classList.add(SplashLocator.activeClass);
    }
}

export const SplashLocator = {
    trigger: '.bs_splash_screen',
    activeClass: 'is-loaded'
};
