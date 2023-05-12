// api.openweathermap.org/data/2.5/group?id=5128581,2643743&appid=019aa13e7aea9636052366f2137954d9
// import { key } from "./index";

import apiKey from "../apiKey.js";
import {
  createWeatherCardElement,
  createWeatherCard,
  appendCardEl,
  appendCardElements,
  apiCall,
  linkToForecast,
  // removeFavorite,
  attachRemoveListener,
  attachCardClickListener,
} from "./utils.js";

const app = document.getElementById("root");

export const getFavorites = async () => {
  // map over localStorage
  try {
    const citiesString = localStorage.getItem("cities");
    const citiesArray = JSON.parse(citiesString);
    const currentFavoritesLength = citiesArray.length;

    const favoritesSection = createWeatherCardElement(
      [{ name: "class", value: "favorites" }],
      "section"
    );
    const headingArr = [
      // createWeatherCardElement([{ name: "class", value: "favorites" }], "section"),
      createWeatherCardElement(
        [{ name: "class", value: "card__heading" }],
        "h2",
        "Favorites"
      ),
    ];

    appendCardEl(headingArr, favoritesSection);

    app.appendChild(favoritesSection);

    // loop over favorites array and for each get the key and make an api call the item from localstorage
    for (let city of citiesArray) {
      console.log("the city is:", city);

      const weatherApiData = await apiCall(city, apiKey);
      createWeatherCard(weatherApiData, favoritesSection);
      // if (weatherApiData) {
      //   const card = createWeatherCardElement(
      //     [
      //       { name: "id", value: "`${city}`" },
      //       { name: "class", value: "favorite card dropzone" },
      //     ],
      //     "div"
      //   );
      //   const cardText = createWeatherCardElement(
      //     [{ name: "class", value: "card__text" }],
      //     "div"
      //   );

      //   const weatherCardElArr = [
      //     createWeatherCardElement(
      //       [{ name: "class", value: "card__heading" }],
      //       "h2",
      //       weatherApiData.name
      //     ),
      //     createWeatherCardElement(
      //       [{ name: "class", value: "card__current-weather" }],
      //       "p",
      //       weatherApiData.description
      //     ),
      //   ];
      //   appendCardElements(weatherCardElArr, cardText);

      //   // **
      //   const celsius = Math.round(weatherApiData.temp - 273.15) + "°C";
      //   const iconsContainer = createWeatherCardElement(
      //     [{ name: "class", value: "card__icons" }],
      //     "div"
      //   );

      //   const weatherData = [
      //     createWeatherCardElement(
      //       [
      //         {
      //           name: "src",
      //           value: `https://openweathermap.org/img/w/${weatherApiData.icon}.png`,
      //         },
      //         { name: "class", value: "weather-icon" },
      //         { name: "alt", value: `${weatherApiData.name} weather icon` },
      //       ],
      //       "img"
      //     ),

      //     createWeatherCardElement(
      //       [{ name: "class", value: "card__temp" }],
      //       "p",
      //       celsius
      //     ),
      //   ];

      //   appendCardElements(weatherData, iconsContainer);

      //   const cardContainer = createWeatherCardElement(
      //     [{ name: "class", value: "card__container" }],
      //     "div"
      //   );

      //   // card.appendChild(cardContainer);
      //   appendCardElements([cardText, iconsContainer], cardContainer);
      //   // appendCardEl(iconsContainer, cardContainer);
      //   appendCardEl(cardContainer, card);

      // cardContainer.append(cardText, iconsContainer);

      // appendCardElements(cardContainer, favoritesSection);

      const removeButton = createWeatherCardElement(
        [
          { name: "id", value: "removeBtn" },
          { name: "class", value: "remove-btn" },
          { name: "src", value: "../images/minus.png" },
          { name: "alt", value: "minus icon" },
        ],
        "img"
      );

      // appendCardEl(removeButton, iconsContainer);
      // appendCardEl(card, favoritesSection);

      // removeFavorite(e, card, city);

      // removeButton.addEventListener("click", removeFavorite);

      attachRemoveListener(removeButton, card, city);
      attachCardClickListener(card, weatherApiData);

      // card.addEventListener("click", () => {
      //   // const cityName = cityName.textContent;
      //   linkToForecast(
      //     card,
      //     weatherApiData.name,
      //     weatherApiData.lon,
      //     weatherApiData.lat,
      //     weatherApiData.description,
      //     weatherApiData.temp,
      //     weatherApiData.humidity,
      //     weatherApiData.speed,
      //     weatherApiData.visibility,
      //     weatherApiData.icon
      //   );
      //   // window.location.href = `forecast.html?city=${name}&lon=${lon}&lat=${lat}&description=${description}&temp=${temp}&humidity=${humidity}&speed=${speed}&visibility=${visibility}&icon=${icon}`;
      // });
    }
    // app.appendChild(favoritesSection);

    // TODO: fix this
    console.log(citiesArray);
    const newFavoritesArrLength = citiesArray.length;

    if (newFavoritesArrLength > currentFavoritesLength) {
      const lastCityIndex = citiesArray.length - 1;
      console.log("the last city index", lastCityIndex);
      const lastCity = citiesArray[lastCityIndex];
      console.log("the last city", lastCity);
      const el = document.getElementById(lastCity);
      console.log("the last city el", el);

      // el.scrollIntoView({ behavior: "smooth" });
      if (el) {
        console.log("scrolling to element");
        el.scrollIntoView({ behavior: "smooth" });
      } else {
        console.log("element not found");
      }
      // }
    }
  } catch (error) {
    console.error("error", error);
  }
};

// window.addEventListener("load", getFavorites);
