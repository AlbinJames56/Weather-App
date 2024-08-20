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
        let url, forecastUrl;
        if (searchLocation) {
          url = `https://api.openweathermap.org/data/2.5/weather?q=${searchLocation}&units=metric&appid=d18bc39846dc0f52439dc08c5f950607`;
          forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${searchLocation}&units=metric&appid=d18bc39846dc0f52439dc08c5f950607`;
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
        const forecastResponse = await axios.get(forecastUrl);
        setForecast(forecastResponse.data);
        calculateLocalTime(response.data.timezone);
        setError(null);
      } catch (err) {
        if (err.response && err.response.status === 404) {
          alert("City not found. Showing weather for your current location.");
           
          setSearchLocation(null);
        }else{
          setError("Failed to fetch weather data.");
          setWeather(null);
        setForecast(null);
        }
        
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
  const getBackgroundImage = (weatherMain) => {
   
    if (!weatherMain)
      return "https://c4.wallpaperflare.com/wallpaper/299/901/190/beach-indian-ocean-sand-sandy-beach-wallpaper-preview.jpg"; // Default background image
  switch (weatherMain.toLowerCase()) {
      case "clear":
        return "https://i.pinimg.com/564x/7c/5e/df/7c5edf2fe35c6704f0f51dd5c77d68bd.jpg"; // Image for clear sky
      case "clouds":
        return "https://i.pinimg.com/564x/40/87/7c/40877c7eccedd780a08b04d63c47115d.jpg"; // Image for cloudy weather
      case "scattered clouds":
        return "https://i.pinimg.com/564x/2c/e6/dd/2ce6dd18f98b419c6cc6f43fe98a8928.jpg"; // Image for cloudy weather
      case "rain":
        return "https://i.pinimg.com/564x/8a/18/05/8a18053a32716c96a4113db3ebfd4327.jpg"; // Image for rainy weather
      case "snow":
        return "https://i.pinimg.com/564x/1a/2a/da/1a2ada8711b399186af9151787c55882.jpg"; // Image for snowy weather
      case "thunderstorm":
        return "https://i.pinimg.com/564x/d1/2f/b0/d12fb028582941e6c2135ddd01127716.jpg"; // Image for thunderstorms
      case "drizzle":
        return "https://i.pinimg.com/564x/0b/69/80/0b6980d402c86f2619f1158570537d76.jpg"; // Image for drizzle
      case "mist":
      case "fog":
        return "https://c4.wallpaperflare.com/wallpaper/901/252/2/forest-nature-landscape-trees-wallpaper-preview.jpg"; // Image for misty or foggy weather
      default:
        return "https://c4.wallpaperflare.com/wallpaper/299/901/190/beach-indian-ocean-sand-sandy-beach-wallpaper-preview.jpg"; // Fallback image
    
  }
  };
  const getIcon = () => {
    if (!weather)
      return "https://cdn-icons-png.flaticon.com/512/3222/3222800.png";
    // Default background image

    const weatherMain = weather.weather[0].main.toLowerCase();

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
    
    return alert(error) 

  }

  if (!weather) {
    return <p>Loading weather data...</p>;
  }
  return (
    <div className="bg flex flex-col items-center justify-center min-h-screen">
      {/* Input Form */}
      <form onSubmit={handleSearch} className="m-5 pt-5 flex justify-center">
        <input
          type="text"
          value={location}
          onChange={handleInputChange}
          placeholder="Enter city name"
          className="p-2 rounded mr-2 mt-5"
        />
        <button
          type="submit"
          className="p-2  mt-5 bg-blue-500 text-white rounded"
        >
          Search
        </button>
      </form>
      <div
        style={{
          position: "relative", // Create a relative container for the overlay
          padding: "70px",
          borderRadius: "10px",
          overflow: "hidden", // Ensure overlay stays within the borders
        }}
      >
        {/* Background Image with reduced opacity using overlay */}
        <div
          style={{
            backgroundImage: `url(${getBackgroundImage(weather.weather[0].main)})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            position: "absolute", // Make it overlay
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            opacity: 0.5, // Set the opacity of the overlay
            zIndex: -1, // Ensure the overlay stays behind the content
          }}
        ></div>

        <div style={{ position: "relative" }}>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-lg font-bold text-black">
                Local Time: {localTime}
              </p>
              <h1 className="text-2xl font-bold mb-4 text-black">
                Weather in <span style={{ color: "red" }}>{weather.name}</span>
              </h1>
              <p className="text-lg font-bold text-black">
                Weather: {weather.weather[0].description}
              </p>
              <p className="text-lg font-bold text-black">
                Humidity: {weather.main.humidity}%
              </p>
            </div>
            <div>
              <div className="text-lg font-bold text-black">
                Temperature:{" "}
                <img width={"100"} src={getIcon()} alt="weather icon" />
                <h1
                  style={{
                    color: "blueviolet",
                    fontWeight: "bolder",
                    fontSize: "65px",
                    margin: "0",
                  }}
                >
                  {weather.main.temp}°C
                </h1>
              </div>
              <p className="text-lg font-bold text-black">
                Feels like: {weather.main.feels_like}°C
              </p>
            </div>
          </div>

          <p className="text-lg font-bold text-black">
            Country: {weather.sys.country}
          </p>

          <div className="flex items-center justify-between space-x-6">
            <p className="text-lg font-bold text-black">
              Pressure: {weather.main.pressure} mb
            </p>
            <p className="text-lg font-bold text-black">
              Wind Speed: {weather.wind.speed} m/s
            </p>
            <p className="text-lg font-bold text-black">
              Visibility: {weather.visibility} meters
            </p>
          </div>
        </div>
      </div>

      {/* 5-Day Forecast */}
      {forecast && (
  <div className="m-8">
    <h2 className="text-2xl font-bold">5-Day Forecast</h2>
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
      {forecast.list
        .filter((item, index, array) => {
           
          const currentDate = new Date(item.dt * 1000).getDate();
          const nextItem = array[index + 1];
          if (nextItem) {
            const nextDate = new Date(nextItem.dt * 1000).getDate();
            return currentDate !== nextDate;
          }
          return true;
        })
        .slice(0, 5) // Only take 5 days of forecast
        .map((item) => (
          <div
            key={item.dt}
            className="text-white rounded-md"
            style={{
              backgroundImage: `url(${getBackgroundImage(item.weather[0].main)})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            <div style={{ backgroundColor: 'rgba(255, 255, 255, .6)' }} className="p-4">
              <h5 className="text-red-500 font-black">
                {new Date(item.dt * 1000).toLocaleDateString()}
              </h5>
              <img
                src={`http://openweathermap.org/img/wn/${item.weather[0].icon}.png`}
                alt={item.weather[0].description}
                width="60"
              />
              <p className="text-black font-extrabold">Temp: {item.main.temp}°C</p>
              <p className="text-black font-bold">{item.weather[0].description}</p>
            </div>
          </div>
        ))}
    </div>
  </div>
)}

      {/* Weather Map */}

      <div
        className="flex justify-center"
        style={{ position: "relative", width: "100%" }}
      >
        {/* Weather Map */}
        <h4
          style={{
            position: "absolute",
            transform: "translate(10px, 10px)",
            zIndex: 1000,
            color: "white",
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            padding: "5px 10px",
            borderRadius: "5px",
          }}
        >
          Temperature Map
        </h4>
        <div className="flex justify-center mb-6" style={{ width: "100%" }}>
          {weather && (
            <WeatherMap lat={weather.coord.lat} lon={weather.coord.lon} />
          )}
        </div>
      </div>
    </div>
  );
}

export default Home;
