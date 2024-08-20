import React, { useState, useEffect } from "react"; 
import WeatherMap from "../components/WeatherMap";
import axios from "axios";  
function Home() {
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState(null);
  const [forecast, setForecast] = useState(null);
  const [localTime, setLocalTime] = useState(null);
  const [location, setLocation] = useState("");
  const [searchLocation, setSearchLocation] = useState(null);

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        let url,forecastUrl;
        if (searchLocation) {
          url = `https://api.openweathermap.org/data/2.5/weather?q=${searchLocation}&units=metric&appid=d18bc39846dc0f52439dc08c5f950607`;
          forecastUrl=`https://api.openweathermap.org/data/2.5/forecast?q=${searchLocation}&units=metric&appid=d18bc39846dc0f52439dc08c5f950607`;
        } else {
          // Get the user's location
          const position = await new Promise((resolve, reject) => {
            navigator.geolocation.getCurrentPosition(resolve, reject);
          });
          const { latitude, longitude } = position.coords;
          url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=d18bc39846dc0f52439dc08c5f950607`;
          forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&units=metric&appid=d18bc39846dc0f52439dc08c5f950607`;
      
        }

        // Fetch the weather data
        const response = await axios.get(url);
        setWeather(response.data);
        // fetch forcast weather data
        const forecastResponse=await axios.get(forecastUrl)
        setForecast(forecastResponse.data)
        calculateLocalTime(response.data.timezone);
        setError(null);
      } catch (err) {
        setError("Failed to fetch weather data.");
        setWeather(null);
        setForecast(null);
      }
    };
    fetchWeather();
  }, [searchLocation]);
  console.log(weather);
  // calculate time
  const calculateLocalTime = (timezoneOffset) => {
    // Get the current UTC time
    const utcTime =
      new Date().getTime() + new Date().getTimezoneOffset() * 60000;

    // Calculate the local time using the timezone offset
    const localTime = new Date(utcTime + timezoneOffset * 1000);

    // Format the time as needed (e.g., HH:MM:SS)
    const formattedTime = localTime.toLocaleTimeString();

    // Set the local time state
    setLocalTime(formattedTime);
  };

  // Handle inpiutChange
  const handleInputChange = (e) => {
    setLocation(e.target.value);
  };
  // hanlde search
  const handleSearch = (e) => {
    e.preventDefault();
    setSearchLocation(location);
  };
  // Function to determine background based on weather conditions
  const getBackgroundImage = () => {
    if (!weather) return "https://media.istockphoto.com/id/697120006/photo/amazing-cloudscape-on-the-sky.jpg?s=612x612&w=0&k=20&c=6GK5lZu6xbOpVBNw4tnyoMiu_O8JrD6Et1-TM2b6dqg="; // Default background image

    const weatherMain = weather.weather[0].main.toLowerCase();
    // const weatherMain="fog"
    switch (weatherMain) {
      case "clear":
        return "https://cdn.pixabay.com/photo/2018/08/06/22/55/sun-3588618_1280.jpg"; // Image for clear sky
      case "clouds":
        return "https://static.vecteezy.com/system/resources/thumbnails/007/354/009/small/white-fluffy-clouds-with-blue-sky-on-sunny-day-beautiful-summer-cloudy-sky-background-free-photo.jpg"; // Image for cloudy weather
      case "rain":
        return "https://www.shutterstock.com/image-photo/raining-dark-cloudy-storm-cloud-260nw-2247961477.jpg"; // Image for rainy weather
      case "snow":
        return "https://thumbs.dreamstime.com/b/snowing-3533575.jpg"; // Image for snowy weather
      case "thunderstorm":
        return "https://www.shutterstock.com/image-vector/realistic-illustration-autumn-night-rain-260nw-1932348497.jpg"; // Image for thunderstorms
      case "drizzle":
        return "https://img.freepik.com/premium-photo/gray-rainy-sky_87720-94964.jpg"; // Image for drizzle
      case "mist":
      case "fog":
        return "https://us.images.westend61.de/0000908526j/low-angle-view-of-pine-trees-against-sky-during-foggy-weather-CAVF35573.jpg"; // Image for misty or foggy weather
      default:
        return "https://media.istockphoto.com/id/697120006/photo/amazing-cloudscape-on-the-sky.jpg?s=612x612&w=0&k=20&c=6GK5lZu6xbOpVBNw4tnyoMiu_O8JrD6Et1-TM2b6dqg="; // Fallback image
    }
  };
  const getIcon = () => {
    if (!weather) return "https://cdn-icons-png.flaticon.com/512/3222/3222800.png" ;
    // Default background image

    const weatherMain = weather.weather[0].main.toLowerCase();
    // const weatherMain="fog"
    switch (weatherMain) {
      case "clear":
        return "https://cdn-icons-png.flaticon.com/512/3222/3222800.png"; // Image for clear sky
      case "clouds":
        return "https://cdn-icons-png.flaticon.com/512/5903/5903939.png"; // Image for cloudy weather
      case "rain":
        return "https://cdn-icons-png.flaticon.com/512/4724/4724091.png"; // Image for rainy weather
      case "snow":
        return "https://cdn-icons-png.flaticon.com/512/6635/6635320.png"; // Image for snowy weather
      case "thunderstorm":
        return "https://cdn-icons-png.flaticon.com/512/1959/1959334.png"; // Image for thunderstorms
      case "drizzle":
        return "https://cdn3d.iconscout.com/3d/premium/thumb/sunny-drizzle-3d-icon-download-in-png-blend-fbx-gltf-file-formats--weather-day-rain-rainy-pack-icons-5122311.png?f=webp"; // Image for drizzle
      case "mist":
      case "fog":
        return "https://cdn-icons-png.flaticon.com/512/1197/1197102.png"; // Image for misty or foggy weather
      default:
        return "https://cdn-icons-png.flaticon.com/512/3222/3222800.png"; // Fallback image
    }
  };

  if (error) {
    return <p>{error}</p>;
  }

  if (!weather) {
    return <p>Loading weather data...</p>;
  }
  return (
    <div
      className="bg flex flex-col items-center justify-center min-h-screen "
      style={{
        backgroundImage: `url(  ${getBackgroundImage()})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Input Form */}
      <form onSubmit={handleSearch} className="m-5 flex justify-center">
        <input
          type="text"
          value={location}
          onChange={handleInputChange}
          placeholder="Enter city name"
          className="p-2 rounded mr-2"
        />
        <button type="submit" className="p-2 bg-blue-500 text-white rounded">
          Search
        </button>
      </form>
      <div
        style={{
          backgroundColor: "rgba(0, 0, 0, 0.6)", // 40% transparent background
          padding: "50px", // Padding for inner spacing
          borderRadius: "10px", // Optional: Rounded corners

          // textAlign: "center", // Center align text
        }}
      >
        <div className="flex   items-center justify-between">
          <div>
            <p className="text-lg text-white">Local Time: {localTime}</p>
            <h1 className="text-2xl font-bold mb-4 text-white ">
              Weather in <span style={{ color: "red" }}>{weather.name}</span>
            </h1>
            <p className="text-lg text-white ">
              Weather: {weather.weather[0].description}
            </p>
            <p className="text-lg text-white ">
          Humidity: {weather.main.humidity}%
        </p>
          </div>
          <div>
            <div className="text-lg text-white ">
              Temperature: <img width={"100"} src={getIcon()} alt="" />{" "}
              <h1
                style={{
                  color: "blueviolet",
                  fontWeight: "bolder",
                  fontSize: "65px",
                }}
              >
                {weather.main.temp}°C
              </h1>
            </div>
            <p className="text-lg text-white ">
              Feels like : {weather.main.feels_like}°C
            </p>
          </div>
        </div>

        
        <p className="text-lg text-white ">
          Country: {weather.sys.country} 
        </p>
        <div className="  flex   items-center justify-between space-x-6 ">
          <p className="text-lg text-white ">
            Pressure: {weather.main.pressure} mb{" "}
          </p>
          <p className="text-lg text-white ">
            Wind Speed: {weather.wind.speed} m/s
          </p>
          <p className="text-lg text-white ">
            Visibility : {weather.visibility} meters
          </p>
        </div>
      </div>
      {/* 5-Day Forecast */}
      {forecast && (
          <div className="m-8">
            <h2 className="text-2xl font-bold text-white">5-Day Forecast</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
              {forecast.list.slice(0, 5).map((item) => (
                <div key={item.dt} className="bg-gray-900 text-white p-4 rounded-md">
                  <h3 className="text-lg text-yellow-500 font-semibold">{new Date(item.dt * 1000).toLocaleDateString()}</h3>
                  <img
                    src={`http://openweathermap.org/img/wn/${item.weather[0].icon}.png`}
                    alt={item.weather[0].description}
                    width="50"
                  />
                  <p>Temp: {item.main.temp}°C</p>
                  <p>{item.weather[0].description}</p>
                </div>
              ))}
            </div>
          </div>
        )}
        {/* Weather Map */}
      {weather && (
        <WeatherMap lat={weather.coord.lat} lon={weather.coord.lon} />
      )}
          
    </div>
  );
}

export default Home;
