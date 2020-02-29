const templateDrag = document.createElement('template')
templateDrag.innerHTML = `
<style>
#container {
  width: 100%;
  height: 400px;
  background-color: #333;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  border-radius: 7px;
  touch-action: none;
}
#item {
  width: 100px;
  height: 100px;
  background-color: rgb(245, 230, 99);
  border: 10px solid rgba(136, 136, 136, .5);
  border-radius: 50%;
  touch-action: none;
  user-select: none;
}
#item:active {
  background-color: rgba(168, 218, 220, 1.00);
}
#item:hover {
  cursor: pointer;
  border-width: 20px;
}
</style>
<div id="outerContainer">
    <div id="container">
      <div id="item">

    </div>
  </div>
</div>
`

export class Drag extends window.HTMLElement {
  constructor () {
    super()

    this.attachShadow({ mode: 'open' })
    this.shadowRoot.appendChild(templateDrag.content.cloneNode(true))

    this.dragItem = this.shadowRoot.querySelector('#item')
    this.container = this.shadowRoot.querySelector('#container')

    this.active = false
    this.currentX = 0
    this.currentY = 0
    this.initialX = 0
    this.initialY = 0
    this.xOffset = 0
    this.yOffset = 0
  }

  connectedCallback () {
    this.container.addEventListener('touchstart', this.dragStart, false)
    this.container.addEventListener('touchend', this.dragEnd, false)
    this.container.addEventListener('touchmove', this.drag, false)

    this.container.addEventListener('mousedown', this.dragStart, false)
    this.container.addEventListener('mouseup', this.dragEnd, false)
    this.container.addEventListener('mousemove', this.drag, false)
  }

  dragStart (e) {
    console.log(e)
    if (e.type === 'touchstart') {
      this.initialX = e.touches[0].clientX - this.xOffset
      this.initialY = e.touches[0].clientY - this.yOffset
    } else {
      this.initialX = e.clientX - this.xOffset
      this.initialY = e.clientY - this.yOffset
    }

    if (e.target === this.dragItem) {
      this.active = true
    }
  }

  dragEnd (e) {
    console.log(e)
    this.initialX = this.currentX
    this.initialY = this.currentY

    this.active = false
  }

  drag (e) {
    console.log(e)
    if (this.active) {
      e.preventDefault()

      if (e.type === 'touchmove') {
        this.currentX = e.touches[0].clientX - this.initialX
        this.currentY = e.touches[0].clientY - this.initialY
      } else {
        this.currentX = e.clientX - this.initialX
        this.currentY = e.clientY - this.initialY
      }

      this.xOffset = this.currentX
      this.yOffset = this.currentY

      this.setTranslate(this.currentX, this.currentY, this.dragItem)
    }
  }

  setTranslate (xPos, yPos, el) {
    el.style.transform = 'translate3d(' + xPos + 'px, ' + yPos + 'px, 0)'
  }
}

window.customElements.define('x-drag', Drag)
