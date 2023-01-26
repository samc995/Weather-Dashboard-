const apiKey="bdadf6de3b46ae19180d8ff3b828f63f"

let searchInput = document.querySelector ("input")

function handleSearchSubmit() {
if (searchInput.value !== "") {
    let city=searchInput.value 
    fetchCurrentWeather(city)
}
}

function fetchCurrentWeather(city) {
    let apiUrlWeather = `https://api.openweathermap.org/data/2.5/weather?appid=${apiKey}&q=${city}&units=imperial`;
    fetch(apiUrlWeather).then(function(response){
        return response.json ()
    
    })
    .then(function(data){
        var cityObj = data[0]
        var lat = cityObj.lat
        var lon = cityObj.lon
        console.log (data)
    })
}

var cityArray = JSON.parse(localStorage.getItem("cities")) || [];
var search = {
    city,
    lat,
    lon,
}
 cityArray.push(search)
 localStoarage.setItem("cities" , JSON.stringify(cityArray))
 getForecastByLatLon(lat, lon)



document.getElementById ("submitBtn").onclick=handleSearchSubmit

