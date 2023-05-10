import axios from "axios";
import { kelvinToCelcius } from "../utils/kelvinToCelcius";
import { KelvinToFarenheit } from "../utils/KelvinToFarenheit";
import { getIconById } from "../utils/getIconById";

export const getCurrentWeather = async (lat, lon) => {
   try {
    const apiKey = '70a06d85d0887d5152966f414798e701';
    const params = {lat, lon, appid:apiKey};
    const res = await axios.get('https://api.openweathermap.org/data/2.5/weather', { params,  });
    return {
        country: res.data.sys.country,
        city: res.data.name,
        humidity:res.data.main.humidity,
        weather: {
            description: res.data.weather[0].description,
            main: res.data.weather[0].main,
            icon: getIconById(res.data.weather[0].icon),
        },
        temperature: {
            main:{
                kelvin: res.data.main.temp,
                celcius: kelvinToCelcius(res.data.main.temp),
                farenheit: KelvinToFarenheit(res.data.main.temp),
            },
            min:{
                kelvin: res.data.main.temp_min,
                celcius: kelvinToCelcius(res.data.main.temp_min),
                farenheit: KelvinToFarenheit(res.data.main.temp_min),
            },
            max:{
                kelvin: res.data.main.temp_max,
                celcius: kelvinToCelcius(res.data.main.temp_max),
                farenheit: KelvinToFarenheit(res.data.main.temp_max),
            },
        },
        
    }
   } catch (error) {
    console.log(error)
   }
}