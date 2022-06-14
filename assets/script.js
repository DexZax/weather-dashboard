var searchBtn = document.querySelector(".btn-primary")
var cityInputEl = document.querySelector("#city")

var getCityCords = function(city) {
    var apiUrl = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=e9d7a3675952ed36817b457db72d2540"

    fetch(apiUrl)
    .then(function(response) {
        if (response.ok) {
            response.json().then(function(data) {
                var lat = data.coord.lat;
                var lon = data.coord.lon;
                getCityWeather(lat, lon)
            })
        }
    });
}

var getCityWeather = function(lat, lon) {
    var apiUrl = "https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + lon + "&exclude=minutely,hourly,alerts&appid=e9d7a3675952ed36817b457db72d2540"

    fetch(apiUrl)
    .then(function(response) {
        if (response.ok) {
            response.json().then(function(data) {
                console.log(data);
            })
        }
    })
}

var searchHandler = function (event) {
    event.preventDefault();
    var city = cityInputEl.value.trim();
    if (city) {
        getCityCords(city);
        cityInputEl = "";
    } else {
        alert ("Please enter a City to view that City's weather")
    }
}


searchBtn.addEventListener("click", searchHandler)