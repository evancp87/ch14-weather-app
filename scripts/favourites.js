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

const createFavoritesSection = () => {
  const favoritesSection = createWeatherCardElement(
    [{ name: "class", value: "favorites" }],
    "section"
  );
  const heading = createWeatherCardElement(
    [{ name: "class", value: "card__heading" }],
    "h2",
    "Favorites"
  );

  appendCardEl(heading, favoritesSection);
  app.appendChild(favoritesSection);

  return favoritesSection;
};

export const getFavorites = async () => {
  try {
    //  gets key of localStorage favorites and turns into array

    const citiesString = localStorage.getItem("cities");
    const citiesArray = JSON.parse(citiesString);

    const favoritesSection = createFavoritesSection();
    const sortedCitiesArray = sortFavorites(citiesArray);

    console.log("The sorted cities are:", sortedCitiesArray);

    for (let city of sortedCitiesArray) {
      await renderFavoriteCity(city);
    }
  } catch (error) {
    console.error("Error", error);
  }
};
