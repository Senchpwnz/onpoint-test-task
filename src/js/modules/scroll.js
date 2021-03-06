const scrollThumb = document.querySelector('.scroll__thumb'),
    scrollBar = document.querySelector('.scroll__bar'),
    scrollList = document.querySelector('.slide2__list p');

const scroll = {
    bar: scrollBar,
    thumb: scrollThumb,
    list: scrollList,
    isDragging: false,
    startPosition: 0,
    previousTranslate: 0,
    currentTranslate: 0,
    breakpoint: 0,
    listTranslate: 0,
    listBreakpoint: 0,
    ratio: 0,
    animationID: 0,
    start() {
        this.thumb.addEventListener('touchstart', this.touchStart());
        this.thumb.addEventListener('touchend', this.touchEnd());
        this.thumb.addEventListener('touchmove', this.touchMove());

        this.thumb.addEventListener('mousedown', this.touchStart());
        this.thumb.addEventListener('mouseup', this.touchEnd());
        this.thumb.addEventListener('mouseleave', this.touchEnd());
        this.thumb.addEventListener('mousemove', this.touchMove());

        this.setRatio()
    },
    touchStart() {
        return (event) => {
            event.stopPropagation(event);
            this.startPosition = this.getPositionY(event);
            this.isDragging = true;

            this.animationID = requestAnimationFrame(this.animation());
        }
    },
    touchEnd() {
        return (event) => {
            this.isDragging = false;
            this.previousTranslate = this.currentTranslate;
            cancelAnimationFrame(this.animationID)
        }
    },
    touchMove() {
        return (event) => {
            if (this.isDragging) {
                const currentPosition = this.getPositionY(event)
                this.currentTranslate = this.previousTranslate + currentPosition - this.startPosition;
                if (this.currentTranslate <= 0) this.currentTranslate = 0
                if (this.currentTranslate >= this.breakpoint) this.currentTranslate = this.breakpoint;
                this.listTranslate = this.currentTranslate * -this.ratio;
            }
        }
    },
    getPositionY(event) {
        return event.type.includes('mouse') ? event.pageY : event.touches[0].clientY;
    },
    animation() {
        return () => {
            this.setScrollPosition();
            if (this.isDragging) requestAnimationFrame(this.animation());
        }
    },
    setScrollPosition() {
        this.thumb.style.transform = `translateY(${this.currentTranslate}px)`;
        this.list.style.transform = `translateY(${this.listTranslate}px)`;
    },
    setRatio() {
        this.breakpoint = this.bar.offsetHeight - this.thumb.offsetHeight;
        this.listBreakpoint = this.list.offsetHeight - this.list.parentNode.offsetHeight;
        this.ratio = this.listBreakpoint / this.breakpoint;
    },
}

export default scroll