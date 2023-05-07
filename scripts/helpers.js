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
