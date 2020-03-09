import { MemoryGame } from './memory-game.js'
import { QuizGameRef } from './quiz-game.js'
import { WeatherApp } from './weather.js'
import { Chat } from './chat.js'

const components = document.querySelector('.components')
const imgMem = document.querySelector('#logo-mem')
const imgQuiz = document.querySelector('#logo-quiz')
const imgChat = document.querySelector('#logo-chat')
const imgWeather = document.querySelector('#logo-weather')

imgMem.addEventListener('click', event => {
  setTimeout(() => {
    components.appendChild(new MemoryGame())
  }, 0)
})
imgQuiz.addEventListener('click', e => {
  setTimeout(() => {
    components.appendChild(new QuizGameRef())
  }, 0)
})
imgChat.addEventListener('click', e => {
  setTimeout(() => {
    components.appendChild(new Chat())
  }, 0)
})

imgWeather.addEventListener('click', e => {
  setTimeout(() => {
    components.appendChild(new WeatherApp())
  }, 0)
})
