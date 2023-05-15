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

const renderFavoriteCity = async (city) => {
  try {
    const weatherApiData = await apiCall(city, apiKey);
    const favoritesSection = document.querySelector(".favorites");

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
  } catch (error) {
    console.error("Error", error);
  }
};

export const getFavorites = async () => {
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
    console.log("The sorted cities are:", sortedCitiesArray);

    appendCardEl(heading, favoritesSection);
    app.appendChild(favoritesSection);

    for (let city of sortedCitiesArray) {
      console.log("The city is:", city);
      await renderFavoriteCity(city);
    }
  } catch (error) {
    console.error("Error", error);
  }
};
