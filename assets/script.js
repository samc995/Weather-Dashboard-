let cityArray = [];
const apiKey = "bdadf6de3b46ae19180d8ff3b828f63f";
const forecastWeather = document.getElementById("forecastWeather");
const searchInput = document.querySelector("input");
const searchButton = document.getElementById("searchButton");



searchButton.addEventListener("click", handleSearchSubmit);
searchInput.addEventListener("keypress", function (event) {
  if (event.key === "Enter") {
    handleSearchSubmit();
  }
});
function handleSearchSubmit() {
  if (searchInput.value !== "") {
    const city = searchInput.value;
    fetchCurrentWeather(city);
    saveToSearch(city);
  }
}

function fetchCurrentWeather(city) {
  const apiUrlWeather = `https://api.openweathermap.org/data/2.5/weather?appid=${apiKey}&q=${city}&units=imperial`;
  fetch(apiUrlWeather)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      const lat = data.coord.lat;
      const lon = data.coord.lon;
      console.log(data);
      getForecastByLatLon(lat, lon);
      displayCurrentWeather(data);
    })
    .then(getCurrentDate);
}
function getCurrentDate() {
 return dayjs().format("MM/DD/YYYY");
  }

function displayCurrentWeather(data) {
    const currentDate = getCurrentDate();
        // document.getElementById("forecastDate").textContent = currentDate;
    // return dayjs().format("M/D/YYY");

  document.getElementById("forecastDate").textContent = currentDate;
  // document.getElementById("date").innerHTML = getCurrentDate();
  // getCurrentDate();
  // document.getElementById("date").textContent = data.name
  //   .unix(data.dt)
  //   .format("M/D/YYYY");
  document.getElementById("cityName").textContent = data.name;
  const iconUrl = `https://openweathermap.org/img/w/${data.weather[0].icon}.png`;
  document.getElementById("forecastIcon").setAttribute("src", iconUrl);
  document.getElementById("forecastTemperature").textContent =
    " Temp: " + data.main.temp + " F";
  document.getElementById("forecastHumidity").textContent =
    " Humidity: " + data.main.humidity + " %";
  document.getElementById("forecastWindSpeed").textContent =
    "Wind Speed: " + data.wind.speed + " MPH";
}
function getForecastByLatLon(lat, lon) {
  const apiUrlForecast = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=imperial&appid=${apiKey}`;
  fetch(apiUrlForecast)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data);
      displayForecast(data.list);
    });
}
function displayForecast(data) {
    forecastWeather.innerHTML = "";
  for (let i = 4; i < data.length; i += 6) {
    let card = document.createElement("div");
    card.classList.add("forecast-box");
    let cardBody = document.createElement("div");
    let cardHeading = document.createElement("h2");
    let tempEl = document.createElement("p");
    let windEl = document.createElement("p");
    let humidityEl = document.createElement("p");
    let date = dayjs.unix(data[i].dt).format("M/D/YYYY");
    let icon = document.createElement("img");
    let iconUrl = `https://openweathermap.org/img/w/${data[i].weather[0].icon}.png`;
    icon.setAttribute("src", iconUrl);
    cardHeading.append(date, icon);
    tempEl.textContent = data[i].main.temp;
    humidityEl.textContent = data[i].main.humidity;
    windEl.textContent = data[i].wind.speed;
    cardBody.append(tempEl, humidityEl, windEl);
    card.append(cardHeading, cardBody);
    forecastWeather.append(card);
  }
}

function saveToSearch(city) {
  if (cityArray.indexOf(city) !== -1) {
    return;
  }
  cityArray.push(city);
  localStorage.setItem("cities", JSON.stringify(cityArray));
  showSearchHistory ()
}

function showSearchHistory() {
  const searchHistoryEl = document.getElementById("cityButton");
  searchHistoryEl.innerHTML = ""
  for (let i = cityArray.length -1; i >= 0; i--) {  
  let Btn = document.createElement ("button")
  Btn.textContent = cityArray [i]
  Btn.classList.add ("history-Btn", "btn", "btn-primary")
  Btn.setAttribute ("data-search", cityArray [i])
  searchHistoryEl.append (Btn)
  }
}

function loadPage () {
  let storedHistory = localStorage.getItem ("cities")
  if (storedHistory) {
    cityArray = JSON.parse (storedHistory)
    showSearchHistory ()
  }
}
function handleHistoryClick (e) {
if (!e.target.matches(".history-Btn")) {
  return
}
let city = e.target.getAttribute ("data-search")
fetchCurrentWeather (city)
}
loadPage ()
document.getElementById ("cityButton").addEventListener ("click", handleHistoryClick)








