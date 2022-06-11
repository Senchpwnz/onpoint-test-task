const sliderWrap = document.querySelector('.slider-container'),
    slides = Array.from(document.querySelectorAll('.slide'));

const slider = {
    SLIDER: sliderWrap,
    SLIDES: slides,
    isDragging: false,
    startPosition: 0,
    currentTranslate: 0,
    previousTranslate: 0,
    animationID: 0,
    currentIndex: 0,
    start() {
        this.SLIDES.forEach((slide, index) => {

            // Touch events
            slide.addEventListener('touchstart', this.touchStart(index))
            slide.addEventListener('touchend', this.touchEnd.bind(this))
            slide.addEventListener('touchmove', this.touchMove.bind(this))

            // Mouse events 
            slide.addEventListener('mousedown', this.touchStart(index))
            slide.addEventListener('mouseup', this.touchEnd)
            slide.addEventListener('mouseleave', this.touchEnd)
            slide.addEventListener('mousemove', this.touchMove)
        })
    },
    touchStart(index) {
        return (event) => {
            this.currentIndex = index;
            this.startPosition = this.getPositionX(event)
            this.isDragging = true;

            this.animationID = requestAnimationFrame(this.animation.bind(this))
        }
    },
    touchEnd() {
        this.isDragging = false;

        const movedBy = this.currentTranslate - this.previousTranslate

        if (movedBy < -100 && this.currentIndex < this.SLIDES.length - 1) this.currentIndex += 1

        if (movedBy > 100 && this.currentIndex > 0) this.currentIndex -= 1

        this.setPositionByIndex()
    },
    touchMove(event) {
        if (this.isDragging) {
            const currentPosition = this.getPositionX(event)
            this.currentTranslate = this.previousTranslate + currentPosition - this.startPosition
        }
    },
    getPositionX(event) {
        return event.type.includes('mouse') ? event.pageX : event.touches[0].clientX;
    },
    animation() {
        this.setSliderPosition()
        requestAnimationFrame(this.animation.bind(this))
        if (!this.isDragging) cancelAnimationFrame(this.animationID);
    },
    setSliderPosition() {
        this.SLIDER.style.transform = `translateX(${this.currentTranslate}px)`
    },
    setPositionByIndex() {
        this.currentTranslate = this.currentIndex * -window.innerWidth
        this.previousTranslate = this.currentTranslate
        requestAnimationFrame(this.animation.bind(this))
    }
}
export default slider