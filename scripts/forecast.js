// forecastContainer.appendChild(forecastItem);
import apiKey from "../apiKey.js";
import {
  forecastDynamicBackground,
  createWeatherCardElement,
  getInternationalDateTime,
} from "./utils.js";

export const loadForecastCity = async () => {
  const params = new URLSearchParams(window.location.search);
  const cityName = params.get("city");
  const lon = params.get("lon");
  const lat = params.get("lat");
  const temp = params.get("temp");
  const icon = params.get("icon");
  const description = params.get("description");
  const windSpeed = params.get("speed");
  const humidity = params.get("humidity");
  const visibility = params.get("visibility");
  const datestring = params.get("dt");
  const timezone = params.get("timezone");

  const weatherData = [
    { name: "Wind", value: windSpeed, icon: icon, unit: "mph" },
    { name: "Humidity", value: humidity, icon: icon, unit: "%" },
    { name: "visibility", value: visibility, icon: icon, unit: "m" },
  ];

  const forecastContainer = document.getElementById("forecast");
  const backBtn = createWeatherCardElement(
    [{ name: "class", value: "forecast__back-button btn" }],
    "button"
  );

  // const backBtn = document.createElement("button");
  // backBtn.setAttribute("class", "forecast__back-button btn");
  const back = `
  
<a href="index.html">Back </a>

  `;
  backBtn.innerHTML = back;

  const weatherToday = document.createElement("section");
  weatherToday.setAttribute("class", "forecast__weather-today");
  // const date = new Date();
  const celsius = Math.round(temp - 273.15) + "°C";

  const cityDayWeather = `
  <h2 >${cityName}</h2>
  <p class="forecast__date">${getInternationalDateTime(
    datestring,
    timezone
  )} </p>
  <p class="forecast__description" id="description">${description} </p>
  <p class="forecast__temp">${celsius} </p>`;

  const dailySummary = document.createElement("section");
  dailySummary.setAttribute("class", "forecast__daily-summary");
  const summaryText = weatherData.map((weather) => {
    const { name, value, unit } = weather;

    return `
    <div class="forecast__daily-summary-item">
    <img src="../images/${name}.png" alt="weather icon" class="forecast__daily-summary-weather-icon">
      <p>${value} ${unit}</p>
      <h3>${name}</h3>
     </div>`;
  });

  dailySummary.innerHTML = summaryText.join(" ");
  weatherToday.innerHTML = cityDayWeather;
  forecastContainer.appendChild(backBtn);
  forecastContainer.appendChild(weatherToday);
  forecastContainer.appendChild(dailySummary);

  try {
    const { data } = await axios.get(
      // `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&cnt=4&appid=${apiKey}`
      `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=current,minutely,hourly&appid=${apiKey}`
    );

    const { daily } = data;
    const forecastList = document.createElement("section");
    forecastList.setAttribute("class", "forecast__list");
    const forecastArr = daily.slice(1, 5).map((item) => ({
      description: item.weather[0].description,
      icon: item.weather[0].icon,
      date: item.dt,
    }));

    const fourDayWeather = forecastArr
      .map((weather) => {
        const { description, date, icon } = weather;
        const timezone = new Date().getTimezoneOffset();
        const timezoneOffsetMillis = timezone * 60 * 1000;
        const localDate = new Date((date + timezoneOffsetMillis) * 1000);
        return `
      <div class="forecast__list-item">
      <h3>${localDate.toLocaleString()}</h3>
      <p>${description}</p> 
      <img src="https://openweathermap.org/img/wn/${icon}@2x.png" alt="weather icon" class="forecast__forecast-summary-weather-icon">

      </div>
    
      `;
      })
      .join("");

    forecastList.innerHTML = fourDayWeather;
    forecastContainer.appendChild(forecastList);
    forecastDynamicBackground(document.getElementById("description"));
  } catch (error) {
    console.error("Error:", error);
  }
};

window.addEventListener("load", loadForecastCity);
