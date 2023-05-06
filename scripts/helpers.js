const createWeatherCard = (city, weather, iconSrc) => {
  const card = document.createElement("div");
  card.classList.add("card");
  const card__text = document.createElement("div");

  const cityName = document.createElement("h2");
  cityName.textContent = name;

  const currWeather = document.createElement("p");
  currWeather.textContent = description;
  const weatherIcon = document.createElement("img");
  weatherIcon.setAttribute(
    "src",
    `https://openweathermap.org/img/w/${icon}.png`
  );
  weatherIcon.classList.add("weather-icon");

  const plusIcon = document.createElement("img");
  plusIcon.setAttribute("src", "./images/plus.png", "id", "plus");
  plusIcon.classList.add("weather-icon");

  const tempData = document.createElement("p");
  tempData.textContent = temp;
  card__text.appendChild(cityName);
  card__text.appendChild(currWeather);
  card.appendChild(card__text);
  card.appendChild(weatherIcon);
  card.appendChild(temp);

  card.appendChild(plusIcon);
};
