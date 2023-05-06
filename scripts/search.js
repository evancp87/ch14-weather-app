import dotenv from "dotenv";

// Load environment variables from .env file
dotenv.config();

// use API key from environment variable
const apiKey = process.env.API_KEY;

const search = document.getElementById("search");

const searchForm = document.getElementById("search-form");
const submit = document.getElementById("submit");
const searchData = document.getElementById("searchData");
let weatherData;

// const searchForm = document.forms["search-form"]
// const search = searchForm.elements["search"];

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

// const searchHandler = () => {
//   (e) => {
//     e.preventDefault();
//     const {
//       name,
//       weather: { main, description, icon },
//       main: { temp },
//     } = weatherData;

//     const card = document.createElement("div");
//     card.classList.add("card");
//     const card__text = document.createElement("div");

//     const cityName = document.createElement("h2");
//     cityName.textContent = name;

//     const currWeather = document.createElement("p");
//     currWeather.textContent = description;
//     const weatherIcon = document.createElement("img");
//     weatherIcon.setAttribute(
//       "src",
//       `https://openweathermap.org/img/w/${icon}.png`
//     );
//     weatherIcon.classList.add("weather-icon");

//     const plusIcon = document.createElement("img");
//     plusIcon.setAttribute("src", "./images/plus.png", "id", "plus");
//     plusIcon.classList.add("weather-icon");

//     const tempData = document.createElement("p");
//     tempData.textContent = temp;
//     card__text.appendChild(cityName);
//     card__text.appendChild(currWeather);
//     card.appendChild(card__text);
//     card.appendChild(weatherIcon);
//     card.appendChild(temp);

//     card.appendChild(plusIcon);
//     weatherData.appendChild(card);
//   };
// };

// searchForm.addEventListener("submit", searchHandler);

const loadForm = () => {
  const form = document.createElement("form");
  form.setAttribute("id", "search-form");
  form.innerHTML = ` <form id="search-form" >
               <div>
                   <img src="./images/research.png" alt="search icon">
                   <input id="city-search" type="text">
                   <button type="submit"></button>
   
               </div>
           </form>`;

  results = document.createElement("div");
  results.setAttribute("id", "results");

  app.appendChild(form);
  app.appendChild(results);
};

window.addEventListener("load", () => {
  // getCurrLocation;
  // searchHandler();
  loadForm();

  const search = document.getElementById("city-search");
  search.addEventListener("input", async (e) => {
    try {
      // let city = search.value;
      let city = e.target.value;
      console.log(city);
      const { data } = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${key}`
      );

      weatherData = data;
    } catch (error) {
      console.error("error:", error);
    }
    const searchForm = document.getElementById("search-form");
    searchForm.addEventListener("submit", searchHandler);
  });

  const searchHandler = (e) => {
    const results = document.getElementById("results");
    e.preventDefault();
    const {
      name,
      weather: { main, description, icon },
      main: { temp },
    } = weatherData;

    const alreadyAdded = Array.from(results.children).some((child) => {
      return child.querySelector("h2").textContent === name;
    });

    if (!alreadyAdded) {
      const card = document.createElement("div");
      card.classList.add("card");

      const card__text = document.createElement("div");

      const cityName = document.createElement("h2");
      cityName.textContent = name;

      const currWeather = document.createElement("p");
      currWeather.textContent = description;
      // const weatherIcon = document.createElement("img");
      // weatherIcon.setAttribute(
      //   "src",
      //   `https://openweathermap.org/img/w/${icon}.png`
      // );
      // weatherIcon.classList.add("weather-icon");

      const plusIcon = document.createElement("img");
      plusIcon.setAttribute("src", "./images/plus.png");
      plusIcon.setAttribute("id", "plus");
      plusIcon.classList.add("weather-icon");

      plusIcon.addEventListener("click", () => {
        const existingCities = JSON.parse(localStorage.getItem("cities")) || [];
        const updatedCities = [...existingCities, name];
        localStorage.setItem("cities", JSON.stringify(updatedCities));
        console.log(`City '${name}' has been added to local storage.`);
      });

      const tempData = document.createElement("p");
      tempData.textContent = temp;
      card__text.appendChild(cityName);
      // card__text.appendChild(form);
      card__text.appendChild(currWeather);
      card.appendChild(card__text);
      // card.appendChild(weatherIcon);
      card.appendChild(tempData);

      card.appendChild(plusIcon);
      results.appendChild(card);
      // app.appendChild(card);
    }
  };

  // searchForm.addEventListener("submit", searchHandler);
});

// window.location.href = `forecast.html?city=${cityName}&temp=${temp}&description=${description}&icon=${icon}`;

// TODO: implement
// card.addEventListener("click", () => {
//     // const cityName = cityName.textContent;
//     window.location.href = `forecast.html?city=${cityName.textContent}&lon=${lon}&lat=${lat}`;
//   });
