const template = document.createElement('template')
template.innerHTML = `
<div class="container">
 <div class="header"><p id="close">x</p></div>
 <div class="container-start">
    <form id="start-form">
      <label for="username">Username:</label>
      <input type="text" id="username" name="username">
    </form><br>
    <p id="p-inline">Start chatting </p><button id="start" disabled>Start</button>
  </div>
 <div class="display">
  <ul id="messages">
    <li>hey</li>
    <li>hi</li>
    <li>lol</li>
  </ul>
  <input id="input-msg" type="text">
  <button id="send">Send</button>
 </div>
 <div class="menu"></div>
</div>

<style>
.container {
  border-radius: 8px 8px 2px 2px;
  z-index: 10;
  min-width: 420px;
  background-color: #f1f1f1;
  border: 1px solid #f1f1f1;
  text-align: center;
  position: absolute;
  top:0;
  left: 0px;
  padding-bottom: 20px;
}
.header {
  border-radius: 8px 8px 0px 0px;
  padding: 10px;
  z-index: 10;
  background-color: #2196F3;
  color: #fff;
  cursor: move;
}

#close {
  display: inline;
  margin: 0;
  padding: 0px 20px 0px 0px;
  margin-top: -10px;
  float: right;
  cursor: pointer;
}

.display {
  display: none;
  min-height:200px;
}

.container-start {
  margin-top: 10px;
}

#p-inline {
  display: inline;
}
</style>
`

export class Chat extends window.HTMLElement {
  constructor () {
    super()

    this.attachShadow({ mode: 'open' })
    this.shadowRoot.appendChild(template.content.cloneNode(true))

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
  }

  connectedCallback () {
    this.startForm.addEventListener('input', event => {
      this._validateForm()
    })
    this.startBtn.addEventListener('click', e => {
      this.username = this.startForm.value
      this._hideStartForm()
      this._showChatDisplay()
      console.log(this.username)
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
}

window.customElements.define('x-chat', Chat)
