import React, {useState, useEffect} from 'react'
import axios from 'axios'

const WeatherData = ({ capital }) => {
    const [ weatherData, setWeaterData ] = useState('')
    const api_key = process.env.REACT_APP_API_KEY
    const api_request = `http://api.weatherstack.com/current?access_key=${api_key}&query=${capital}`
    //for api_key you need to register to: https://weatherstack.com/ and run as: REACT_APP_API_KEY=YOUR_KEY npm start
    const hook = () => {    
        axios
          .get(api_request)
          .then(response => {
              setWeaterData(response.data)
          })
      }

    useEffect(hook, [])
    if ( !weatherData || weatherData.success === false) return (<div>Somthing went wrong, can't show live weather... <br/></div>)
	
	return (
		<div>
			<p><strong>temperature</strong> {weatherData.current.temperature} Celsius<br />
			<img src={weatherData.current.weather_icons[0]} alt={weatherData.current.weather_descriptions}/></p>
			<p><strong>wind speed</strong> {weatherData.current.wind_speed} km/h, direction {weatherData.current.wind_dir}  </p>
		</div>		
	)
}
      

export default WeatherData