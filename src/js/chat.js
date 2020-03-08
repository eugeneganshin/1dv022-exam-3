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
    this.closeBtn = this.shadowRoot.querySelector('#close')
    this.changeNick = this.shadowRoot.querySelector('#change-nick')

    this.menu = this.shadowRoot.querySelector('.menu')
    this.inputMsg = this.shadowRoot.querySelector('#input-msg')
    this.messages = this.shadowRoot.querySelector('.messages')
    this.sendBtn = this.shadowRoot.querySelector('#send')

    this.username = 'Anon'
    this.style.zIndex = 10
  }

  connectedCallback () {
    /**
     * Helper functions
     * @function checkLocalStorage if username exists, opens chat display
     * @function getPosition changes offset position based on parent div
     * @function setZindex sets zIndex to 10
     */
    this.checkLocalStorage()
    this.getPosition()
    this.addEventListener('mousedown', e => {
      this.setZindex()
    })

    /**
     * Functions for draging web component
     */
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

    /**
     * Registration menu
     */
    this.startForm.addEventListener('input', e => {
      this._validateForm()
    })
    this.startBtn.addEventListener('click', e => {
      this.username = this.startForm.value
      this.saveToLocalStorage(this.startForm.value)
      this._hideStartForm()
      this._showChatDisplay()
      this._showMenu()
    })

    /**
     * Top bar menu
     */
    this.closeBtn.addEventListener('click', e => {
      e.preventDefault()
      window.setTimeout(() => {
        this.divComponents.removeChild(this)
      }, 0)
    })
    this.changeNick.addEventListener('click', e => {
      this._hideChatDisplay()
      this._hideMenu()
      this._showStartForm()
    })

    /**
     * Input field and send button menu
     */
    this.inputMsg.addEventListener('keydown', e => {
      if (e.keyCode === 13) {
        this.getNameAndMsg(this.inputMsg.value)
        this.inputMsg.value = ''
        this.messages.scrollTop = this.messages.scrollHeight
      }
    })
    this.sendBtn.addEventListener('click', e => {
      this.getNameAndMsg(this.inputMsg.value)
      this.inputMsg.value = ''
    })

    /**
     * Web socket
     */
    this.socket = new window.WebSocket('ws://vhost3.lnu.se:20080/socket/')
    this.socket.addEventListener('open', e => {

    })
    this.socket.addEventListener('message', e => {
      this.renderData(e.data)
    })
  }

  renderData (data) {
    console.log(JSON.parse(data))
    const parsed = JSON.parse(data)
    if ((parsed.data === 'You are connected!') || (parsed.type === 'heartbeat')) {

    } else {
      const template = document.createElement('template')
      template.innerHTML = `
      <p id="msg"><span id="u-name">${parsed.username}: </span>${parsed.data}</p>
      <style> #msg { color: green; } #u-name { color: red; } </style>`
      this.messages.appendChild(template.content.cloneNode(true))
    }
  }

  /**
   * Checks for input field and username
   * Creates object for websocket and stringifies it
   * Sends JSON object to  @function sendMsg
   * @param {string} msg input field value of chat menu
   */
  getNameAndMsg (msg) {
    const data = {
      type: 'message',
      data: `${msg}`,
      username: `${this.username}`,
      channel: 'my, not so secret, channel',
      key: 'eDBE76deU7L0H9mEBgxUKVR0VCnq0XBd'
    }
    this.sendMsg(JSON.stringify(data))
  }

  /**
   * Simply sends message to the server
   * @param {JSON object} data
   */
  sendMsg (data) {
    this.socket.send(data)
  }

  /**
   *  Checks the localstorage for username
   *  If already exists, shows chat display
   */

  checkLocalStorage () {
    const user = window.localStorage.getItem('username')
    if (user) {
      const username = JSON.parse(user)
      this.username = username.name
      this._hideStartForm()
      this._showChatDisplay()
      this._showMenu()
    }
  }

  /**
   * Clears local storage and creates new JSON obj with username
   * @param {string} username
   */
  changeLocalStorage (username) {
    let user = window.localStorage.getItem('username')
    window.localStorage.clear()
    user = { name: username }
    user = JSON.stringify(user)
    window.localStorage.setItem('username', user)
    return JSON.parse(user)
  }

  /**
   * Checks if username exists, if not creates new JSON object with username
   * @param {string} username
   */
  saveToLocalStorage (username) {
    let user = window.localStorage.getItem('username')
    if (user === null) {
      user = { name: username }
      user = JSON.stringify(user)
      window.localStorage.setItem('username', user)
      return JSON.parse(user)
    } else {
      window.localStorage.clear()
      user = { name: username }
      user = JSON.stringify(user)
      window.localStorage.setItem('username', user)
      return JSON.parse(user)
    }
  }

  /**
   * Validates the input field if its empty
   */
  _validateForm () {
    const inputVal = this.shadowRoot.querySelector('#username').value
    if (!inputVal) {
      this.startBtn.disabled = true
    } else {
      this.startBtn.disabled = false
    }
  }

  /**
   * Helper functions below to render DOM
   */
  _showMenu () {
    this.menu.style.display = 'block'
  }

  _hideMenu () {
    this.menu.style.display = 'none'
  }

  _hideChatDisplay () {
    this.messages.style.display = 'none'
  }

  _showChatDisplay () {
    this.messages.style.display = 'block'
  }

  _hideStartForm () {
    this.constainerStart.style.display = 'none'
  }

  _showStartForm () {
    this.constainerStart.style.display = 'block'
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
