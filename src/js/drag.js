const templateDrag = document.createElement('template')
templateDrag.innerHTML = `
<style>
#container {
  position: absolute;
  z-index: 9;
  background-color: #f1f1f1;
  border: 1px solid #d3d3d3;
  text-align: center;
}

#header {
  padding: 10px;
  cursor: move;
  z-index: 10;
  background-color: #2196F3;
  color: #fff;
}

</style>
<div id="container">
  <div id="header">Click</div>
</div>
`

export class Drag extends window.HTMLElement {
  constructor () {
    super()

    this.attachShadow({ mode: 'open' })
    this.shadowRoot.appendChild(templateDrag.content.cloneNode(true))

    this.container = this.shadowRoot.querySelector('#container')
    this.header = this.shadowRoot.querySelector('#header')

    this.pos1 = 0
    this.pos2 = 0
    this.pos3 = 0
    this.pos4 = 0
  }

  connectedCallback () {
    this.header.addEventListener('click', event => {
      this.dragMouseDown(event)
      event.preventDefault()
    })
  }

  dragMouseDown (event) {
    console.log(event)
    event = event || window.event
    this.pos3 = event.clientX
    this.pos4 = event.clientY
  }

  elementDrag (event) {
    console.log(event)
    event = event || window.event
  }
}

window.customElements.define('x-drag', Drag)
