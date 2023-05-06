// api.openweathermap.org/data/2.5/group?id=5128581,2643743&appid=019aa13e7aea9636052366f2137954d9
// import { key } from "./index";

import dotenv from "dotenv";

// Load environment variables from .env file
dotenv.config();

// use API key from environment variable
const apiKey = process.env.API_KEY;

const favoritesSection = document.getElementById("favorites");

// addButton.addEventListener("click", setFavorites);
const getFavorites = async () => {
  // map over localStorage
  try {
    // const favoritesArray = Object.entries(localStorage).filter(
    //   (key) => key[0] === "cities"
    // );
    // console.log(favoritesArray);

    const citiesString = localStorage.getItem("cities");
    const citiesArray = JSON.parse(citiesString);

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
      card.classList.add("card");

      const card__text = document.createElement("div");

      const cityName = document.createElement("h2");
      cityName.textContent = name;

      const currWeather = document.createElement("p");
      currWeather.textContent = description;
      const tempData = document.createElement("p");
      tempData.textContent = temp;
      card__text.appendChild(cityName);
      // card__text.appendChild(form);
      card__text.appendChild(currWeather);
      card.appendChild(card__text);
      // card.appendChild(weatherIcon);
      card.appendChild(tempData);

      // removes the plus button

      const removeButton = document.createElement("button");
      removeButton.setAttribute("id", "removeBtn");
      removeButton.setAttribute("class", "remove-btn");

      card.appendChild(removeButton);
      app.appendChild(card);

      // const removeFavorite = () => {
      //   // save variable of  item
      //   const itemToDelete = city;
      //   localStorage.removeItem(itemToDelete);
      //   console.log(itemToDelete, "was deleted");
      // };
      // removeButton.addEventListener("click", removeFavorite);
      const removeFavorite = () => {
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
  } catch (error) {
    console.error("error", error);
  }
};

window.addEventListener("load", getFavorites);
