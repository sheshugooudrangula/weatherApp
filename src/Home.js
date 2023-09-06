import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import "./style.css";

function Home() {
  const [data, setData] = useState({
    celcius: 10,
    name: "London",
    humidity: 10,
    speed: 2,
    image: "images/clouds.png",
  });
  const [name, setName] = useState("");
  const handleClick = () => {
    if (name !== "") {
      const apiUrl = `https://api.openweathermap.org/data/2.5/weather?units=metric&q=${name}&appid=87723ad0fbb151ec902b9b4daffe4963`;
      axios.get(apiUrl).then((res) => {
        let imagePath = "";
        if (res.data.weather[0].main == "Clouds") {
          imagePath = "images/clouds.png";
        } else if (res.data.weather[0].main == "Clear") {
          imagePath = "images/clear.png";
        } else if (res.data.weather[0].main == "Rain") {
          imagePath = "images/rain.png";
        } else if (res.data.weather[0].main == "Drizzle") {
          imagePath = "images/drizzle.png";
        } else if (res.data.weather[0].main == "Mist") {
          imagePath = "images/mist.png";
        } else {
          imagePath = "images/clouds.png";
        }
        console.log(res.data);
        setData({
          ...data,
          celcius: res.data.main.temp,
          name: res.data.name,
          humidity: res.data.main.humidity,
          speed: res.data.wind.speed,
          image: imagePath,
        });
      });
    }
  };
  return (
    <div className="card">
      <div className="search">
        <input
          type="text"
          placeholder="enter city name"
          spellcheck="false"
          onChange={(e) => setName(e.target.value)}
        />
        <button>
          <img src="/images/search.png" onClick={handleClick} />
        </button>
      </div>
      
      <div className="weather">
        <img src={data.image} class="weather-icon" />
        <h1 className="temp">{Math.round(data.celcius)}°C</h1>
        <h2 className="city">{data.name}</h2>
        <div className="details">
          <div className="col">
            <img src="/images/humidity.png" />
            <div>
              <p className="humidity">{Math.round(data.humidity)} %</p>
              <p>Humidity</p>
            </div>
          </div>
          <div className="col">
            <img src="images/wind.png" />
            <div>
              <p className="wind">{Math.round(data.speed)} km/h</p>
              <p>Wind speed</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
