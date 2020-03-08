import { weatherTemplate } from './templates.js'

export class WeatherApp extends window.HTMLElement {
  constructor () {
    super()
    this.attachShadow({ mode: 'open' })
    this.shadowRoot.appendChild(weatherTemplate.content.cloneNode(true))
  }
}

window.customElements.define('x-weather', WeatherApp)
