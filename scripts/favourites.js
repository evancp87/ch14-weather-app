// api.openweathermap.org/data/2.5/group?id=5128581,2643743&appid=019aa13e7aea9636052366f2137954d9
// import { key } from "./index";

import apiKey from "../apiKey.js";
// import createWeatherCard from "./helpers.js";

const app = document.getElementById("root");

export const getFavorites = async () => {
  // map over localStorage
  try {
    const citiesString = localStorage.getItem("cities");
    const citiesArray = JSON.parse(citiesString);
    const currentFavoritesLength = citiesArray.length;

    const favoritesSection = document.createElement("section");
    favoritesSection.setAttribute("class", "favorites");
    const cardHeading = document.createElement("h2");
    cardHeading.classList.add("card__heading");
    cardHeading.innerText = "Favorites";
    favoritesSection.appendChild(cardHeading);
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
      card.setAttribute("class", "favorite card dropzone");

      const cardText = document.createElement("div");
      cardText.setAttribute("class", "card__text");

      const cityName = document.createElement("h2");
      cityName.textContent = name;

      const cardContainer = document.createElement("div");
      cardContainer.setAttribute("class", "card__container");

      const currWeather = document.createElement("p");
      currWeather.textContent = description;

      const iconsContainer = document.createElement("div");
      iconsContainer.setAttribute("class", "card__icons");

      const tempData = document.createElement("p");
      const celsius = Math.round(temp - 273.15) + "°C";
      tempData.textContent = celsius;
      const iconImg = document.createElement("img");
      iconImg.setAttribute(
        "src",
        `https://openweathermap.org/img/w/${icon}.png`
      );
      iconImg.setAttribute("class", `weather-icon`);
      iconImg.setAttribute("alt", `${name} weather icon`);
      cardText.appendChild(cityName);
      // card__text.appendChild(form);
      cardText.appendChild(currWeather);
      card.appendChild(cardContainer);

      cardContainer.appendChild(cardText);
      // card.appendChild(weatherIcon);
      iconsContainer.appendChild(tempData);
      iconsContainer.appendChild(iconImg);
      cardContainer.appendChild(iconsContainer);

      // removes the plus button

      const removeButton = document.createElement("img");
      removeButton.setAttribute("id", "removeBtn");
      removeButton.setAttribute("class", "remove-btn");
      removeButton.setAttribute("src", "../images/minus.png");
      removeButton.setAttribute("alt", "minus icon");

      iconsContainer.appendChild(removeButton);
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
        window.location.href = `forecast.html?city=${cityName.textContent}&lon=${lon}&lat=${lat}&description=${description}&temp=${temp}&humidity=${humidity}&speed=${speed}&visibility=${visibility}&icon=${icon}`;
      });
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
    }
  } catch (error) {
    console.error("error", error);
  }
};

// window.addEventListener("load", getFavorites);
