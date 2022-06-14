const animElements = Array.from(document.querySelectorAll('.slide2__details div'));

const animation = {
    elements: animElements,
    prepare() {
        return () => {
            this.elements.forEach(element => {
                element.style.transform = 'translate(100px, 45px)';
                element.style.opacity = 0;
            });
        }
    },
    go() {
        return () => {
            this.elements.forEach((element, index) => {

                if (index >= 1 && index <= 2) {
                    element.style.transform = 'translate(0px, 0px)';
                    element.style.opacity = 1;
                } else {
                    setTimeout(() => {
                        element.style.transform = 'translate(0px, 0px)';
                        element.style.opacity = 1;
                    }, 500, element);
                }

            })
        }
    },
    work() {
        document.addEventListener('astart', this.go());
        document.addEventListener('aprepare', this.prepare());
        (this.prepare()());
    }
}

export default animation