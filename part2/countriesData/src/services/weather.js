import axios from "axios";

const api = import.meta.env.VITE_WEATHER_API_KEY

const getWeather = (name) => 
    axios
        .get(`https://api.openweathermap.org/data/2.5/weather?q=${name}&appid=${api}`)
        .then(response => response.data)

export default getWeather