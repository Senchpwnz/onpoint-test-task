import { animationStart, animationPrepare } from './events.js'

const sliderWrap = document.querySelector('.slider-container'),
    slides = Array.from(document.querySelectorAll('.slide')),
    startButton = document.querySelector('.slide1__button'),
    homeButton = document.querySelector('.header__logo');

const slider = {
    SLIDER: sliderWrap,
    SLIDES: slides,
    startButton: startButton,
    homeButton: homeButton,
    isDragging: false,
    startPosition: 0,
    currentTranslate: 0,
    previousTranslate: 0,
    animationID: 0,
    currentIndex: 0,
    previousIndex: 0,
    start() {
        this.homeButton.addEventListener('touchstart', this.setPositionOnSlide(0));
        this.homeButton.addEventListener('mousedown', this.setPositionOnSlide(0));
        this.homeButton.addEventListener('touchend', function (e) {
            e.preventDefault();
            e.stopPropagation();
        });
        this.homeButton.addEventListener('mouseup', function (e) {
            e.preventDefault();
            e.stopPropagation();
        });

        this.startButton.addEventListener('touchstart', this.setPositionOnSlide(1));
        this.startButton.addEventListener('mousedown', this.setPositionOnSlide(1));
        this.startButton.addEventListener('touchend', function (e) {
            e.preventDefault();
            e.stopPropagation();
        });
        this.startButton.addEventListener('mouseup', function (e) {
            e.preventDefault();
            e.stopPropagation();
        });

        this.SLIDES.forEach((slide, index) => {
            // Touch events
            slide.addEventListener('touchstart', this.touchStart(index));
            slide.addEventListener('touchend', this.touchEnd());
            slide.addEventListener('touchmove', this.touchMove());

            // Mouse events 
            slide.addEventListener('mousedown', this.touchStart(index));
            slide.addEventListener('mouseup', this.touchEnd());
            slide.addEventListener('mouseleave', this.touchEnd());
            slide.addEventListener('mousemove', this.touchMove());
        })
    },
    touchStart(index) {
        return (event) => {

            this.currentIndex = index;
            this.startPosition = this.getPositionX(event)
            this.isDragging = true;

            this.animationID = requestAnimationFrame(this.animation())

        }
    },
    touchEnd() {
        return (event) => {

            this.isDragging = false;
            cancelAnimationFrame(this.animationID);

            const movedBy = this.currentTranslate - this.previousTranslate

            this.previousIndex = this.currentIndex;

            if (movedBy < -100 && this.currentIndex < this.SLIDES.length - 1) this.currentIndex += 1

            if (movedBy > 100 && this.currentIndex > 0) this.currentIndex -= 1

            this.setPositionByIndex()
        }
    },
    touchMove() {
        return (event) => {
            if (this.isDragging) {
                const currentPosition = this.getPositionX(event)
                this.currentTranslate = this.previousTranslate + currentPosition - this.startPosition;
            }
        }
    },
    getPositionX(event) {
        return event.type.includes('mouse') ? event.pageX : event.touches[0].clientX;
    },
    animation() {
        return () => {
            this.setSliderPosition()
            if (this.isDragging) requestAnimationFrame(this.animation())
        }

    },
    setSliderPosition() {
        this.SLIDER.style.transform = `translateX(${this.currentTranslate}px)`;
    },
    setPositionByIndex() {
        this.currentTranslate = this.currentIndex * -sliderWrap.offsetWidth
        this.previousTranslate = this.currentTranslate
        this.setSliderPosition();
        if (this.currentIndex == 0) document.dispatchEvent(animationPrepare);
        if (this.previousIndex == 0 && this.currentIndex == 1) document.dispatchEvent(animationStart);
    },
    setPositionOnSlide(index) {
        return (event) => {
            this.previousIndex = this.currentIndex;
            this.currentIndex = index;
            this.setPositionByIndex();
        }
    },

}
export default slider