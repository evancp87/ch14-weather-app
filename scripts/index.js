import { getCurrLocation } from "./geolocation.js";
import { getFavorites } from "./favourites.js";
import { loadDraggableItems } from "./drag.js";

console.log("hello world");

const onLoad = () => {
  getCurrLocation();
  getFavorites();
  loadDraggableItems();
};

window.addEventListener("load", onLoad);
