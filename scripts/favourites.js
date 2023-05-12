import apiKey from "../apiKey.js";
import {
  createWeatherCardElement,
  createWeatherCard,
  appendCardEl,
  apiCall,
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
      const { card, iconsContainer } = createWeatherCard(
        weatherApiData,
        favoritesSection
      );

      const removeButton = createWeatherCardElement(
        [
          { name: "id", value: "removeBtn" },
          { name: "class", value: "remove-btn" },
          { name: "src", value: "../images/minus.png" },
          { name: "alt", value: "minus icon" },
        ],
        "img"
      );

      attachRemoveListener(removeButton, card, city, iconsContainer);
      attachCardClickListener(card, weatherApiData);
    }

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
