//WHEN SEARCH BUTTON IS CLICKED
$("#search-btn").on("click", function(event){
    event.preventDefault();
    let searchResult = $("#search-term").val();
    searchResults.push(searchResult);
    displayWeather();
    renderButtons(); 
    $("#search-term").val("");
})

//WHEN SEARCH BUTTON IS CLICKED ADD THE FOLLOWING TO "current-weather" DIV: CITY NAME, DATE, ICON REP. OF WEATHER, TEMP, HUMIDITY, WIND SPEED, AND UV INDEX. COLOR REP OF FAVORABLE, MODERATE, OR SEVERE
function displayWeather() {
    let city = $("#search-term").val();
    let apiKey = "&appid=663280f624e2f9932dc29f35de7ca316";
    let queryUrl = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=imperial"+ apiKey;

    $.ajax({
        url: queryUrl,
        method: "GET"
    }).then(function (response) {
        //RESPONSE RESULTS
            
            let name = response.name;
            let temp = (response.main.temp)
            let humidity = response.main.humidity;
            let wind = response.wind.speed;
            let icon = response.weather[0].icon;
            

        // BUILDING THE DIV
        let weatherDiv = $("<div class='weather'>")
        let h1 = $("<h1>").text(name);  
        weatherDiv.append(h1);

        temp = Math.floor(temp);
        let pOne = $("<p>").text("Temp: " + temp);
        weatherDiv.append(pOne);

        let pTwo = $("<p>").text("Humidity: " + humidity);
        weatherDiv.append(pTwo);

        wind = Math.floor(wind);
        let pThree = $("<p>").text("Wind Speed: " + wind + " MPH");
        weatherDiv.append(pThree);

        let iconIm = $("<img>").attr("src", "https://openweathermap.org/img/w/" + icon + ".png");
        weatherDiv.append(iconIm);


$("#current-weather").prepend(weatherDiv);
})
}; 

//ADD SEARCH RESULTS TO ONGOING "past-search" DIV
let searchResults = [];

function renderButtons() {
    $("#past-search").empty();

    for (let i = 0; i < searchResults.length; i++) {
        let a = $("<button>");
        a.addClass("search");
        a.attr("data-name", searchResults[i]);
        a.text(searchResults[i]);
        $("#past-search").append(a);
    }
}



//WHEN SEARCH BUTTON IS CLICKED ADD 5 DAY FORECAST TO "five-day" DIV: DATE, ICONS OF WEATHER, TEMP & HUMIDITY

//CITY BUTTONS CLICKED = WEATHER LOADS AGAIN

//WHEN PAGE IS OPENED, LAST SEARCHED CITY IS DISPLAY