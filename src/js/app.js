import { MemoryGame } from './memory-game.js'
import { QuizGameRef } from './quiz-game.js'
import { Drag } from './drag.js'
const components = document.querySelector('.components')
const img = document.querySelector('#logo-mem')
img.addEventListener('click', event => {
  components.appendChild(new MemoryGame())
})

// Maybe track z index in app.js
