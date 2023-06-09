import apiKey from "../apiKey.js";
import {
  forecastDynamicBackground,
  appendCardElements,
  createWeatherCardElement,
  getInternationalDateTime,
} from "./utils.js";

const forecastContainer = document.getElementById("forecast");

// unpacks params from url sent from weather cards
const urlParams = () => {
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
  return {
    cityName,
    lon,
    lat,
    temp,
    icon,
    description,
    windSpeed,
    humidity,
    visibility,
    datestring,
  };
};

const generateDailySummary = (params) => {
  const {
    cityName,
    temp,
    icon,
    description,
    windSpeed,
    humidity,
    visibility,
    datestring,
  } = params;

  const weatherData = [
    { name: "Wind", value: windSpeed, icon: icon, unit: "mph" },
    { name: "Humidity", value: humidity, icon: icon, unit: "%" },
    { name: "visibility", value: visibility, icon: icon, unit: "m" },
  ];

  const backBtn = createWeatherCardElement(
    [{ name: "class", value: "forecast__back-button btn" }],
    "button"
  );

  const back = ` <a href="index.html">Back </a>`;
  backBtn.innerHTML = back;

  const weatherToday = createWeatherCardElement(
    [{ name: "class", value: "forecast__weather-today" }],
    "section"
  );

  const celsius = Math.round(temp - 273.15) + "°C";

  const cityDayWeather = `
  <h2 >${cityName}</h2>
  <p class="forecast__date">${getInternationalDateTime(datestring)} </p>
  <p class="forecast__description" id="description">${description} </p>
  <p class="forecast__temp">${celsius} </p>`;

  const dailySummary = createWeatherCardElement([
    { name: "class", value: "forecast__daily-summary" },
    "section",
  ]);

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
  return appendCardElements(
    [backBtn, weatherToday, dailySummary],
    forecastContainer
  );
};

const forecastApiCall = async (params, apiKey) => {
  const { lon, lat } = params;
  try {
    const { data } = await axios.get(
      `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=current,minutely,hourly&appid=${apiKey}`
    );

    const { daily } = data;
    const forecastList = createWeatherCardElement([
      { name: "class", value: "forecast__list" },
      "section",
    ]);
    const forecastArr = daily.slice(1, 5).map((item) => ({
      description: item.weather[0].description,
      icon: item.weather[0].icon,
      date: getInternationalDateTime(item.dt),
    }));

    const fourDayWeather = forecastArr
      .map((weather) => {
        const { description, date, icon } = weather;

        return `
      <div class="forecast__list-item">
      <h3>${date}</h3>
      <p>${description}</p>
      <img src="https://openweathermap.org/img/wn/${icon}@2x.png" alt="weather icon" class="forecast__forecast-summary-weather-icon">

      </div>

      `;
      })
      .join("");

    forecastList.innerHTML = fourDayWeather;
    forecastContainer.appendChild(forecastList);
    forecastDynamicBackground(document.getElementById("description"));

    return forecastContainer;
  } catch (error) {
    console.error("Error:", error);
  }
};

const loadForecastCity = async () => {
  const params = urlParams();
  const dailySummaryElements = generateDailySummary(params);
  const forecastListElement = await forecastApiCall(params, apiKey);
};

window.addEventListener("load", loadForecastCity);
