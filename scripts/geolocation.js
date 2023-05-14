import apiKey from "../apiKey.js";
import {
  createWeatherCard,
  createWeatherCardElement,
  attachCardClickListener,
  appendCardEl,
  appendCardElements,
  geolocationApiCall,
  appendElementsToSearch,
  appendChildEl,
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
  (position) => {
    skeletonLoading();
    successCallback(position);
  },
  successCallback,
  errorCallback,
  options
);

export const getCurrLocation = () => {
  const container = createWeatherCardElement(
    [{ name: "class", value: "location-container" }],
    "section"
  );

  // const container = document.createElement("section");
  // container.classList.add("location-container");

  // const searchItem = `<div class="landing-page__search-blurb">
  //               <p>Good morning! Discover the weather</p>
  //               <div class="landing-page__search-input">
  //                   <a href="./search.html">
  //                       <img src="./images/research.png" alt="search icon" class="search-icon">
  //                   </a>
  //               </div>

  //           </div>`;

  const textContainer = createWeatherCardElement(
    [{ name: "class", value: "landing-page__search-blurb" }],
    "div"
  );

  const greeting = createWeatherCardElement(
    [{ name: "class", value: "landing-page__greeting" }],
    "p",
    `Good ${getGreeting(getCurrentTime())}! Discover the weather`
  );
  const searchInput = createWeatherCardElement(
    [{ name: "class", value: "landing-page__search-input" }],
    "div"
  );

  const linkToSearchInput = createWeatherCardElement(
    [{ name: "href", value: "./search.html" }],
    "a"
  );
  const searchImg = createWeatherCardElement(
    [
      { name: "src", value: "./images/research.png" },
      { name: "alt", value: "search icon" },
      { name: "class", value: "search-icon" },
    ],
    "img"
  );
  // container.innerHTML = searchItem;
  const greetingEls = [greeting, searchInput, searchImg, linkToSearchInput];
  const searchEls = [searchImg, linkToSearchInput];
  appendCardEl(linkToSearchInput, searchImg);
  appendElementsToSearch(greetingEls, textContainer);
  appendElementsToSearch(searchEls, searchInput);

  const locationHeader = createWeatherCardElement(
    [{ name: "class", value: "location__header" }],
    "h2",
    "Current Location"
  );

  appendCardElements([textContainer, locationHeader], container);

  return navigator.geolocation.getCurrentPosition(async (position) => {
    try {
      const { latitude, longitude } = position.coords;

      const weatherData = await geolocationApiCall(latitude, longitude, apiKey);

      const loadingContainer = document.querySelector(".card.skeleton-card");
      if (loadingContainer) {
        loadingContainer.remove();
      }
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
