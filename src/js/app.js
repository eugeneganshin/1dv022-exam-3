import { MemoryGame } from './memory-game.js'
import { QuizGameRef } from './quiz-game.js'
import { Drag } from './drag.js'
import { Chat } from './chat.js'
const components = document.querySelector('.components')
const img = document.querySelector('#logo-mem')
img.addEventListener('click', event => {
  setTimeout(() => {
    components.appendChild(new MemoryGame())
  }, 0)
})

// Maybe track z index in app.js

// Maybe inside of webcomponent i can write a custom attribuet so when i click
// on the element header i assign it attribute "checked" and then i
// change z-index to 1

// add limit viewport
