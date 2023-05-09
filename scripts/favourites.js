// api.openweathermap.org/data/2.5/group?id=5128581,2643743&appid=019aa13e7aea9636052366f2137954d9
// import { key } from "./index";

import apiKey from "../apiKey.js";
import createWeatherCard from "./helpers.js";

const app = document.getElementById("root");

export const getFavorites = async () => {
  // map over localStorage
  try {
    const citiesString = localStorage.getItem("cities");
    const citiesArray = JSON.parse(citiesString);
    const currentFavoritesLength = citiesArray.length;

    const favoritesSection = document.createElement("section");
    favoritesSection.setAttribute("class", "favorites");
    app.appendChild(favoritesSection);

    // loop over favorites array and for each get the key and make an api call the item from localstorage
    for (let city of citiesArray) {
      console.log("the city is:", city);
      const { data } = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`
      );
      const {
        name,
        weather: [{ main, description, icon }],
        main: { temp, humidity },
        coord: { lon, lat },
        wind: { speed },
        visibility,
      } = data;

      const card = document.createElement("div");
      card.setAttribute("id", `${city}`);
      // card.setAttribute("class", "card");
      card.setAttribute("class", "favorite card dropzone");

      const card__text = document.createElement("div");

      const cityName = document.createElement("h2");
      cityName.textContent = name;

      const currWeather = document.createElement("p");
      currWeather.textContent = description;
      const tempData = document.createElement("p");
      const celsius = Math.round(temp - 273.15) + "°C";
      tempData.textContent = celsius;
      card__text.appendChild(cityName);
      // card__text.appendChild(form);
      card__text.appendChild(currWeather);
      card.appendChild(card__text);
      // card.appendChild(weatherIcon);
      card.appendChild(tempData);

      // removes the plus button

      const removeButton = document.createElement("img");
      removeButton.setAttribute("id", "removeBtn");
      removeButton.setAttribute("class", "remove-btn");
      removeButton.setAttribute("src", "../images/minus.png");
      removeButton.setAttribute("alt", "minus icon");

      card.appendChild(removeButton);
      favoritesSection.appendChild(card);
      // app.appendChild(favoritesSection);

      const removeFavorite = (e) => {
        e.stopPropagation();
        // save variable of item

        const itemToDelete = city;
        const citiesString = localStorage.getItem("cities");
        let citiesArray = JSON.parse(citiesString);

        // Remove the selected city from the array
        citiesArray = citiesArray.filter(
          (cityName) => cityName !== itemToDelete
        );

        // Update the "cities" key in the localStorage
        localStorage.setItem("cities", JSON.stringify(citiesArray));

        console.log(itemToDelete, "was deleted");
        card.remove();
      };
      removeButton.addEventListener("click", removeFavorite);

      card.addEventListener("click", () => {
        // const cityName = cityName.textContent;
        window.location.href = `forecast.html?city=${cityName.textContent}&lon=${lon}&lat=${lat}&description=${description}&temp=${temp}&humidity=${humidity}&speed=${speed}&visibility=${visibility}`;
      });
    }
    // app.appendChild(favoritesSection);

    // TODO: fix this
    console.log(citiesArray);
    const newFavoritesArrLength = citiesArray.length;

    if (newFavoritesArrLength > currentFavoritesLength) {
      const lastCityIndex = citiesArray.length - 1;
      const lastCity = citiesArray[lastCityIndex];
      const el = document.getElementById(lastCity);
      el.scrollIntoView({ behavior: "smooth" });
    }
  } catch (error) {
    console.error("error", error);
  }
};

// window.addEventListener("load", getFavorites);
