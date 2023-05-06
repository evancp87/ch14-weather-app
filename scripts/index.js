// Using a HTML/JS file in the browser-
// Use axios to get weather data from the API I showed at the start of the lesson
// Wrap the axios call in an async function
// Use await before the axios call
// Destructure the response to get the { data } part of the response
// Console.log the weather data (this will show you completed the above)

// import axios from "axios";
// import { getCurrLocation } from "./geolocation.js";
console.log("hello world");
// import dotenv from "dotenv";

// Load environment variables from .env file
dotenv.config();

// use API key from environment variable
const apiKey = process.env.API_KEY;

// ================================================================
// const search = document.getElementById("search");

// const searchForm = document.getElementById("search-form");
// const submit = document.getElementById("submit");
// const searchData = document.getElementById("searchData");
let weatherData;
let results;
const app = document.getElementById("root");

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
        main: { temp },
        coord: { lon, lat },
      } = data;

      const card = document.createElement("div");
      card.setAttribute("id", `${city}`);
      card.classList.add("card");

      const card__text = document.createElement("div");

      const cityName = document.createElement("h2");
      cityName.textContent = name;

      const currWeather = document.createElement("p");
      currWeather.textContent = description;
      console.log("the description is:", description);
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

// const searchForm = document.forms["search-form"]
// const search = searchForm.elements["search"];

// const loadForm = () => {
//   const form = document.createElement("form");
//   form.setAttribute("id", "search-form");
//   form.innerHTML = ` <form id="search-form" >
//              <div>
//                  <img src="./images/research.png" alt="search icon">
//                  <input id="city-search" type="text">
//                  <button type="submit"></button>

//              </div>
//          </form>`;

//   results = document.createElement("div");
//   results.setAttribute("id", "results");

//   app.appendChild(form);
//   app.appendChild(results);
// };

// window.addEventListener("load", () => {
//   // getCurrLocation;
//   // searchHandler();
//   loadForm();

//   const search = document.getElementById("city-search");
//   search.addEventListener("input", async (e) => {
//     try {
//       // let city = search.value;
//       let city = e.target.value;
//       console.log(city);
//       const { data } = await axios.get(
//         `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${key}`
//       );

//       weatherData = data;
//     } catch (error) {
//       console.error("error:", error);
//     }
//     const searchForm = document.getElementById("search-form");
//     searchForm.addEventListener("submit", searchHandler);
//   });

//   const searchHandler = (e) => {
//     const results = document.getElementById("results");
//     e.preventDefault();
//     const {
//       name,
//       weather: { main, description, icon },
//       main: { temp },
//     } = weatherData;

//     const alreadyAdded = Array.from(results.children).some((child) => {
//       return child.querySelector("h2").textContent === name;
//     });

//     if (!alreadyAdded) {
//       const card = document.createElement("div");
//       card.classList.add("card");

//       const card__text = document.createElement("div");

//       const cityName = document.createElement("h2");
//       cityName.textContent = name;

//       const currWeather = document.createElement("p");
//       currWeather.textContent = description;
//       // const weatherIcon = document.createElement("img");
//       // weatherIcon.setAttribute(
//       //   "src",
//       //   `https://openweathermap.org/img/w/${icon}.png`
//       // );
//       // weatherIcon.classList.add("weather-icon");

//       const plusIcon = document.createElement("img");
//       plusIcon.setAttribute("src", "./images/plus.png");
//       plusIcon.setAttribute("id", "plus");
//       plusIcon.classList.add("weather-icon");

//       plusIcon.addEventListener("click", () => {
//         const existingCities = JSON.parse(localStorage.getItem("cities")) || [];
//         const updatedCities = [...existingCities, name];
//         localStorage.setItem("cities", JSON.stringify(updatedCities));
//         console.log(`City '${name}' has been added to local storage.`);
//       });

//       const tempData = document.createElement("p");
//       tempData.textContent = temp;
//       card__text.appendChild(cityName);
//       // card__text.appendChild(form);
//       card__text.appendChild(currWeather);
//       card.appendChild(card__text);
//       // card.appendChild(weatherIcon);
//       card.appendChild(tempData);

//       card.appendChild(plusIcon);
//       results.appendChild(card);
//       // app.appendChild(card);
//     }
//   };

//   // searchForm.addEventListener("submit", searchHandler);
// });

// const search = document.getElementById("city-search");
// search.addEventListener("input", async (e) => {
//   try {
//     // let city = search.value;
//     let city = e.target.value;
//     console.log(city);
//     const { data } = await axios.get(
//       `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${key}`
//     );

//     weatherData = data;
//   } catch (error) {
//     console.error("error:", error);
//   }
// });

// searchForm.addEventListener("submit", searchHandler);

// window.location.href = `forecast.html?city=${cityName}&temp=${temp}&description=${description}&icon=${icon}`;

// =================================================================

// const app = document.getElementById("root");
// const successCallback = (position) => {
//   console.log(position);
// };

// const errorCallback = (error) => {
//   console.log(error);
// };

// // navigator.geolocation.getCurrentPosition(successCallback, errorCallback);
// // const id = navigator.geolocation.watchPosition(successCallback, errorCallback);

// const options = {
//   enableHighAccuracy: true,
//   timeout: 10000,
// };

// navigator.geolocation.getCurrentPosition(
//   successCallback,
//   errorCallback,
//   options
// );

// const getCurrLocation = navigator.geolocation.getCurrentPosition(
//   async (position) => {
//     try {
//       const { latitude, longitude } = position.coords;

//       // Make a request to the OpenWeather API
//       const { data } = await axios.get(
//         `https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&appid=${key}`
//       );

//       const {
//         timezone,
//         current: {
//           temp,
//           weather: [{ main, icon }],
//         },
//       } = data;

//       // Display the weather information on the webpage
//       const card = document.createElement("div");
//       card.classList.add("card");
//       const card__text = document.createElement("div");
//       const currLocation = document.createElement("p");
//       currLocation.textContent = "Current";
//       const cityName = document.createElement("h2");
//       cityName.textContent = timezone;
//       const currWeather = document.createElement("p");
//       currWeather.textContent = main;
//       const weatherIcon = document.createElement("img");
//       weatherIcon.setAttribute(
//         "src",
//         `https://openweathermap.org/img/w/${icon}.png`
//       );
//       weatherIcon.classList.add("weather-icon");

//       const plusIcon = document.createElement("img");
//       plusIcon.setAttribute("src", "./images/plus.png");

//       plusIcon.classList.add("weather-icon");
//       const tempData = document.createElement("p");
//       const celsius = Math.round(temp - 273.15) + "°C";
//       tempData.textContent = celsius;
//       card__text.appendChild(cityName);
//       card__text.appendChild(currWeather);
//       card.appendChild(card__text);
//       card.appendChild(weatherIcon);
//       card.appendChild(tempData);

//       app.appendChild(card);
//     } catch (error) {
//       console.error("error:", error);
//     }
//   }
// );

// window.addEventListener("load", () => {
//   // getCurrLocation;
//   // searchHandler();
//   loadForm();
// });

// window.addEventListener("load", getData());

// const createWeatherCard = (city, weather, iconSrc) => {
//   const card = document.createElement("div");
//   card.classList.add("card");
//   const card__text = document.createElement("div");

//   const cityName = document.createElement("h2");
//   cityName.textContent = name;

//   const currWeather = document.createElement("p");
//   currWeather.textContent = description;
//   const weatherIcon = document.createElement("img");
//   weatherIcon.setAttribute(
//     "src",
//     `https://openweathermap.org/img/w/${icon}.png`
//   );
//   weatherIcon.classList.add("weather-icon");

//   const plusIcon = document.createElement("img");
//   plusIcon.setAttribute("src", "./images/plus.png", "id", "plus");
//   plusIcon.classList.add("weather-icon");

//   const tempData = document.createElement("p");
//   tempData.textContent = temp;
//   card__text.appendChild(cityName);
//   card__text.appendChild(currWeather);
//   card.appendChild(card__text);
//   card.appendChild(weatherIcon);
//   card.appendChild(temp);

//   card.appendChild(plusIcon);
// };

// const root = document.getElementById("root");

// // updates Immutable store object
// const updateStore = (state, newState) => {
//   store = state.merge(newState);
//   render(root, store);
// };

// const render = async (root, state) => {
//   root.innerHTML = App(
//     state,
//     sidebar,
//     tabs,
//     renderRoverImages,
//     roverFact,
//     displayRoverInfo
//   );
// };

// // listening for load event because page should load before any JS is called
// window.addEventListener("load", () => {
//   getRoverImage(store.get("selectedRover"));
//   getRoverInfo(store.get("selectedRover"));
//   render(root, store);
// });
