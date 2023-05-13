import apiKey from "../apiKey.js";
import {
  createWeatherCard,
  attachCardClickListener,
  geolocationApiCall,
} from "./utils.js";

const app = document.getElementById("root");

const successCallback = (position) => {
  console.log(position);
};

const errorCallback = (error) => {
  console.log(error);
};

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
  const cardHeading = document.createElement("h2");
  cardHeading.classList.add("card__heading");
  cardHeading.innerText = "Current Location";
  container.appendChild(cardHeading);

  const searchItem = `<div class="landing-page__search-blurb">
                <p>Good morning! Discover the weather</p>
                <div class="landing-page__search-input">
                    <a href="./search.html">
                        <img src="./images/research.png" alt="search icon" class="search-icon">
                    </a>
                </div>

            </div>`;

  container.innerHTML = searchItem;

  return navigator.geolocation.getCurrentPosition(async (position) => {
    try {
      const { latitude, longitude } = position.coords;

      const weatherData = await geolocationApiCall(latitude, longitude, apiKey);

      // Display the weather information on the webpage

      const { card } = createWeatherCard(weatherData, container);

      // solves the issue of the race condition between location and favorites. Location appears on top of the page
      // container.appendChild(card);
      attachCardClickListener(card, weatherData);
      app.insertBefore(container, app.firstChild);
    } catch (error) {
      console.error("error:", error);
    }
  });
};
