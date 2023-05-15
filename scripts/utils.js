import apiKey from "../apiKey.js";

// creates weather cards programatically by taking in html tag, an array of attributes and optional text and children
export const createWeatherCardElement = (
  attributes = [],
  tag,
  text = "",
  children = []
) => {
  const element = document.createElement(tag);

  if (text !== "") {
    const _text = document.createTextNode(text);
    element.append(_text);
  }

  if (attributes) {
    attributes.forEach(({ name, value }) => {
      element.setAttribute(name, value);
    });

    if (children) {
      children.forEach((child) => {
        element.appendChild(child);
      });
    }
  }
  return element;
};

// functions for dom creation and appending
export const appendCardEl = (child, domRef) => {
  domRef.append(child);
};

export const appendChildEl = (child, domRef) => {
  if (Array.isArray(child)) {
    child.forEach((c) => {
      domRef.appendChild(c);
    });
  } else {
    domRef.appendChild(child);
  }
};

export const appendCardElements = (elements, domRef) => {
  elements.forEach((element) => {
    domRef.appendChild(element);
  });
};

// api call and data destructuring
export const apiCall = async (city, apiKey) => {
  const { data } = await axios.get(
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`
  );
  const {
    name,
    weather: [{ main, description, icon }],
    main: { temp, humidity },
    coord: { lon, lat },
    wind: { speed },
    dt,
    timezone,
    visibility,
  } = data;

  return {
    name,
    main,
    description,
    icon,
    temp,
    humidity,
    lon,
    lat,
    dt,
    timezone,
    speed,
    visibility,
  };
};

// api call for Geolocation
export const geolocationApiCall = async (latitude, longitude, apiKey) => {
  const { data } = await axios.get(
    `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}`
  );

  const {
    name,
    main: { temp, humidity },
    weather: [{ description, icon }],
    coord: { lon, lat },
    wind: { speed },
    visibility,
    dt,
    timezone,
  } = data;

  return {
    name,
    temp,
    description,
    icon,
    humidity,
    lon,
    lat,
    dt,
    timezone,
    speed,
    visibility,
  };
};

// links to city forecast on click by passing params to url
export const linkToForecast = (
  elem,
  name,
  lon,
  lat,
  description,
  temp,
  humidity,
  speed,
  visibility,
  icon,
  dt,
  timezone
) => {
  elem.addEventListener("click", () => {
    // const cityName = cityName.textContent;
    window.location.href = `forecast.html?city=${name}&lon=${lon}&lat=${lat}&description=${description}&temp=${temp}&humidity=${humidity}&speed=${speed}&visibility=${visibility}&icon=${icon}&dt=${dt}&timezone=${timezone}`;
  });
};

// creates weather card from api data
export const createWeatherCard = (weatherApiData, domRef) => {
  if (weatherApiData) {
    const card = createWeatherCardElement(
      [
        { name: "id", value: "`${city}`" },
        { name: "class", value: "favorite card dropzone" },
      ],
      "div"
    );

    const cardText = createWeatherCardElement(
      [{ name: "class", value: "card__text" }],
      "div"
    );

    const weatherCardElArr = [
      createWeatherCardElement(
        [{ name: "class", value: "card__heading" }],
        "h3",
        weatherApiData.name
      ),
      createWeatherCardElement(
        [{ name: "class", value: "card__current-weather" }],
        "p",
        weatherApiData.description
      ),
    ];
    appendCardElements(weatherCardElArr, cardText);

    // **
    const celsius = Math.round(weatherApiData.temp - 273.15) + "°C";
    const iconsContainer = createWeatherCardElement(
      [{ name: "class", value: "card__icons" }],
      "div"
    );

    const weatherData = [
      createWeatherCardElement(
        [{ name: "class", value: "card__temp" }],
        "p",
        celsius
      ),
      createWeatherCardElement(
        [
          {
            name: "src",
            value: `https://openweathermap.org/img/wn/${weatherApiData.icon}@2x.png`,
          },
          { name: "class", value: "weather-icon" },
          { name: "alt", value: `${weatherApiData.name} weather icon` },
        ],
        "img"
      ),
    ];

    appendCardElements(weatherData, iconsContainer);

    const cardContainer = createWeatherCardElement(
      [{ name: "class", value: "card__container" }],
      "div"
    );

    // card.appendChild(cardContainer);
    appendCardElements([cardText, iconsContainer], cardContainer);
    // appendCardEl(iconsContainer, cardContainer);
    appendCardEl(cardContainer, card);
    // appendCardEl(card, favorites);
    appendCardEl(card, domRef);

    return { card, iconsContainer };
  }
};

// removes favourite from favouries section
export const removeFavorite = (e, card, city) => {
  e.stopPropagation();

  const itemToDelete = city;
  const citiesString = localStorage.getItem("cities");
  let citiesArray = JSON.parse(citiesString);

  // Remove the selected city from the array
  citiesArray = citiesArray.filter((cityName) => cityName !== itemToDelete);

  // Update the "cities" key in the localStorage
  localStorage.setItem("cities", JSON.stringify(citiesArray));

  console.log(itemToDelete, "was deleted");
  card.remove();
};

// ============================================
// event listeners for removing/adding favorites, etc
export const attachRemoveListener = (
  removeButton,
  card,
  city,
  iconsContainer
) => {
  appendCardEl(removeButton, iconsContainer);
  removeButton.addEventListener("click", (e) => {
    removeFavorite(e, card, city);
  });
};

// adds to local storage
export const attachAddFavoriteListener = (
  plusIconButton,
  city,
  iconsContainer
) => {
  appendCardEl(plusIconButton, iconsContainer);
  plusIconButton.addEventListener("click", () => {
    const existingCities = JSON.parse(localStorage.getItem("cities")) || [];
    const updatedCities = [...existingCities, city];
    localStorage.setItem("cities", JSON.stringify(updatedCities));
    console.log(`City: '${city}' has been added to local storage.`);

    // redirects to landing page
    window.location.href = "index.html";
  });
};

export const attachCardClickListener = (card, weatherApiData) => {
  card.addEventListener("click", () => {
    linkToForecast(
      card,
      weatherApiData.name,
      weatherApiData.lon,
      weatherApiData.lat,
      weatherApiData.description,
      weatherApiData.temp,
      weatherApiData.humidity,
      weatherApiData.speed,
      weatherApiData.visibility,
      weatherApiData.icon,
      weatherApiData.dt,
      weatherApiData.timezone
    );
  });
};
// ============================================

export const appendElementsToSearch = (elements, searchContainer) => {
  elements.forEach((element) => {
    searchContainer.appendChild(element);
  });
};

export const getCurrentDate = () => {
  const currentDate = new Date();
  const options = { year: "numeric", month: "long", day: "numeric" };
  return currentDate.toLocaleDateString("en-gb", options);
};

export const getInternationalDateTime = (timestamp) => {
  const d = new Date(timestamp * 1000);
  const options = {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  };

  return d.toLocaleDateString("en-gb", options);
};

export const getCurrentTime = () => {
  const d = new Date();

  const currentTime = d.getHours();
  return currentTime;
};

// for greeting on landing page
export const getGreeting = (currentTime) => {
  let greet;

  if (currentTime >= 0 && currentTime < 12) {
    greet = "morning";
  } else if (currentTime >= 12 && currentTime < 18) {
    greet = "afternoon";
  } else if (currentTime >= 18 && currentTime < 24) {
    greet = "evening";
  } else {
    greet = "night";
  }
  return greet;
};

// dynamically changes background of forecast city page based on weather
export const forecastDynamicBackground = (weatherDescription) => {
  const body = document.getElementById("forecastBody");

  switch (weatherDescription.innerText) {
    case "clear sky":
    case "haze":
    case "few clouds":
      body.style.setProperty("background", "var(--sunny)");
      break;
    case "scattered clouds":
    case "broken clouds":
    case "overcast clouds":
    case "mist":
      body.style.setProperty("background", "var(--clouds)");
      break;
    case "shower rain":
    case "rain":
    case "light rain":
    case "thunderstorm":
      body.style.setProperty("background", "var(--rain)");
      break;
    case "snow":
      body.style.setProperty("background", "var(--snow)");
      break;
    default:
      body.style.setProperty("background", "var(--default-bg)");
      break;
  }
};

// skeleton loading card for api call

export const skeletonLoading = (app) => {
  const loadingContainer = createWeatherCardElement(
    [{ name: "class", value: "card skeleton-card" }],
    "div"
  );

  const skeletonIcons = createWeatherCardElement(
    [{ name: "class", value: "skeleton-icons" }],
    "div"
  );
  app.insertBefore(loadingContainer, app.firstChild);
  return loadingContainer;
};

export const sortFavorites = (favorites) => {
  return favorites.sort((a, b) => (a < b ? -1 : 1));
};

// =================================================

// reusable functions for search form

const createFormContainer = () =>
  createWeatherCardElement(
    [
      { name: "id", value: "searchForm" },
      { name: "class", value: "search-form" },
    ],
    "form"
  );

const createLabel = () =>
  createWeatherCardElement(
    [
      { name: "for", value: "search-input" },
      { name: "class", value: "search-input-label" },
    ],
    "label",
    "Enter city"
  );

const createSearchInput = () =>
  createWeatherCardElement(
    [
      { name: "id", value: "citySearch" },
      { name: "class", value: "search-input" },
      { name: "type", value: "text" },
      { name: "name", value: "search-input" },
    ],
    "input"
  );

const createInputBtn = () =>
  createWeatherCardElement(
    [{ name: "class", value: "search-btn" }],
    "button",
    "search"
  );

export const createFormElements = () => {
  const formContainer = createFormContainer();
  const label = createLabel();
  const searchInput = createSearchInput();
  const inputBtn = createInputBtn();

  appendCardElements([label, searchInput, inputBtn], formContainer);

  return [formContainer];
};
