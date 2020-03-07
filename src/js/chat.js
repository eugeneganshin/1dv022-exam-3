import { templateChat_ } from './templates.js'

export class Chat extends window.HTMLElement {
  constructor () {
    super()

    this.attachShadow({ mode: 'open' })
    this.shadowRoot.appendChild(templateChat_.content.cloneNode(true))

    this.divComponents = document.querySelector('.components')
    this.header = this.shadowRoot.querySelector('.header')
    this.container = this.shadowRoot.querySelector('.container')

    this.constainerStart = this.shadowRoot.querySelector('.container-start')
    this.startForm = this.shadowRoot.querySelector('#username')
    this.startBtn = this.shadowRoot.querySelector('#start')

    this.display = this.shadowRoot.querySelector('.display')
    this.inputMsg = this.shadowRoot.querySelector('#input-msg')
    this.messages = this.shadowRoot.querySelector('#messages')
    this.sendBtn = this.shadowRoot.querySelector('#send')

    this.username = 'Anon'
    this.style.zIndex = 10
  }

  connectedCallback () {
    this.getPosition()
    this.addEventListener('mousedown', e => {
      this.setZindex()
    })
    this.startForm.addEventListener('input', event => {
      this._validateForm()
    })
    this.startBtn.addEventListener('click', e => {
      this.username = this.startForm.value
      this._hideStartForm()
      this._showChatDisplay()
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
  }

  /**
   *  Validates the input field if its empty
   */
  _validateForm () {
    const inputVal = this.shadowRoot.querySelector('#username').value
    if (!inputVal) {
      this.startBtn.disabled = true
    } else {
      this.startBtn.disabled = false
    }
  }

  _showChatDisplay () {
    this.display.style.display = 'block'
  }

  _hideStartForm () {
    this.constainerStart.style.display = 'none'
  }

  /**
   * REFACTOR FOR CHAT
   * Checks if the local storage does already have scoreBoard key
   * If it does not,  then it creates an object and stringify it to sent to local storage as key
   * If scoreBoard already exists, it parses the key and pushes new values to it
   * Saves the username value to local storage as a JSON object
   * @param {string} username
   * @param {string} time
   * @memberof QuizGameRef
   */
  saveToLocalStorage (username, time) {
    let players = window.localStorage.getItem('scoreBoard')
    if (players === null) {
      let players = []
      players[0] = { name: username, score: time }
      players = JSON.stringify(players)
      window.localStorage.setItem('scoreBoard', players)
      return JSON.parse(players)
    } else {
      players = JSON.parse(players)
      players.push({ name: username, score: time })
      this.sortScore(players)
    }
    players = JSON.stringify(players)
    window.localStorage.setItem('scoreBoard', players)
    return JSON.parse(players)
  }

  /**
   * Tracks highest zIndex in parent node and updates the current one
   */
  setZindex () {
    let max = 0
    const divChildren = this.divComponents.childNodes
    divChildren.forEach((element, index) => {
      if ((element.tagName === 'X-GAME') || (element.tagName === 'X-QUIZ-GAME') || (element.tagName === 'X-CHAT')) {
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

window.customElements.define('x-chat', Chat)
