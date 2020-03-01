const templateDrag = document.createElement('template')
templateDrag.innerHTML = `
<style>
#container {
  z-index: 9;
  width: 412px;
  min-height:200px;
  background-color: #f1f1f1;
  border: 1px solid #d3d3d3;
  text-align: center;
  position: absolute;
}

#header {;
  padding: 10px;
  z-index: 10;
  background-color: #2196F3;
  color: #fff;
  cursor: move;
  display: flex;
}

.display {
  height:200px;
}

img {
  min-width: 50px;
  max-width: 100px;
}

</style>
<div id="container">
  <div id="header"></div>
  <div class="display">
  </div>
  <div class="menu">
    <div id="allButtons">
      <button id="easy">Easy</button>
      <button id="medium">Medium</button>
    </div>
  </div>
</div>
`

export class Drag extends window.HTMLElement {
  constructor () {
    super()

    this.attachShadow({ mode: 'open' })
    this.shadowRoot.appendChild(templateDrag.content.cloneNode(true))

    this.container = this.shadowRoot.querySelector('#container')
    this.header = this.shadowRoot.querySelector('#header')
    this.main = document.querySelector('.main')
    this.isDown = false
    this.elementX = 0
    this.elementY = 0
  }

  connectedCallback () {
    this.header.addEventListener('mousedown', e => {
      this.onMouseDown(e)
    })
    this.main.addEventListener('mouseup', e => {
      this.onMouseUp(e)
    })
    this.main.addEventListener('mousemove', e => {
      this.onMouseMove(e)
    })
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

window.customElements.define('x-drag', Drag)

// drag () {
//   var mousemove = function (e) { // document mousemove
//     this.style.left = (e.clientX - this.dragStartX) + 'px'
//     this.style.top = (e.clientY - this.dragStartY) + 'px'
//     console.log(this)
//   }.bind(this)

//   var mouseup = function (e) { // document mouseup
//     document.removeEventListener('mousemove', mousemove)
//     document.removeEventListener('mouseup', mouseup)
//     console.log(this)
//   }

//   this.addEventListener('mousedown', function (e) { // element mousedown
//     this.dragStartX = e.offsetX
//     this.dragStartY = e.offsetY

//     document.addEventListener('mousemove', mousemove)
//     document.addEventListener('mouseup', mouseup)
//     console.log(this)
//   }.bind(this))

//   this.style.position = 'absolute' // fixed might work as well
// }

// ////////////
// // working fiddle
// this.isDown = false
// this.elementX = 0
// this.elementY = 0
// }

// connectedCallback () {
// this.container.addEventListener('mousedown', e => {
//   this.onMouseDown(e)
// })
// this.container.addEventListener('mouseup', e => {
//   this.onMouseUp(e)
// })
// document.addEventListener('mousemove', e => {
//   this.onMouseMove(e)
// })
// }

// onMouseDown (e) {
// this.isDown = true

// this.mouseX = e.clientX
// this.mouseY = e.clientY
// }

// onMouseUp (e) {
// this.isDown = false

// this.elementX = parseInt(this.container.style.left) || 0
// this.elementY = parseInt(this.container.style.top) || 0
// }

// onMouseMove (e) {
// if (!this.isDown) return
// const deltaX = e.clientX - this.mouseX
// const deltaY = e.clientY - this.mouseY
// this.container.style.left = this.elementX + deltaX + 'px'
// this.container.style.top = this.elementY + deltaY + 'px'
// }

/** last one */
// this.isDown = false
// this.elementX = 0
// this.elementY = 0
// }

// connectedCallback () {
// this.header.addEventListener('mousedown', e => {
//   this.onMouseDown(e)
// })
// document.addEventListener('mousemove', e => {
//   this.onMouseMove(e)
// })
// document.addEventListener('mouseup', e => this.onMouseUp())
// }

// onMouseDown (e) {
// this.isDown = true
// this.mouseX = e.clientX
// this.mouseY = e.clientY
// }

// onMouseMove (e) {
// if (this.isDown) {
//   this.container.style.left = (e.clientX - this.mouseX) + 'px'
//   this.container.style.top = (e.clientY - this.mouseY) + 'px'
// }
// }

// onMouseUp () {
// this.isDown = false
// this.elementX = parseInt(this.container.style.left) || 0
// this.elementY = parseInt(this.container.style.top) || 0
// }
