const openButton = document.querySelector('.slide3__button'),
    closeButton = document.querySelector('.pop__close'),
    wrap = document.querySelector('.pop'),
    background = document.querySelector('.pop__background'),
    list = Array.from(document.querySelectorAll('.pop__list')),
    pagination = Array.from(document.querySelectorAll('.pagination__dot')),
    prev = document.querySelector('.pagination__prev'),
    next = document.querySelector('.pagination__next'),
    bottle = document.querySelector('.slide3__bottle'),
    brand = document.querySelector('.slide3__brand'),
    logo = document.querySelector('.header__logo img');

const popUp = {
    isOpened: false,
    openButton: openButton,
    closeButton: closeButton,
    wrap: wrap,
    background: background,
    list: list,
    pagination: pagination,
    currentIndex: 0,
    prevButton: prev,
    nextButton: next,
    stopPropEl: [bottle, brand, logo],

    start() {
        this.stopPropEl.forEach(el => {

            el.addEventListener('touchstart', (event) => {
                if (this.isOpened) {
                    event.stopPropagation();
                    event.preventDefault();
                    console.log(event.target)
                }
            });

            el.addEventListener('mousedown', (event) => {
                if (this.isOpened) {
                    event.stopPropagation();
                    event.preventDefault();
                }
            });
        });

        this.openButton.addEventListener('touchstart', this.open())
        this.closeButton.addEventListener('touchstart', this.close())
        this.background.addEventListener('touchstart', this.close())
        this.nextButton.addEventListener('touchstart', this.next())
        this.prevButton.addEventListener('touchstart', this.prev())

        this.openButton.addEventListener('mousedown', this.open())
        this.closeButton.addEventListener('mousedown', this.close())
        this.background.addEventListener('mousedown', this.close())
        this.nextButton.addEventListener('mousedown', this.next())
        this.prevButton.addEventListener('mousedown', this.prev())
    },
    open() {
        return (event) => {
            event.stopPropagation();
            this.wrap.style.display = "block";
            this.wrap.offsetHeight;
            this.wrap.style.opacity = 1;
            this.isOpened = true;
        }
    },
    close() {
        return (event) => {
            event.stopPropagation();
            this.wrap.style.display = "none";
            this.wrap.offsetHeight;
            this.wrap.style.opacity = 0;
            this.isOpened = false;
        }
    },
    next() {
        return () => {
            if (this.currentIndex < this.list.length - 1) {
                (this.hideList())();
                this.pagination[this.currentIndex].classList.toggle('dot-active')
                this.currentIndex += 1;
                (this.showList())();
                this.pagination[this.currentIndex].classList.toggle('dot-active')
            }
        }
    },
    prev() {
        return () => {
            if (this.currentIndex > 0) {
                (this.hideList())();
                this.pagination[this.currentIndex].classList.toggle('dot-active')
                this.currentIndex -= 1;
                (this.showList())();
                this.pagination[this.currentIndex].classList.toggle('dot-active')
            }
        }
    },
    showList() {
        return () => {
            this.list[this.currentIndex].style.display = "block"
            this.list[this.currentIndex].offsetHeight;
            this.list[this.currentIndex].style.opacity = 1
        }

    },
    hideList() {
        return () => {
            this.list[this.currentIndex].style.opacity = 0;
            this.list[this.currentIndex].offsetHeight;
            this.list[this.currentIndex].style.display = "none"
        }
    }
}

export default popUp