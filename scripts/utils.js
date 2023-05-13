import apiKey from "../apiKey.js";

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

export const appendCardEl = (child, domRef) => {
  domRef.append(child);
};

export const appendCardElements = (elements, domRef) => {
  elements.forEach((element) => {
    domRef.appendChild(element);
  });
};

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
    speed,
    visibility,
  };
};

export const geolocationApiCall = async (latitude, longitude, apiKey) => {
  // Make a request to the OpenWeather API
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
  } = data;

  return {
    name,
    temp,
    description,
    icon,
    humidity,
    lon,
    lat,
    speed,
    visibility,
  };
};

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
  icon
) => {
  elem.addEventListener("click", () => {
    // const cityName = cityName.textContent;
    window.location.href = `forecast.html?city=${name}&lon=${lon}&lat=${lat}&description=${description}&temp=${temp}&humidity=${humidity}&speed=${speed}&visibility=${visibility}&icon=${icon}`;
  });
};

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
        "h2",
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
        [
          {
            name: "src",
            value: `https://openweathermap.org/img/w/${weatherApiData.icon}.png`,
          },
          { name: "class", value: "weather-icon" },
          { name: "alt", value: `${weatherApiData.name} weather icon` },
        ],
        "img"
      ),

      createWeatherCardElement(
        [{ name: "class", value: "card__temp" }],
        "p",
        celsius
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

export const removeFavorite = (e, card, city) => {
  e.stopPropagation();
  // save variable of item

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
      weatherApiData.icon
    );
  });
};

// attachAddFavoriteListener = () => {};

// updateInterface

// const todayDate = () => {};

// date helpers

// link to forecasts

export const forecastDynamicBackground = (weatherDescription) => {
  // const body = document.querySelector(".forecast-body");
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
      body.style.setProperty("background", "var(--clouds)");
      break;
    case "shower rain":
    case "rain":
    case "thunderstorm":
    case "mist":
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
