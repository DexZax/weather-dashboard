var searchBtn = document.querySelector(".btn-primary")
var cityInputEl = document.querySelector("#city")
var weatherContainer = document.querySelector("#weather-container")


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
    var apiUrl = "https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + lon + "&units=metric&exclude=minutely,hourly,alerts&appid=e9d7a3675952ed36817b457db72d2540"

    fetch(apiUrl)
    .then(function(response) {
        if (response.ok) {
            response.json().then(function(data) {
                console.log(data.current, data.daily)
                displayWeather(data.current, data.daily, city);

            })
        }else {
            alert("unable to find this City")
        }
    })
}

var displayWeather = function (currentWeather, dailyWeather, city) {
    weatherContainer.innerHTML = "";
   
    // create container to hold current day weather
    var currentDay = document.createElement("div")
    currentDay.classList = "current-day card col-10";

    // create h3 for date and city name
    var date = document.createElement("h3")
    date.textContent = city + "-" + currentWeather.dt;

    // create p tags to display required weather details
    var temp = document.createElement("p");
    temp.textContent = "Temperature: " + currentWeather.temp + "C";

    var humidity = document.createElement("p");
    humidity.textContent = "Humidity: " + currentWeather.humidity + "%";

    var wind = document.createElement("p");
    wind.textContent = "Wind Speed: " + currentWeather.wind_speed + "km/h";

    var uv = document.createElement("p");
    uv.textContent = "UV Index: " + currentWeather.uvi;

    weatherContainer.appendChild(currentDay);
    currentDay.appendChild(date);
    currentDay.appendChild(temp);
    currentDay.appendChild(humidity);
    currentDay.appendChild(wind);
    currentDay.appendChild(uv);
}

var searchHandler = function (event) {
    event.preventDefault();
    var city = cityInputEl.value.trim();
    if (city) {
        getCityCords(city);
        cityInputEl.value = "";
    } else {
        alert ("Please enter a City to view that City's weather")
    }
}


searchBtn.addEventListener("click", searchHandler)