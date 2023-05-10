import { getCoordinates } from './services/getCoordinates'
import { useEffect, useState } from 'react';
import { getCurrentWeather } from './services/getCurrentWeather';

import { ProgressBar } from 'react-loader-spinner'
import loader from './assets/icons/loader.svg'
import frame from './assets/icons/frame.svg'

import './App.css'
import DarkModeToggle from './components/DarkMode/DarkModeToggle';


function App() {
  const [weather, setWeather] = useState(null)
  const [background, setBackground] = useState();
  const [isCelcius, setIsCelsius] = useState(true)
  const image = [
    'https://cdn.pixabay.com/photo/2017/10/10/07/48/hills-2836301_960_720.jpg',
    'https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885_960_720.jpg',
    'https://cdn.pixabay.com/photo/2018/01/17/09/12/sunset-3087790_960_720.jpg',
    'https://cdn.pixabay.com/photo/2017/08/26/19/03/rain-2683964_960_720.jpg',
    'https://cdn.pixabay.com/photo/2016/06/25/17/36/rain-1479303_960_720.jpg',
    'https://media.istockphoto.com/id/531174219/es/foto/n%C3%ADvea-alley-en-la-ma%C3%B1ana.jpg?s=1024x1024&w=is&k=20&c=gW-NUStxpyMHQmR_-B4hDsx9tAXczgjG-tmedFNAox4=',
    'https://cdn.pixabay.com/photo/2016/07/22/16/29/fog-1535201_960_720.jpg',
    'https://cdn.pixabay.com/photo/2017/03/29/15/18/tianjin-2185510_960_720.jpg',
  ];

  const changeImage = (weather) => {
    if (weather.main === 'Clear') {
      setBackground(0);
    } else if (weather.main === 'Clouds') {
      setBackground(1);
    } else if (weather.main === 'Thunderstorm') {
      setBackground(2);
    } else if (weather.main === 'Drizzle') {
      setBackground(3);
    } else if (weather.main === 'Rain') {
      setBackground(4);
    } else if (weather.main === 'Snow') {
      setBackground(5);
    } else if (weather.main === 'Mist') {
      setBackground(6);
    } else {
      setBackground(7);
    }
  };


  useEffect(() => {
    const loadCoords = async () => {
     const coordinates = await getCoordinates();
     if(coordinates){
      const weatherData = await getCurrentWeather(coordinates.latitude, coordinates.longitude);
      setWeather(weatherData);
      changeImage(weatherData)
     }else {alert("Debes compartir la ubicacion para que la aplicación funcione")}
     
    };

    loadCoords();
  }, []);
  
  
  
  return (
    <div className='background'
    style={{ backgroundImage: `url(${image[background]})` }}
  >
     
     { weather ? <><div className='name'><p>Wheather app</p><DarkModeToggle className="darkmode"/></div><div className='supercontainer'><img src={frame}></img>
     <div className='weather_card'>
      <div className='weather_card_superior'>
        <div className='weather_info'>
          <div className='weather_info_temp'>
            <p>{isCelcius ? (weather.temperature.main.celcius).toFixed(2) : (weather.temperature.main.farenheit).toFixed(2)} °{isCelcius ? 'C' : 'F'}</p>
          </div>
          <div className='weather_info_min_max'>
            <p>
              min / max
            </p>
            <p>
            {isCelcius ? (weather.temperature.min.celcius).toFixed(2) : (weather.temperature.min.farenheit).toFixed(2)} °{isCelcius ? 'C' : 'F'} / {isCelcius ? (weather.temperature.max.celcius).toFixed(2) : (weather.temperature.max.farenheit).toFixed(2)} °{isCelcius ? 'C' : 'F'}
            </p>
          </div>
          <div className='weather_info_humidity'>💧  
             {weather.humidity}%
          </div>
        </div>
        <div className='weather_icon'>
          <img src={weather.weather.icon} alt={weather.weather.description}/>{weather.weather.description}
        </div>
      </div>
      <div className='weather_info_city'>
        {weather.city}
      </div>
     </div>    
     </div>
     <div className='change_deg_container'>
      <div className='change_deg'>
        <button 
        onClick={()=> setIsCelsius(!isCelcius)}>Change °{isCelcius ? 'F' : 'C'}
        </button>
      </div>
     </div>
      
    </>
     : <>
     <div className='loader_container'>
      <img src={loader}/>
      <p className='loader_text'>Loading...
      <ProgressBar
        className='loader_bar'
        height="80"
        width="380"
        ariaLabel="progress-bar-loading"
        wrapperStyle={{}}
        wrapperClass="progress-bar-wrapper"
        borderColor = '#F4442E'
        barColor = '#51E5FF'/>
      </p>
     </div>     
</>}
    </div>
  )
}

export default App
