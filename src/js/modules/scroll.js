const scrollThumb = document.querySelector('.scroll__thumb'),
    scrollBar = document.querySelector('.scroll__bar'),
    scrollList = document.querySelector('.slide2__text p');

const scroll = {
    SCROLL_BAR: scrollBar,
    SCROLL_THUMB: scrollThumb,
    SCROLL_LIST: scrollList,
    isDragging: false,
    startPosition: 0,
    previousTranslate: 0,
    currentTranslate: 0,
    animationID: 0,
    touchStart(event) {
        event.stopPropagation();
        this.startPosition = this.getPositionY(event)
        this.isDragging = true

        console.log('start')

        this.animationID = requestAnimationFrame(this.animation.bind(this))

    },
    touchEnd(event) {
        console.log('end')
        this.isDragging = false
    },
    touchMove(event) {
        if (this.isDragging) {
            const currentPosition = this.getPositionY(event)
            this.currentTranslate = this.previousTranslate + currentPosition - this.startPosition
            requestAnimationFrame(this.animation.bind(this))
        }
    },
    getPositionY(event) {
        return event.type.includes('mouse') ? event.pageY : event.touches[0].clientY;
    },
    animation() {
        const breakpoint = this.SCROLL_BAR.offsetHeight - this.SCROLL_THUMB.offsetHeight + 10;
        if (this.currentTranslate >= -10 && this.currentTranslate <= breakpoint && this.isDragging) {
            this.setThumbPosition()
        }
    },
    setThumbPosition() {
        this.SCROLL_THUMB.style.transform = `translateY(${this.currentTranslate}px)`
    },
    startEvents() {
        this.SCROLL_THUMB.addEventListener('touchstart', this.touchStart.bind(this))
        this.SCROLL_THUMB.addEventListener('touchend', this.touchEnd.bind(this))
        this.SCROLL_THUMB.addEventListener('touchmove', this.touchMove.bind(this))
    },



}

export default scroll