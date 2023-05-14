import apiKey from "../apiKey.js";
import {
  createWeatherCardElement,
  createWeatherCard,
  apiCall,
  attachCardClickListener,
  attachAddFavoriteListener,
  appendCardElements,
} from "./utils.js";

const search = document.getElementById("search-section");
let weatherData;
let results;
let input;

export const loadForm = () => {
  const formContainer = createWeatherCardElement(
    [
      { name: "id", value: "searchForm" },
      { name: "class", value: "search-form" },
    ],
    "form"
  );

  const searchInput = createWeatherCardElement(
    [{ name: "id", value: "citySearch", name: "class", value: "search-input" }],
    "input"
  );

  const inputBtn = createWeatherCardElement(
    [{ name: "class", value: "search-btn" }],
    "input"
  );

  appendCardElements([searchInput, inputBtn], formContainer);

  // TODO: add labels
  formContainer.innerHTML = ` 
                   <input id="citySearch" type="text" class="search-input">
                   <button class="search-btn"type="submit">Search</button>
   
          `;

  results = createWeatherCardElement(
    [
      { name: "id", value: "results" },
      { name: "class", value: "search-results" },
    ],
    "div"
  );
  // lifting the scope

  appendCardElements([formContainer, results], search);
  const backBtn = createWeatherCardElement(
    [{ name: "class", value: "search__back-button btn" }],
    "button"
  );

  // const backBtn = document.createElement("button");
  // backBtn.setAttribute("class", "forecast__back-button btn");
  const back = `
  
<a href="index.html">Back </a>

  `;
  backBtn.innerHTML = back;
  appendCardElements([backBtn, formContainer, results], search);
  // search.appendChild(formContainer);
  // search.appendChild(results);

  const searchForm = document.getElementById("searchForm");

  // Add event listener to the search form
  searchForm.addEventListener("submit", searchHandler);

  input = document.getElementById("citySearch");
  // TODO
  input.addEventListener("focus", focusInput);
  input.addEventListener("blur", blurInput);
};

// handles searching and display results on submit
const searchHandler = async (e) => {
  e.preventDefault();
  try {
    let city = document.getElementById("citySearch").value.trim();
    console.log(city);

    weatherData = await apiCall(city, apiKey);

    console.log("the data is:", weatherData);
    const results = document.getElementById("results");

    // disallows duplicate searches if currently the city displayed
    const alreadyAdded = Array.from(results.children).some((child) => {
      return child.querySelector("h2").textContent === name;
    });

    // Display the weather information on the webpage

    if (!alreadyAdded) {
      // removes previous search result and replaces with new city each submission
      results.innerHTML = "";

      const { card, iconsContainer } = createWeatherCard(weatherData, results);

      const plusIcon = createWeatherCardElement(
        [
          { name: "id", value: "plus" },
          { name: "src", value: "./images/plus.png" },
          { name: "class", value: "plus-icon" },
        ],
        "img"
      );
      attachAddFavoriteListener(plusIcon, city, iconsContainer);
      attachCardClickListener(card, weatherData);
      // appendCardEl(plusIcon, iconsContainer);
    }
  } catch (error) {
    console.error("error:", error);
  }
};

const focusInput = (event) => {
  event.target.style.outline = "3px dashed #979797";
  event.target.style.backgroundImage = "";
};

const blurInput = (event) => {
  event.target.style.outline = "";
};

window.addEventListener("load", () => {
  loadForm();
});
