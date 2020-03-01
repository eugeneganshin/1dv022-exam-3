const pictures = document.createElement('template')
pictures.innerHTML = `
<a href="#"><img src="image/memory-game/0.png" /></>
`
const templateMem = document.createElement('template')
templateMem.innerHTML = `
<style>
img {
  min-width: 50px;
  max-width: 100px;
}
.container {
  border-radius: 25px 25px 25px 25px;
  z-index: 9;
  width: 412px;
  min-height:200px;
  background-color: #f1f1f1;
  border: 1px solid #f1f1f1;
  text-align: center;
  position: absolute;
  padding-bottom: 20px;
}
.header {
  border-radius: 25px 25px 0px 0px;
  padding: 10px;
  z-index: 10;
  background-color: #2196F3;
  color: #fff;
  cursor: move;
  
}
}
.display {
  background-color: #2196F3;
}
.hide {
  visibility: hidden;
}
.menu {
  background-color: #2196F3;
  text-align: center;
  position:absolute;
  bottom: 0;
  width:412px;
  border-radius: 0px 0px 25px 25px;
}
</style>
<div class="container">
  <div class="header"></div>
  <div class="display"></div>
  <div class="menu">
    <div id="allButtons">
      <button id="easy">Easy</button>
      <button id="medium">Medium</button>
    </div>
  </div>
</div>
`

export class MemoryGame extends window.HTMLElement {
  constructor () {
    super()

    this.attachShadow({ mode: 'open' })
    this.shadowRoot.appendChild(templateMem.content.cloneNode(true))

    this.allBtn = this.shadowRoot.querySelector('#allButtons')
    this.display = this.shadowRoot.querySelector('.display')
    this.header = this.shadowRoot.querySelector('.header')
    this.container = this.shadowRoot.querySelector('.container')
    this.self = this

    this.turn1 = null
    this.turn2 = null
    this.lastTile = null
    this.pairs = 0
    this.try = 0

    this.isDown = false
    this.elementX = 0
    this.elementY = 0
  }

  connectedCallback () {
    this.header.addEventListener('mousedown', e => {
      this.onMouseDown(e)
      console.log('click')
    })
    document.addEventListener('mouseup', e => {
      this.onMouseUp(e)
    })
    document.addEventListener('mousemove', e => {
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

  updateLevel (param) {
    if (param === 'easy') {
      this.getArrayOfPictures(8)
    } else {
      this.getArrayOfPictures(16)
    }
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

  delegate (tiles) {
    while (this.display.firstChild) {
      this.display.removeChild(this.display.firstChild)
    }
    const imgElem = pictures.content.childNodes[1].childNodes[0]
    tiles.forEach((tile, index) => {
      imgElem.setAttribute('data-img-number', index)
      this.display.appendChild(pictures.content.cloneNode(true))
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
          console.log(this.turn1)
          console.log(this.turn2)

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

  onMouseDown (e) {
    this.isDown = true

    this.mouseX = e.clientX
    this.mouseY = e.clientY
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
