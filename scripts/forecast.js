// forecastContainer.appendChild(forecastItem);
import apiKey from "../apiKey.js";

export const loadForecastCity = async () => {
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
  const backBtn = document.createElement("button");
  backBtn.setAttribute("class", "forecast__back-button btn");
  const back = `
  
<a href="index.html">

  `;
  backBtn.innerHTML = back;

  const weatherToday = document.createElement("section");
  weatherToday.setAttribute("class", "forecast__weather-today");
  const date = new Date();

  const cityDayWeather = `
  <h2>${cityName}</h2>
  <p>${date} </p>
  <p>${description} </p>
  <p>${temp} </p>`;

  const dailySummary = document.createElement("section");
  dailySummary.setAttribute("class", "forecast__daily-summary");
  const summaryText = weatherData.map((weather) => {
    const { name, value, icon } = weather;

    return `
    <div class="forecast__daily-summary-item">
    <img src="https://openweathermap.org/img/w/${icon}.png" alt="weather icon" class="forecast__daily-summary-weather-icon">
      <p>${value}</p>
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
      `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}`
    );

    const { list } = data;
    const forecastList = document.createElement("section");
    forecastList.setAttribute("class", "forecast__list");
    const forecastArr = list.slice(1, 5).map((item) => ({
      description: item.weather[0].description,
      icon: item.weather[0].icon,
      date: item.dt,
    }));

    const fourDayWeather = forecastArr
      .map((weather) => {
        const { description, date, icon } = weather;
        return `
      <div class="forecast__list-item">
      <h3>${new Date(date * 1000)}</h3>
      <p>${description}</p> 
      <img src="https://openweathermap.org/img/w/${icon}.png" alt="weather icon" class="forecast__daily-summary-weather-icon">

      </div>
    
      `;
      })
      .join("");

    forecastList.innerHTML = fourDayWeather;
    forecastContainer.appendChild(forecastList);
  } catch (error) {
    console.error("Error:", error);
  }
};

window.addEventListener("load", loadForecastCity);
