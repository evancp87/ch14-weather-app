// api.openweathermap.org/data/2.5/forecast?lat=36&lon=54&appid=019aa13e7aea9636052366f2137954d9

// destructure

// window.location.href = `forecast.html?city=${cityName}&temp=${temp}&description=${description}&icon=${icon}`;

// const params = new URLSearchParams(window.location.search);
// const cityName = params.get("city");
// const temp = params.get("temp");
// const description = params.get("description");
// const icon = params.get("icon");

// const forecastContainer = document.getElementById("forecast-container");
// const forecastItem = document.createElement("div");
// forecastItem.classList.add("forecast-item");
// forecastItem.innerHTML = `
//   <h2>${cityName}</h2>
//   <img src="https://openweathermap.org/img/w/${icon}.png" alt="${description}">
//   <p>${description} - ${temp} &deg;F</p>
// `;

// forecastContainer.appendChild(forecastItem);

import dotenv from "dotenv";

// Load environment variables from .env file
dotenv.config();

// use API key from environment variable
const apiKey = process.env.API_KEY;

const loadForecastCity = async () => {
  const params = new URLSearchParams(window.location.search);
  const cityName = params.get("city");
  const lon = params.get("lon");
  const lat = params.get("lat");
  const temp = params.get("temp");
  const description = params.get("description");
  const windSpeed = params.get("speed");
  const humidity = params.get("humidity");
  const visibility = params.get("visibility");

  //   TODO: put icons in
  const weatherData = [
    { name: "Wind", value: windSpeed },
    { name: "Humidity", value: humidity },
    { name: "visibility", value: visibility },
  ];

  const forecastContainer = document.getElementById("forecast");
  const forecastList = document.createElement("div");
  const date = new Date();

  const text = `
  <h2>${cityName}</h2>
  <p>${date} </p>
  <p>${description} </p>
  <p>${temp} </p>`;

  const dailySummary = document.createElement("div");
  const summaryText = weatherData.map((weather) => {
    const { name, value, icon } = weather;

    return `
      <p>${value}</p>
      <h3>${name}</h3> `;
  });

  dailySummary.innerHTML = summaryText.join(" ");
  forecastList.innerHTML = text;
  forecastContainer.appendChild(forecastList);
  forecastContainer.appendChild(dailySummary);

  try {
    const { data } = await axios.get(
      `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}`
    );

    const { list } = data;
    const forecast = document.createElement("div");
    const forecastArr = list.slice(1, 5).map((item) => ({
      description: item.weather[0].description,
      icon: item.weather[0].icon,
      date: item.dt,
    }));

    const fourDayWeather = forecastArr
      .map((weather) => {
        const { description, date, icon } = weather;
        return `
      <h3>${new Date(date * 1000)}</h3>
      <p>${description}</p> 
      <p>${icon}</p>
      
      `;
      })
      .join("");
    forecast.innerHTML = fourDayWeather;
    forecastContainer.appendChild(forecast);
  } catch (error) {
    console.error("Error:", error);
  }
};

window.addEventListener("load", loadForecastCity);
