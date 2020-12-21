// DONE TODO: Setup variables for queryURL and html elements.
let citySearchInput = document.getElementById("citySearchInput");
let previousSearchesContainer = document.getElementById("previousSearchesContainer");
let fiveDayForecast = document.getElementById("fiveDayForecast");
let searchButton = document.getElementById("searchButton");

let apiKey = "fd2fcff01d8067db25ed7968bc9d3a62"

// Variables for the City Info Card
let cityInfoName = document.getElementById("cityName");
let weatherIcon = document.getElementById("weatherIcon");
let cityInfoTemperature = document.getElementById("cityTemperature");
let cityInfoHumidity = document.getElementById("cityHumidity");
let cityInfoWindSpeed = document.getElementById("cityWindSpeed");
let cityInfoUVIndex = document.getElementById("cityUVIndex");

// Variables for the five day forecast
let firstForecastH4 = document.getElementById("firstForecastH4");
let firstForecastIMG = document.getElementById("firstForecastIMG");
let firstForecastFirstP = document.getElementById("firstForecastP1");
let firstForecastSecondP = document.getElementById("firstForecastP2");

let secondForecastH4 = document.getElementById("secondForecastH4");
let secondForecastIMG = document.getElementById("secondForecastIMG");
let secondForecastFirstP = document.getElementById("secondForecastP1");
let secondForecastSecondP = document.getElementById("secondForecastP2");

let thirdForecastH4 = document.getElementById("thirdForecastH4");
let thirdForecastIMG = document.getElementById("thirdForecastIMG");
let thirdForecastFirstP = document.getElementById("thirdForecastP1");
let thirdForecastSecondP = document.getElementById("thirdForecastP2");

let fourthForecastH4 = document.getElementById("fourthForecastH4");
let fourthForecastIMG = document.getElementById("fourthForecastIMG");
let fourthForecastFirstP = document.getElementById("fourthForecastP1");
let fourthForecastSecondP = document.getElementById("fourthForecastP2");

let fifthForecastH4 = document.getElementById("fifthForecastH4");
let fifthForecastIMG = document.getElementById("fifthForecastIMG");
let fifthForecastFirstP = document.getElementById("fifthForecastP1");
let fifthForecastSecondP = document.getElementById("fifthForecastP2");

// Array for use in localStorage later
let searchedArray = [];

function currentTempAjaxQuery(queryURLCurrentTemp) {
    $.ajax({
        url: queryURLCurrentTemp,
        method: "GET"
    }).then(function (response) {
        console.log(response);

        let temperature = Math.round(response.main.temp - 273.15);
        weatherIcon.src = "./icons/" + response.weather[0].icon + ".png";
        weatherIcon.classList.remove("hidden");

        cityInfoName.textContent = response.name;
        cityInfoTemperature.textContent = "Temperature: " + temperature + "°C";
        cityInfoHumidity.textContent = "Humidity: " + response.main.humidity + "%";
        cityInfoWindSpeed.textContent = "Wind Speed: " + response.wind.speed + " m/s";
    })
};

function forecastAjaxQuery(queryURLForecast) {
    $.ajax({
        url: queryURLForecast,
        method: "GET"
    }).then(function (response) {
        console.log(response);

        const lat = response.city.coord.lat;
        const lon = response.city.coord.lon;

        let queryURLUVIndex = "https://api.openweathermap.org/data/2.5/uvi?lat=" + lat + "&lon=" + lon + "&appid=" + apiKey;
        console.log("UV Index: " + queryURLUVIndex);

        firstForecastH4.textContent = response.list[7].dt_txt;
        firstForecastIMG.src = "./icons/" + response.list[7].weather[0].icon + ".png";
        let firstTemp = "Temperature: " + Math.round(response.list[7].main.temp - 273.15) + "°C";
        firstForecastFirstP.textContent = firstTemp;
        firstForecastSecondP.textContent = "Humidity: " + response.list[7].main.humidity + "%";

        secondForecastH4.textContent = response.list[15].dt_txt;
        secondForecastIMG.src = "./icons/" + response.list[15].weather[0].icon + ".png";
        let secondTemp = "Temperature: " + Math.round(response.list[15].main.temp - 273.15) + "°C";
        secondForecastFirstP.textContent = secondTemp;
        secondForecastSecondP.textContent = "Humidity: " + response.list[15].main.humidity + "%";

        thirdForecastH4.textContent = response.list[23].dt_txt;
        thirdForecastIMG.src = "./icons/" + response.list[23].weather[0].icon + ".png";
        let thirdTemp = "Temperature: " + Math.round(response.list[23].main.temp - 273.15) + "°C";
        thirdForecastFirstP.textContent = thirdTemp;
        thirdForecastSecondP.textContent = "Humidity: " + response.list[23].main.humidity + "%";

        fourthForecastH4.textContent = response.list[31].dt_txt;
        fourthForecastIMG.src = "./icons/" + response.list[31].weather[0].icon + ".png";
        let fourthTemp = "Temperature: " + Math.round(response.list[31].main.temp - 273.15) + "°C";
        fourthForecastFirstP.textContent = fourthTemp;
        fourthForecastSecondP.textContent = "Humidity: " + response.list[31].main.humidity + "%";

        fifthForecastH4.textContent = response.list[39].dt_txt;
        fifthForecastIMG.src = "./icons/" + response.list[39].weather[0].icon + ".png";
        let fifthTemp = "Temperature: " + Math.round(response.list[39].main.temp - 273.15) + "°C";
        fifthForecastFirstP.textContent = fifthTemp;
        fifthForecastSecondP.textContent = "Humidity: " + response.list[39].main.humidity + "%";

        function uvIndexAjaxQuery(queryURLUVIndex) {
            debugger
            $.ajax({
                url: queryURLUVIndex,
                method: "GET"
            }).then(function (response) {
                console.log(response);
        
                // cityInfoUVIndex.textContent = "UV Index: " + response.value;
                conditionalUV = Math.round(response.value);
        
                if (conditionalUV <= 2) {
                    cityInfoUVIndex.classList.add("lowUV");
                    cityInfoUVIndex.textContent = "UV Index: " + response.value + " (Low)";
                } else if (conditionalUV >= 3 && conditionalUV <= 5) {
                    cityInfoUVIndex.classList.add("moderateUV");
                    cityInfoUVIndex.textContent = "UV Index: " + response.value + " (Moderate)";
                } else if (conditionalUV >= 6 && conditionalUV <= 7) {
                    cityInfoUVIndex.classList.add("highUV");
                    cityInfoUVIndex.textContent = "UV Index: " + response.value + " (High)";
                } else if (conditionalUV >= 8 && conditionalUV <= 10) {
                    cityInfoUVIndex.classList.add("veryHighUV");
                    cityInfoUVIndex.textContent = "UV Index: " + response.value + " (Very High)";
                } else if (conditionalUV >= 11) {
                    cityInfoUVIndex.classList.add("extremeUV");
                    cityInfoUVIndex.textContent = "UV Index: " + response.value + " (Extreme)";
                };
        
            })
        };

        uvIndexAjaxQuery(queryURLUVIndex);

    })
};






// DONE TODO: City search functionality - add the city name to the queryURL.
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

    currentTempAjaxQuery(queryURLCurrentTemp);
    forecastAjaxQuery(queryURLForecast);
    // uvIndexAjaxQuery();

    // DONE TODO: If query responds, grab specific data to print to the jumbotron and 
    // * Assign a colour to the UV index depending on the result.
    // DONE TODO: to the 5-day forcast.
    // * Depending on the forecast returned, use a specific icon representation.




    searchedArray.push(searchedCity);
    console.log(searchedArray);

    // Setting searched city to Local Storage
    localStorage.setItem("searchedCityArray", JSON.stringify(searchedArray));


});



// DONE TODO: Store queryURL in local storage. Then get from Local Storage and have the city name displayed beneath
// TODO: the search bar - with functionality of initiating an AJAX call from it.
// * Create new elements and tie the city name and its result to it.

let pulledCityArray = JSON.parse(localStorage.getItem("searchedCityArray"));

for (let index = 0; index < pulledCityArray.length; index++) {
    let newCityDiv = document.createElement("div");
    newCityDiv.classList.add("card");
    newCityDiv.setAttribute("style", "height:2rem");
    newCityDiv.setAttribute("data-city", pulledCityArray[index]);

    let newCity = document.createElement("h6");
    newCity.textContent = pulledCityArray[index];

    newCityDiv.appendChild(newCity);
    previousSearchesContainer.appendChild(newCityDiv);

    newCityDiv.addEventListener("click", function (event) {
        event.currentTarget;

        let previousCityClicked = newCityDiv.getAttribute("data-city");

        // console.log(previousCityClicked);

        let queryURLCurrentTemp = "https://api.openweathermap.org/data/2.5/weather?q=" + previousCityClicked + "&appid=" + apiKey;
        let queryURLForecast = "https://api.openweathermap.org/data/2.5/forecast?q=" + previousCityClicked + "&appid=" + apiKey;

        currentTempAjaxQuery(queryURLCurrentTemp);
        forecastAjaxQuery(queryURLForecast);

    });

};


