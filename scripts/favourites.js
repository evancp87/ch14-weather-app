import apiKey from "../apiKey.js";
import {
  createWeatherCardElement,
  createWeatherCard,
  appendCardEl,
  apiCall,
  attachRemoveListener,
  attachCardClickListener,
  sortFavorites,
} from "./utils.js";

const app = document.getElementById("root");

export const getFavorites = async () => {
  // map over localStorage
  try {
    const citiesString = localStorage.getItem("cities");
    const citiesArray = JSON.parse(citiesString);
    const favoritesSection = createWeatherCardElement(
      [{ name: "class", value: "favorites" }],
      "section"
    );
    const heading = createWeatherCardElement(
      [{ name: "class", value: "card__heading" }],
      "h2",
      "Favorites"
    );

    const sortedCitiesArray = sortFavorites(citiesArray);
    console.log("the sorted cities are:", sortedCitiesArray);
    appendCardEl(heading, favoritesSection);

    app.appendChild(favoritesSection);

    // loop over favorites array and for each get the key and make an api call the item from localstorage
    for (let city of sortedCitiesArray) {
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
    sortFavorites(citiesArray);
  } catch (error) {
    console.error("error", error);
  }
};
