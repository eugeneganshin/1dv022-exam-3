import { weatherTemplate } from './templates.js'

export class WeatherApp extends window.HTMLElement {
  constructor () {
    super()
    this.attachShadow({ mode: 'open' })
    this.shadowRoot.appendChild(weatherTemplate.content.cloneNode(true))

    this.container = this.shadowRoot.querySelector('.container')
    this.header = this.shadowRoot.querySelector('.header')

    this.weatherContainer = this.shadowRoot.querySelector('.weather-container')
    this.iconElement = this.shadowRoot.querySelector('.weather-icon')
    this.tempElement = this.shadowRoot.querySelector('.temperature-value p')
    this.descElement = this.shadowRoot.querySelector('.temperature-description p')
    this.locationElement = this.shadowRoot.querySelector('.location p')
    this.notificationElement = this.shadowRoot.querySelector('.notification')

    this.key = 'd60a65e960f9e14c5af9fae26c15f36a'
    this.kelvin = 273
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
    console.log(this)
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(position => {
        const latutude = position.coords.latitude
        const longitude = position.coords.longitude
        this.getWeather(latutude, longitude)
      }, error => {
        this.notificationElement.style.display = 'block'
        this.notificationElement.innerHTML = `<p>${error.message}</p>`
      })
    } else {
      this.notificationElement.style.display = 'block'
      this.notificationElement.innerHTML = '<p>Browser does not support Geolocation</p>'
    }
    // this.tempElement.addEventListener('click', e => {
    //   if (this.weather.temperature.value === undefined) return
    //   if (this.weather.temperature.unit === 'celsius') {
    //     this.celsiusToFahrenheit(this.weather.temperature.value)
    //     this.fahrenheit = Math.floor(this.fahrenheit)
    //     this.tempElement = `${this.fahrenheit}° <span>F</span>`
    //     this.weather.temperature.unit = 'fahrenheit'
    //   } else {
    //     this.tempElement = `${this.weather.temperature.value}° <span>C</span>`
    //     this.weather.temperature.unit = 'celsius'
    //   }
    // })
  }

  async getWeather (latitude, longitude) {
    const api = `http://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${this.key}`
    console.log(api)
    let response = await window.fetch(api)
    response = await response.json()
    const data = response
    console.log(data)
    this.weather.temperature.value = Math.floor(data.main.temp - this.kelvin)
    this.weather.description = data.weather[0].description
    this.weather.iconId = data.weather[0].icon
    this.weather.city = data.name
    this.weather.country = data.sys.country
    await this.displayWeather()
  }

  async displayWeather () {
    this.iconElement.innerHTML = `<img src="/image/weather/${this.weather.iconId}.png">`
    this.tempElement.innerHTML = `${this.weather.temperature.value}° <span>C</span>`
    this.descElement.innerHTML = this.weather.description
    this.locationElement.innerHTML = `${this.weather.city}, ${this.weather.country}`
  }

  getCurrentPosition (setPosition, error) {
  }

  celsiusToFahrenheit (value) {
    this.fahrenheit = (this.weather.temperature * 9 / 5) + 23
    return Math.floor(this.fahrenheit)
  }
}

window.customElements.define('x-weather', WeatherApp)
