export function createWeatherCardEl(tag, attributes = [], text = "") {
  const element = document.createElement(tag);

  if (text !== "") {
    const _text = document.createTextNode(text);
    element.append(_text);
  }

  attributes.forEach(({ name, value }) => {
    element.setAttribute(name, value);
  });

  // document.getElementById(id).append(element);
  return element;
}

export const createWeatherCard = (domRef, elements) => {
  const root = document.getElementById(domRef);

  elements.forEach((element) => {
    root.appendChild(element);
  });
};

const weatherCardEls = [
  createWeatherCardEl([{ name: "class", value: "card" }], "div", "Sunny"),
  createWeatherCardEl([{ name: "class", value: "card" }], "div", "Cloudy"),
  createWeatherCardEl([{ name: "class", value: "card" }], "div", "Rainy"),
];

createWeatherCard(weatherCardEls);

// api calls?

// link to forecast
// updateInterface

// const todayDate = () => {};

// date helpers

// link to forecasts

// const forecastBg = (weather) => {
// const body = document.getElementById("forecastBody");

// // switch (true) {
// // case weather.includes("rain"):
// //   case "Clear":
// //     return "#FFE873";
// //   case "Clouds":
// //     return "#C7C7CC";
// //   case "Drizzle":
// //   case "Rain":
// //   case "Thunderstorm":
// //     return "#4B4B4C";
// //   case "Snow":
// //     return "#D4F2FF";
// //   case "Mist":
// //   case "Smoke":
// //   case "Haze":
// //   case "Dust":
// //   case "Fog":
// //   case "Sand":
// //   case "Ash":
// //     return "#A7A9AC";
// //   case "Squall":
// //   case "Tornado":
// //     return "#4B4B4C";
// //   default:
// //     return "#FFFFFF";

// // default: --bgcolor

// // // .style.setProperty
// // }

// // }
