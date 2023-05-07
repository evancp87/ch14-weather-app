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

// example 1
async function getCurrLocation() {
  const { latitude, longitude } = await getCurrentPosition();

  const { data } = await axios.get(
    `https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&appid=${key}`
  );

  const {
    timezone,
    current: {
      temp,
      weather: [{ main, icon }],
    },
  } = data;

  const cityName = document.createElement("h2");
  cityName.textContent = timezone;

  const currWeather = document.createElement("p");
  currWeather.textContent = main;

  const weatherIcon = document.createElement("img");
  weatherIcon.setAttribute(
    "src",
    `https://openweathermap.org/img/w/${icon}.png`
  );
  weatherIcon.classList.add("weather-icon");

  const tempData = document.createElement("p");
  const celsius = Math.round(temp - 273.15) + "°C";
  tempData.textContent = celsius;

  const card = createWeatherCard(data, [
    cityName,
    currWeather,
    weatherIcon,
    tempData,
  ]);

  app.appendChild(card);
}

// example 2
function createWeatherCard(data) {
  const {
    timezone,
    current: {
      temp,
      weather: [{ main, icon }],
    },
  } = data;

  const elements = [
    {
      type: "div",
      class: "card",
      children: [
        {
          type: "div",
          class: "card__text",
          children: [
            { type: "p", textContent: "Current" },
            { type: "h2", textContent: timezone },
            { type: "p", textContent: main },
          ],
        },
        {
          type: "img",
          class: "weather-icon",
          attributes: [
            {
              name: "src",
              value: `https://openweathermap.org/img/w/${icon}.png`,
            },
          ],
        },
        { type: "p", textContent: `${Math.round(temp - 273.15)}°C` },
      ],
    },
  ];

  const card = createElementFromObject(elements[0]);

  app.appendChild(card);
}

function createElementFromObject({
  type,
  textContent,
  class: className,
  children = [],
  attributes = [],
}) {
  const element = document.createElement(type);

  if (textContent) {
    element.textContent = textContent;
  }

  if (className) {
    element.classList.add(className);
  }

  attributes.forEach(({ name, value }) => {
    element.setAttribute(name, value);
  });

  children.forEach((child) => {
    element.appendChild(createElementFromObject(child));
  });

  return element;
}
