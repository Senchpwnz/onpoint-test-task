import * as functions from "./modules/functions.js";
import slider from './modules/slider.js'
import scroll from './modules/scroll.js'

functions.isWebp()
window.oncontextmenu = function (event) {
    event.preventDefault();
    event.stopPropagation();
    return false
}
scroll.startEvents();
slider.start()