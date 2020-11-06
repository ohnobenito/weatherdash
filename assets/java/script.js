//WHEN SEARCH BUTTON IS CLICKED
$("#search-btn").on("click", function(event){
    event.preventDefault();
    let searchResult = $("#search-term").val();
    searchResults.push(searchResult);
    displayWeather();
    pastSearch(); 
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
        console.log(response)
        $("#current-weather").empty();
        //RESPONSE RESULTS
            
            let name = response.name;
            let temp = (response.main.temp)
            let humidity = response.main.humidity;
            let wind = response.wind.speed;
            let icon = response.weather[0].icon;
            let d = Date("MM/DD/YYYY");
            

        // BUILDING THE DIV
        let weatherDiv = $("<div class='weather'>");
        let h1 = $("<h1>").text(name);  
        weatherDiv.append(h1);

        let dateP = $("<p>").text("Date: " + d);
        weatherDiv.append(dateP);
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


        $("#current-weather").html(weatherDiv);


        //FOR UV INDEX
        let lat = response.coord.lat;
        let lon = response.coord.lon;
        let UVqueryUrl= "http://api.openweathermap.org/data/2.5/uvi?lat="+ lat + "&lon=" + lon + "&units=imperial" + apiKey;

        $.ajax({
            url: UVqueryUrl,
            method: "GET"
        }).then(function(response){
            console.log(response)

            //UV INDEX TO WEATHER DIV
            //ADD COLOR TO REPRESENT SEVERE, MODERATE, FAVORABLE
            let UV = response.value
            let uvIndex = $("<p>").text("UV INDEX: " + UV);
            weatherDiv.append(uvIndex);
        });
    

    // FIVE DAY FORECAST
    //WHEN SEARCH BUTTON IS CLICKED ADD 5 DAY FORECAST TO "five-day" DIV: DATE, ICONS OF WEATHER, TEMP & HUMIDITY

        let fiveQueryUrl = "https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + lon + "&exclude=minutely,hourly,current&units=imperial" + apiKey;
    
        $.ajax({
        url: fiveQueryUrl,
        method: "GET"
        }).then(function(response) {
        console.log(response);

        let input = response.daily
    
        $("#five-day").empty();

        for (let i = 0; i < input.length - 3; i ++) {
            let tempF = input[i].temp.day;
            let humidityF = input[i].humidity;
            let dateF = new Date(input[i].dt * 1000).toDateString();
            let weathericon = input[i].weather[0].icon;
            console.log(weathericon);
            console.log(dateF);
            console.log(tempF);

            let forecastDiv = $("<div class='forecast'>")
            let foreDate = $("<h3>").text(dateF);
            tempF = Math.floor(tempF);
            let foreTemp = $("<p>").text("Temp: " + tempF);
            let foreHum = $("<p>").text("Humidity: " + humidityF);
            let icon5 = $("<img>").attr("src", "https://openweathermap.org/img/w/" + weathericon + ".png");
        
            forecastDiv.append(foreDate);
            forecastDiv.append(foreTemp);
            forecastDiv.append(foreHum);
            forecastDiv.append(icon5);
            $("#five-day").append(forecastDiv);
            
             };
        }); 
    }); 
}; 

//ADD SEARCH RESULTS TO ONGOING "past-search" DIV
let searchResults = [];

function pastSearch() {
    $("#past-search").empty();

    for (let i = 0; i < searchResults.length; i++) {
        let a = $("<button>");
        a.addClass("past-search-btn");
        a.attr("data-name", searchResults[i]);
        a.text(searchResults[i]);
        $("#past-search").append(a);
    }
}
$("#past-search-button").on("click", function(){
    displayWeather();
})

//CITY BUTTONS CLICKED = WEATHER LOADS AGAIN

//WHEN PAGE IS OPENED, LAST SEARCHED CITY IS DISPLAY