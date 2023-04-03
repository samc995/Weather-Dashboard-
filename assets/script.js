var cityArray = [];
const apiKey = "bdadf6de3b46ae19180d8ff3b828f63f";
const forecastWeather = document.getElementById("forecastWeather");
let searchInput = document.querySelector("input");
const searchButton = document.getElementById("searchButton");
const currentDate = dayjs().format("dddd, MMMM D, YYYY")

document.getElementById("currentDate").textContent = currentDate;

searchButton.addEventListener("click", handleSearchSubmit);
searchInput.addEventListener("keypress", function (event) {
  if (event.key === "Enter") {
    handleSearchSubmit();
  }
});
function handleSearchSubmit() {
  if (searchInput.value !== "") {
    let city = searchInput.value;
    fetchCurrentWeather(city);
  }
}

function fetchCurrentWeather(city) {
  let apiUrlWeather = `https://api.openweathermap.org/data/2.5/weather?appid=${apiKey}&q=${city}&units=imperial`;
  fetch(apiUrlWeather)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      var lat = data.coord.lat;
      var lon = data.coord.lon;
      console.log(data);
      getForecastByLatLon(lat, lon);
      displayCurrentWeather(data);
    });
}
function displayCurrentWeather(data) {
  document.getElementById("forecastDate").innerHTML = getCurrentDate();
  getCurrentDate();
  document.getElementById("date").textContent = data.name;
//     .unix(data.dt)
//     .format("M/D/YYYY");
//   document.getElementById("cityName").textContent = data.name;
  var iconUrl = `https://openweathermap.org/img/w/${data.weather[0].icon}.png`;
  document.getElementById("icon").setAttribute("src", iconUrl);
  document.getElementById("temperature").textContent =
    " Temp: " + data.main.temp + " F";
  document.getElementById("humidity").textContent =
    " Humidity: " + data.main.humidity + " %";
  document.getElementById("windSpeed").textContent =
    "Wind Speed: " + data.wind.speed + " MPH";
}
function getForecastByLatLon(lat, lon) {
  var apiUrlForecast = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=imperial&appid=${apiKey}`;
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
  for (let i = 4; i < data.length; i += 8) {
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
}

function showSearchHistory() {}

document.getElementById("submitBtn").onclick = handleSearchSubmit;






