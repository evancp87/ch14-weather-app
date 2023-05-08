import apiKey from "../apiKey.js";

const app = document.getElementById("root");

const successCallback = (position) => {
  console.log(position);
};

const errorCallback = (error) => {
  console.log(error);
};

// navigator.geolocation.getCurrentPosition(successCallback, errorCallback);
// const id = navigator.geolocation.watchPosition(successCallback, errorCallback);

const options = {
  enableHighAccuracy: true,
  timeout: 10000,
};

navigator.geolocation.getCurrentPosition(
  successCallback,
  errorCallback,
  options
);

export const getCurrLocation = () => {
  const container = document.createElement("section");
  container.classList.add("location-container");

  return navigator.geolocation.getCurrentPosition(async (position) => {
    try {
      const { latitude, longitude } = position.coords;

      // Make a request to the OpenWeather API
      const { data } = await axios.get(
        `https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&appid=${apiKey}`
      );

      const {
        timezone,
        current: {
          temp,
          weather: [{ main, icon }],
        },
      } = data;

      // Display the weather information on the webpage
      const card = document.createElement("div");
      card.classList.add("card");
      const card__text = document.createElement("div");
      const currLocation = document.createElement("p");
      currLocation.textContent = "Current";
      const cityName = document.createElement("h2");
      cityName.textContent = timezone;
      const currWeather = document.createElement("p");
      currWeather.textContent = main;
      const weatherIcon = document.createElement("img");
      weatherIcon.setAttribute(
        "src",
        `https://openweathermap.org/img/w/${icon}.png`
      );
      weatherIcon.classList.add("weather-icon");

      const plusIcon = document.createElement("img");
      plusIcon.setAttribute("src", "./images/plus.png");

      plusIcon.classList.add("weather-icon");
      const tempData = document.createElement("p");
      const celsius = Math.round(temp - 273.15) + "°C";
      tempData.textContent = celsius;
      card__text.appendChild(cityName);
      card__text.appendChild(currWeather);
      card.appendChild(card__text);
      card.appendChild(weatherIcon);
      card.appendChild(tempData);

      // solves the issue of the race condition between location and favorites. Location appears on top of the page
      container.appendChild(card);
      app.insertBefore(container, app.firstChild);
      // app.appendChild(card);
    } catch (error) {
      console.error("error:", error);
    }
  });
};

// TODO: implement
// card.addEventListener("click", () => {
//     // const cityName = cityName.textContent;
//     window.location.href = `forecast.html?city=${cityName.textContent}&lon=${lon}&lat=${lat}`;
//   });
