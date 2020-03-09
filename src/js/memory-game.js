import { templateMem_, templatePic_ } from './templates.js'

export class MemoryGame extends window.HTMLElement {
  constructor () {
    super()

    this.attachShadow({ mode: 'open' })
    this.shadowRoot.appendChild(templateMem_.content.cloneNode(true))

    this.divComponents = document.querySelector('.components')
    this.allBtn = this.shadowRoot.querySelector('#allButtons')
    this.display = this.shadowRoot.querySelector('.display')
    this.header = this.shadowRoot.querySelector('.header')
    this.container = this.shadowRoot.querySelector('.container')
    this.close = this.shadowRoot.querySelector('#close-btn')
    this.self = this

    this.turn1 = null
    this.turn2 = null
    this.lastTile = null
    this.pairs = 0
    this.try = 0

    this.isDown = false
    this.elementX = this.container.offsetTop
    this.elementY = this.container.offsetLeft
    this.style.zIndex = 10
  }

  connectedCallback () {
    this.getPosition()
    this.addEventListener('mousedown', e => {
      this.setZindex()
    })
    this.close.addEventListener('click', event => {
      event.preventDefault()
      window.setTimeout(() => {
        this.divComponents.removeChild(this)
      }, 0)
    })
    this.header.addEventListener('mousedown', e => {
      this.onMouseDown(e)
    })
    document.addEventListener('mouseup', e => {
      e.preventDefault()
      this.onMouseUp(e)
    })
    document.addEventListener('mousemove', e => {
      e.preventDefault()
      this.onMouseMove(e)
    })
    this.allBtn.addEventListener('click', event => {
      if (event.target.id === 'easy') {
        this.updateLevel('easy')
      } else if (event.target.id === 'medium') {
        this.updateLevel('medium')
      } else {}
    })
  }

  getArrayOfPictures (condition) {
    const arr = []
    let i
    for (i = 1; i <= condition / 2; i++) {
      arr.push(i)
      arr.push(i)
      arr.sort(() => Math.random() - 0.5)
    }
    this.delegate(arr)
  }

  updateLevel (param) {
    if (param === 'easy') {
      this.getArrayOfPictures(8)
    } else {
      this.getArrayOfPictures(16)
    }
  }

  delegate (tiles) {
    while (this.display.firstChild) {
      this.display.removeChild(this.display.firstChild)
    }
    const imgElem = templatePic_.content.childNodes[1].childNodes[0]
    tiles.forEach((tile, index) => {
      imgElem.setAttribute('data-img-number', index)
      this.display.appendChild(templatePic_.content.cloneNode(true))
    })
    this.display.addEventListener('click', event => {
      const img = event.target.nodeName === 'IMG' ? event.target : event.target.firstElementChild
      const index = parseInt(img.getAttribute('data-img-number'))
      this.turnBrick(tiles[index], index, img)
    })
  }

  turnBrick (tile, index, img) {
    if (this.turn2) { return }
    img.src = 'image/memory-game/' + tile + '.png'
    if (!this.turn1) {
      // First picture is clicked
      this.turn1 = img
      this.lastTile = tile
    } else {
      // Second picture is clicked
      if (img === this.turn1) { return }
      this.try++
      this.turn2 = img
      if (tile === this.lastTile) {
        // Winning condition
        this.pairs++
        if (this.pairs === this.display.childElementCount / 2) {
          console.log(`Won on ${this.try} number of tries`)
        }

        window.setTimeout(() => {
          this.turn1.classList.add('hide')
          this.turn2.classList.add('hide')

          this.turn1 = null
          this.turn2 = null
        }, 50)
      } else {
        window.setTimeout(() => {
          this.turn1.src = 'image/memory-game/0.png'
          this.turn2.src = 'image/memory-game/0.png'

          this.turn1 = null
          this.turn2 = null
        }, 500)
      }
    }
  }

  /**
   * Tracks highest zIndex in parent node and updates the current one
   */
  setZindex () {
    let max = 0
    const divChildren = this.divComponents.childNodes
    divChildren.forEach((element, index) => {
      if ((element.tagName === 'X-GAME') ||
          (element.tagName === 'X-QUIZ-GAME') ||
          (element.tagName === 'X-CHAT') ||
          (element.tagName === 'X-WEATHER')) {
        let z = 0
        z = parseInt((element.style.zIndex), 10)
        if ((z > max) && (z !== 'auto')) {
          max = z
          this.style.zIndex = max + 1
        }
      }
    })
  }

  /**
   * Changes position of new element based on length of parent node
   */
  getPosition () {
    if (this.divComponents.children.length > 0) {
      this.container.style.top = `${this.divComponents.children.length * 10}px`
      this.container.style.left = `${this.divComponents.children.length * 10}px`
    }
  }

  /**
   * Functions below are for dragging the element
   * @param {event} e The event
   */
  onMouseDown (e) {
    this.isDown = true

    this.mouseX = e.clientX
    this.mouseY = e.clientY

    this.elementX = parseInt(this.container.style.left) || 0
    this.elementY = parseInt(this.container.style.top) || 0
  }

  onMouseUp (e) {
    this.isDown = false

    this.elementX = parseInt(this.container.style.left) || 0
    this.elementY = parseInt(this.container.style.top) || 0
  }

  onMouseMove (e) {
    e.preventDefault()
    if (!this.isDown) return
    const deltaX = e.clientX - this.mouseX
    const deltaY = e.clientY - this.mouseY
    this.container.style.left = this.elementX + deltaX + 'px'
    this.container.style.top = this.elementY + deltaY + 'px'
  }
}

window.customElements.define('x-game', MemoryGame)
