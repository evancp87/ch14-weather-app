import { getCurrLocation } from "./geolocation.js";
import { getFavorites } from "./favourites.js";

console.log("hello world");

const onLoad = () => {
  getCurrLocation();
  getFavorites();
};

window.addEventListener("load", onLoad);
