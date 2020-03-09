import { weatherTemplate } from './templates.js'

export class WeatherApp extends window.HTMLElement {
  constructor () {
    super()
    this.attachShadow({ mode: 'open' })
    this.shadowRoot.appendChild(weatherTemplate.content.cloneNode(true))

    this.container = this.shadowRoot.querySelector('.container')
    this.header = this.shadowRoot.querySelector('.header')
    this.notificationElement = this.shadowRoot.querySelector('.notification')
    this.weatherContainer = this.shadowRoot.querySelector('.weather-container')
    this.iconElement = this.shadowRoot.querySelector('.weather-icon')
    this.tempElement = this.shadowRoot.querySelector('.temperature-value p')
    this.descElement = this.shadowRoot.querySelector('.temperature-description p')
    this.locationElement = this.shadowRoot.querySelector('.location p')

    this.weather = {
      temperature: {
        value: 18,
        unit: 'celsius'
      },
      description: 'few clouds',
      iconId: '01d',
      city: 'London',
      country: 'GB'
    }
  }

  connectedCallback () {

  }
}

window.customElements.define('x-weather', WeatherApp)
