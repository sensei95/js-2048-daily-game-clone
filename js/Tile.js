export default class Tile {

    #tileElement;
    #x;
    #y;
    #value;

    constructor(gameBoardElm, value = Math.random() > .5 ? 2:4) {
        this.#tileElement = document.createElement('div')
        this.#tileElement.classList.add('tile')
        gameBoardElm.appendChild(this.#tileElement)
        this.value = value
    }

    set x(value) {
        this.#x = value
        this.#tileElement.style.setProperty('--x',this.#x)
    }

    set y(value) {
        this.#y = value
        this.#tileElement.style.setProperty('--y',this.#y)
    }

    set value(value) {
        this.#value = value
        this.#tileElement.textContent = value

        const power = Math.log2(value)

        const backgroundLightness = 100 - power * 9

        this.#tileElement.style.setProperty('--background-lightness', `${backgroundLightness}%`)
        this.#tileElement.style.setProperty('--text-lightness', `${backgroundLightness <= 50 ? 90 : 10}%`)

    }

    get value() {
        return this.#value
    }

    remove() {
        this.#tileElement.remove()
    }

    waitForTransition(animation = false) {
        return new Promise( resolve => {
            this.#tileElement.addEventListener(animation ? 'animationend' : 'transitionend',resolve, { once:true })
        })
    }
}