import { weatherTemplate } from './templates.js'

export class WeatherApp extends window.HTMLElement {
  constructor () {
    super()
    this.attachShadow({ mode: 'open' })
    this.shadowRoot.appendChild(weatherTemplate.content.cloneNode(true))

    this.divComponents = document.querySelector('.components')
    this.close = this.shadowRoot.querySelector('#close-btn')
    this.container = this.shadowRoot.querySelector('.container')
    this.header = this.shadowRoot.querySelector('.header')

    this.weatherContainer = this.shadowRoot.querySelector('.weather-container')
    this.iconElement = this.shadowRoot.querySelector('.weather-icon')
    this.tempElement = this.shadowRoot.querySelector('.temperature-value p')
    this.descElement = this.shadowRoot.querySelector('.temperature-description p')
    this.locationElement = this.shadowRoot.querySelector('.location p')
    this.notificationElement = this.shadowRoot.querySelector('.notification')

    this.isDown = false
    this.elementX = this.container.offsetTop
    this.elementY = this.container.offsetLeft
    this.style.zIndex = 10

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
    /**
     * Checks if browser supports geolocation or if user accepted to share his geolocation
     * @function getCurrentPosition assings geolocation to variables
     * @function getWeather takes assigned variables to send to serever
     */
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

    /**
     * If user clicks on temperature unit changes it to fahrenheit
     */
    this.tempElement.addEventListener('click', e => {
      if (this.weather.temperature.value === undefined) return
      if (this.weather.temperature.unit === 'celsius') {
        this.fahrenheit = this.celsiusToFahrenheit(this.weather.temperature.value)
        this.tempElement.innerHTML = `${this.fahrenheit}°<span>F</span>`
        this.weather.temperature.unit = 'fahrenheit'
      } else {
        this.tempElement.innerHTML = `${this.weather.temperature.value}° <span>C</span>`
        this.weather.temperature.unit = 'celsius'
      }
    })

    /**
     *
     */
    this.getPosition()
    this.addEventListener('mousedown', e => {
      this.setZindex()
    })
    this.close.addEventListener('click', event => {
      event.preventDefault()
      window.setTimeout(() => {
        this.divComponents.removeChild(this)
      }, 0)
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
   * Sends geolocation to OpenWeather API and gets object that contains weather forecast data
   * Updates global object with weather
   * @param {string} latitude the latitude from broser geolocation api
   * @param {string} longitude the longitude from broser geolocation api
   */
  async getWeather (latitude, longitude) {
    const api = `http://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${this.key}`
    let response = await window.fetch(api)
    response = await response.json()
    const data = response
    this.weather.temperature.value = Math.floor(data.main.temp - this.kelvin)
    this.weather.description = data.weather[0].description
    this.weather.iconId = data.weather[0].icon
    this.weather.city = data.name
    this.weather.country = data.sys.country
    await this.displayWeather()
  }

  /**
   *  Renders webcomponent based on weather object
   */
  async displayWeather () {
    this.iconElement.innerHTML = `<img src="/image/weather/${this.weather.iconId}.png">`
    this.tempElement.innerHTML = `${this.weather.temperature.value}°<span>C</span>`
    this.descElement.innerHTML = this.weather.description
    this.locationElement.innerHTML = `${this.weather.city}, ${this.weather.country}`
  }

  /**
   * Converts celsius to fahrenheit
   * @param {number} value
   */
  celsiusToFahrenheit (value) {
    return Math.floor((value * 9 / 5) + 23)
  }

  /**
   * Tracks highest zIndex in parent node and updates the current one
   */
  setZindex () {
    let max = 0
    const divChildren = this.divComponents.childNodes
    divChildren.forEach((element, index) => {
      if ((element.tagName === 'X-GAME') || (element.tagName === 'X-QUIZ-GAME') || (element.tagName === 'X-CHAT') || (element.tagName === 'X-WEATHER')) {
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

window.customElements.define('x-weather', WeatherApp)
