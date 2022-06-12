var search = document.querySelector(".btn-primary")
var cityInputEl = document.querySelector("#city")

var getCityCords = function(city) {
    var apiUrl = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=e9d7a3675952ed36817b457db72d2540"

    fetch(apiUrl)
    .then(function(response) {
        if (response.ok) {
            response.json().then(function(data) {
                console.log(data.coord);
            })
        }
    });
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


search.addEventListener("click", searchHandler)