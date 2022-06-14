import * as functions from "./modules/functions.js";
import slider from './modules/slider.js'
import scroll from './modules/scroll.js'
import popUp from './modules/popUp.js'
import animation from "./modules/animation.js";

document.addEventListener('DOMContentLoaded', function () {
    functions.isWebp()

    window.oncontextmenu = function (event) {
        event.preventDefault();
        event.stopPropagation();
        return false
    }

    const app = {
        slider: slider,
        scroll: scroll,
        popUp: popUp,
        animation: animation,
        work() {
            this.scroll.start();
            this.slider.start();
            this.popUp.start();
            this.animation.work()
        }
    }

    app.work()
})
