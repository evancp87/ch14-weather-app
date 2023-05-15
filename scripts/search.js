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
  const formElements = createFormElements();
  const resultsContainer = createResultsContainer();
  const backBtn = createBackButton();

  appendCardElements([backBtn, ...formElements, resultsContainer], search);

  addEventListeners();
};

const createFormElements = () => {
  const formContainer = createWeatherCardElement(
    [
      { name: "id", value: "searchForm" },
      { name: "class", value: "search-form" },
    ],
    "form"
  );
  const label = createWeatherCardElement(
    [
      { name: "for", value: "search-input" },
      { name: "class", value: "search-input-label" },
    ],
    "label",
    "Enter city"
  );
  const searchInput = createWeatherCardElement(
    [
      { name: "id", value: "citySearch" },
      { name: "class", value: "search-input" },
      { name: "type", value: "text" },
      { name: "name", value: "search-input" },
    ],
    "input"
  );
  const inputBtn = createWeatherCardElement(
    [{ name: "class", value: "search-btn" }],
    "button",
    "search"
  );

  appendCardElements([label, searchInput, inputBtn], formContainer);

  return [formContainer];
};

const createResultsContainer = () => {
  results = createWeatherCardElement(
    [
      { name: "id", value: "results" },
      { name: "class", value: "search-results" },
    ],
    "div"
  );
  const placeholder = createWeatherCardElement(
    [{ name: "class", value: "search-results-placeholder" }],
    "div"
  );

  results.appendChild(placeholder);

  return results;
};

const createBackButton = () => {
  const backBtn = createWeatherCardElement(
    [{ name: "class", value: "search__back-button btn" }],
    "button"
  );

  const back = `<a href="index.html">Back</a>`;
  backBtn.innerHTML = back;

  return backBtn;
};

const addEventListeners = () => {
  const searchForm = document.getElementById("searchForm");
  searchForm.addEventListener("submit", handleSearch);

  input = document.getElementById("citySearch");
  input.addEventListener("focus", focusInput);
  input.addEventListener("blur", blurInput);
};

const handleSearch = async (e) => {
  e.preventDefault();
  try {
    let city = document.getElementById("citySearch").value.trim();
    console.log(city);

    weatherData = await apiCall(city, apiKey);

    console.log("the data is:", weatherData);
    const results = document.getElementById("results");

    // prevents unnecessary api calls if city is already found
    const alreadyAdded = Array.from(results.children).some((child) => {
      const headingElement = child.querySelector(".card__heading");
      return (
        headingElement &&
        headingElement.textContent.toLowerCase() === city.toLowerCase()
      );
    });

    if (!alreadyAdded) {
      // resets results and creates new card
      results.innerHTML = "";

      let { card, iconsContainer } = createWeatherCard(weatherData, results);

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
    }
  } catch (error) {
    console.error("error:", error);
    if (error.response.status === 404 || 400) {
      results.innerHTML = `<p class="not-found">City not found!</p>`;
    }
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
