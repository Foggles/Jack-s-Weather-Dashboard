// TODO: Setup variables for queryURL and html elements.
let citySearchInput = document.getElementById("citySearchInput");
let previousSearches = document.getElementById("previousSearches");
let fiveDayForecast = document.getElementById("fiveDayForecast");
let searchButton = document.getElementById("searchButton");

let apiKey = "fd2fcff01d8067db25ed7968bc9d3a62";
// Variables for the City Info Card
let cityInfoName = document.getElementById("cityName");
let cityInfoTemperature = document.getElementById("cityTemperature");
let cityInfoHumidity = document.getElementById("cityHumidity");
let cityInfoWindSpeed = document.getElementById("cityWindSpeed");
let cityInfoUVIndex = document.getElementById("cityUVIndex");

// TODO: City search functionality - add the city name to the queryURL.
// * Term entered into search bar is stored into query and a seperate variable for later use.
// * Button has an event listener to trigger the functionality.

searchButton.addEventListener("click", function (event) {
    event.preventDefault();
    
    const searchedCity = citySearchInput.value;
    console.log("You searched for " + searchedCity);

    let queryURLCurrentTemp = "https://api.openweathermap.org/data/2.5/weather?q=" + searchedCity + "&appid=" + apiKey;
    let queryURLForecast = "https://api.openweathermap.org/data/2.5/forecast?q=" + searchedCity + "&appid=" + apiKey;

    console.log("Forecast: " + queryURLForecast);
    console.log("Current: " + queryURLCurrentTemp);
        
    $.ajax({
        url: queryURLCurrentTemp,
        method: "GET"
    }).then(function(response) {
        console.log(response);

        let temperature = Math.round(response.main.temp - 273.15);

        cityInfoName.textContent = response.name;
        cityInfoTemperature.textContent = "Temperature: " + temperature + "°C";
        cityInfoHumidity.textContent = "Humidity: " + response.main.humidity + "%";
        cityInfoWindSpeed.textContent = "Wind Speed: " + response.wind.speed + " m/s";
    });

    $.ajax({
        url: queryURLForecast,
        method: "GET"
    }).then(function(response) {
        console.log(response);

        const lat = response.city.coord.lat;
        const lon = response.city.coord.lon;

        let queryURLUVIndex = "https://api.openweathermap.org/data/2.5/uvi?lat=" + lat + "&lon=" + lon + "&appid=" + apiKey;
        console.log("UV Index: " + queryURLUVIndex);

        $.ajax({
            url: queryURLUVIndex,
            method: "GET"
        }).then(function(response) {
            console.log(response);

            cityInfoUVIndex.textContent = "UV Index: " + response.value;
        });
    });


});

// TODO: If query responds, grab specific data to print to the jumbotron and 
// * Assign a colour to the UV index depending on the result.
// TODO: to the 5-day forcast.
// * Depending on the forecast returned, use a specific icon representation.


// TODO: Store queryURL in local storage, with the city name displayed beneath
// TODO: the search bar.
// * Create new elements and tie the city name and its result to it.