import apiKey from "../apiKey.js";
import {
  createWeatherCard,
  createWeatherCardElement,
  attachCardClickListener,
  appendCardElements,
  geolocationApiCall,
  getGreeting,
  getCurrentTime,
  skeletonLoading,
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
  const container = createLocationContainer();
  const textContainer = createTextContainer();
  const locationHeader = createLocationHeader();

  appendCardElements([textContainer, locationHeader], container);
  skeletonLoading(app);

  return navigator.geolocation.getCurrentPosition(async (position) => {
    try {
      const { latitude, longitude } = position.coords;
      const weatherData = await getWeatherData(latitude, longitude);

      const loadingContainer = document.querySelector(".card.skeleton-card");
      if (loadingContainer) {
        loadingContainer.remove();
      }

      const { card } = createWeatherCard(weatherData, container);
      attachCardClickListener(card, weatherData);
      // makes sure that the geolocation card is before the favorites, as it takes longer to load
      app.insertBefore(container, app.firstChild);
    } catch (error) {
      console.error("error:", error);
    }
  });
};

const createLocationContainer = () => {
  return createWeatherCardElement(
    [{ name: "class", value: "location-container" }],
    "section"
  );
};

// dynamic greeting based on time of day
const createTextContainer = () => {
  const greeting = createWeatherCardElement(
    [{ name: "class", value: "landing-page__greeting" }],
    "p",
    `Good ${getGreeting(getCurrentTime())}! Discover the weather`
  );

  const searchItem = `
    <div class="landing-page__search-input">
      <a href="./search.html">
        <img src="./images/research.png" alt="search icon" class="search-icon">
      </a>
    </div>
  `;

  const container = createWeatherCardElement(
    [{ name: "class", value: "landing-page__search-blurb" }],
    "div"
  );
  container.innerHTML = `${greeting.outerHTML}${searchItem}`;

  return container;
};

const createLocationHeader = () => {
  return createWeatherCardElement(
    [{ name: "class", value: "location__header" }],
    "h2",
    "Current Location"
  );
};

const getWeatherData = async (latitude, longitude) => {
  return geolocationApiCall(latitude, longitude, apiKey);
};
