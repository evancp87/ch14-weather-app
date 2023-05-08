import apiKey from "../apiKey.js";

const search = document.getElementById("search-section");
let weatherData;
let results;

export const loadForm = () => {
  const formContainer = document.createElement("header");
  formContainer.innerHTML = ` <form id="search-form" >
               <div>
                   <img src="./images/research.png" class="search-icon" alt="search icon">
                   <input id="city-search" type="text">
                   <button type="submit"></button>
   
               </div>
           </form>`;

  // lifting the scope
  results = document.createElement("div");
  results.setAttribute("id", "results");

  search.appendChild(formContainer);
  search.appendChild(results);
  const searchForm = document.getElementById("search-form");

  // Add event listener to the search form
  searchForm.addEventListener("submit", searchHandler);
};

// handles searching and display results on submit
const searchHandler = async (e) => {
  e.preventDefault();
  try {
    let city = document.getElementById("city-search").value.trim();
    console.log(city);
    const { data } = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`
    );

    weatherData = data;
    console.log("the data is:", weatherData);
    const results = document.getElementById("results");
    const {
      name,
      weather: { main, description, icon },
      main: { temp },
    } = weatherData;

    // disallows duplicate searches if currently the city displayed
    const alreadyAdded = Array.from(results.children).some((child) => {
      return child.querySelector("h2").textContent === name;
    });

    if (!alreadyAdded) {
      // removes previous search result and replaces with new city each submission
      results.innerHTML = "";
      const card = document.createElement("div");
      card.classList.add("card");

      const cardText = document.createElement("div");

      const cityName = document.createElement("h2");
      cityName.textContent = name;

      const currWeather = document.createElement("p");
      currWeather.textContent = description;

      const plusIcon = document.createElement("img");
      plusIcon.setAttribute("src", "./images/plus.png");
      plusIcon.setAttribute("id", "plus");
      plusIcon.classList.add("weather-icon");

      // handles adding a search result as a favorite in local storage
      plusIcon.addEventListener("click", () => {
        const existingCities = JSON.parse(localStorage.getItem("cities")) || [];
        const updatedCities = [...existingCities, name];
        localStorage.setItem("cities", JSON.stringify(updatedCities));
        console.log(`City: '${name}' has been added to local storage.`);
        // redirects to landing page
        window.location.href = "index.html";
      });
      // creates weather card
      const tempData = document.createElement("p");
      tempData.textContent = temp;
      cardText.appendChild(cityName);
      cardText.appendChild(currWeather);
      card.appendChild(cardText);
      card.appendChild(tempData);

      card.appendChild(plusIcon);
      results.appendChild(card);
      search.appendChild(results);
    }
  } catch (error) {
    console.error("error:", error);
  }
};

window.addEventListener("load", () => {
  loadForm();
});
