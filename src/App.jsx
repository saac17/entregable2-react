import axios from 'axios'
import { useEffect, useState } from 'react'
import './App.css'
import Loading from './components/Loading'
import WeatherCard from './components/WeatherCard'
import background from './utils/background'

function App() {
  const [coords, setCoords] = useState()
  const [weather, setWeather] = useState()
  const [temperature, setTemperature] = useState()
  
  useEffect(() => {
    const success = pos => {
      const obj = {
        lat: pos.coords.latitude,
        lon: pos.coords.longitude
      }
      setCoords(obj);
    }
    navigator.geolocation.getCurrentPosition(success)
  }, [])
  
  // --------------peticion de clima --------------

  useEffect(() => {
    if(coords){
      const APIKEY = '89613347985f613d4d6daf803040f64f'
      const URL = `https://api.openweathermap.org/data/2.5/weather?lat=${coords.lat}&lon=${coords.lon}&appid=${APIKEY}`
      axios.get(URL)
        .then(res => {
          const celsius = (res.data.main.temp - 273.15).toFixed(0)
          const fahrenheit = (celsius * 9 / 5 + 32).toFixed(0)
          setTemperature({celsius, fahrenheit})
          setWeather(res.data)
        })
        .catch(err => console.log(err))
    }
  }, [coords])

  //---------background----------
  
  let description = `${weather?.weather[0].description}`
  const backgroundImageURL = background[description];
    const containerStyle = {
      backgroundImage:
        `url(${backgroundImageURL})`,
      width: "100%",
      position: "center",
      backgroundSize: "cover",
      height: "100vh",
    }


  return (
    <div style={containerStyle} className="App">
      {
        weather ?
          <WeatherCard 
            weather={weather}
            temperature={temperature}
          />
        :
          <Loading />
      }
      
    </div>
  )
}

export default App
