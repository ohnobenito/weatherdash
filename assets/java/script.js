$("#search-btn").on("click", function(){
    displayWeather();
})
function displayWeather() {
    let city = $("#search-term").val();
    let apiKey = "&appid=663280f624e2f9932dc29f35de7ca316";
    let queryUrl = "https://api.openweathermap.org/data/2.5/weather?q=" + city + apiKey;

    $.ajax({
        url: queryUrl,
        method: "GET"
    }).then(function (response) {
        console.log(response)
        $("#current-weather").text(JSON.stringify(response));
    })
}


//ADD SEARCH RESULTS TO ONGOING "past-search" DIV

//ADD RESULTS AS BUTTONS

//WHEN SEARCH BUTTON IS CLICKED, USE INPUT FOR BUTTONS

//WHEN SEARCH BUTTON IS CLICKED ADD THE FOLLOWING TO "current-weather" DIV: CITY NAME, DATE, ICON REP. OF WEATHER, TEMP, HUMIDITY, WIND SPEED, AND UV INDEX. COLOR REP OF FAVORABLE, MODERATE, OR SEVERE

//WHEN SEARCH BUTTON IS CLICKED ADD 5 DAY FORECAST TO "five-day" DIV: DATE, ICONS OF WEATHER, TEMP & HUMIDITY

//CITY BUTTONS CLICKED = WEATHER LOADS AGAIN

//WHEN PAGE IS OPENED, LAST SEARCHED CITY IS DISPLAY