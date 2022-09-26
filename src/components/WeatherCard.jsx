import React, { useState } from 'react'

const WeatherCard = ({weather, temperature}) => {
  const [isCelsius, setIsCelsius] = useState(true)
  const changeTemperature = () => setIsCelsius(!isCelsius)

  console.log(weather);

  return (
    <article className='card'>
      <h1 className='title-card'>Weather App</h1>
      <h2 className='country-card'>{`${weather?.name}, ${weather?.sys.country}`}</h2>
      <section className='card-first-section'>
        <img src={weather && `http://openweathermap.org/img/wn/${weather?.weather[0].icon}@2x.png`} alt="" />
      
      </section>
      <section className='card-second-section'>
        <h3 className='description'>"{weather?.weather[0].description}"</h3>
        <ul className='list-description'>
          <li><i className='bx-tada-hover bx bx-wind'></i><span>Wind Speed</span> {weather?.wind.speed} m/s</li>
          <li><i className='bx-tada-hover bx bxs-cloud' ></i><span>Clouds</span> {weather?.clouds.all}%</li>
          <li><i className='bx-tada-hover bx bxs-thermometer'></i><span>Pressure</span> {weather?.main.pressure} hPa</li>
        </ul>
      </section>
      <h2 className='temperature'>{isCelsius ? `${temperature?.celsius} °C` : `${temperature?.fahrenheit} °F`}</h2>
      <button className='btn-76 button-change-temperature' onClick={changeTemperature}>{isCelsius ? 'Change to °F' : 'Change to °C'}</button>
    </article>
  )
}

export default WeatherCard