
//ADDED FUNCTION TO CHECK IF CODE HAS RUN, 
window.onload = function() {
    //IF FIRST LAUNCH DISPLAY MINNEAPOLIS WEATHER
    if (localStorage.getItem("hasCodeRunBefore") === null) {
        displayWeather("Minneapolis");
        localStorage.setItem("hasCodeRunBefore", true);
        //IF NOT, LAUNCH PAGELOAD FUNCTION
    } else pageLoad();
}


//WHEN SEARCH BUTTON IS CLICKED
$("#search-btn").on("click", function(){
    launch();
});
//WHEN ENTER KEY IS CLICKED AFTER INPUT ADDED TO SEACH
$("#search-term").on("keyup", function(event){
    if (event.keyCode === 13) {
        event.preventDefault();
        launch();
        $("#search-btn").on("click");
    }
});
// FUNCTION OF WHAT TO RUN IF SEARCH IS CLICKED/ENTERED
function launch() {
    let searchResult = $("#search-term").val();
    searchResults.push(searchResult);
    localStorage.setItem('searchResult', JSON.stringify(searchResult));
    console.log(localStorage);
    
    //run display weather function
    displayWeather(searchResult);
    // runs past search function
    pastSearch(); 

    //clear search bar
    $("#search-term").val("");  
    pageLoad();
}

//LOADS WEATHER TO PAGE 
function displayWeather(city) {
    
    let apiKey = "&appid=663280f624e2f9932dc29f35de7ca316";
    let queryUrl = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=imperial"+ apiKey;
    
    
    $.ajax({
        url: queryUrl,
        method: "GET"
    }).then(function (response) {

        $("#current-weather").empty();
            //RESPONSE RESULTS
            
            let name = response.name;
            let temp = (response.main.temp)
            let humidity = response.main.humidity;
            let wind = response.wind.speed;
            let icon = response.weather[0].icon;
            console.log(icon);
            let d = new Date(response.dt * 1000).toDateString();

            // BUILDING THE DIV
            let weatherDiv = $("<div class='col s12'>");
            weatherDiv.addClass("card white");
            let h1 = $("<h3>").text(name);  
            weatherDiv.append(h1);

            let dateP = $("<p>").text(d);
            weatherDiv.append(dateP);
            let iconIm = $("<img>").attr("src", "https://openweathermap.org/img/wn/" + icon + "@2x.png").append($("<br />"));
            weatherDiv.append(iconIm);
            temp = Math.floor(temp);
            let pOne = $("<p>").text("Temp: " + temp + "°F");
            weatherDiv.append(pOne);

            let pTwo = $("<p>").text("Humidity: " + humidity + "%");
            weatherDiv.append(pTwo);

            wind = Math.floor(wind);
            let pThree = $("<p>").text("Wind Speed: " + wind + " MPH");
            weatherDiv.append(pThree);

            
            

            $("#current-weather").html(weatherDiv);


            //FOR UV INDEX
            let lat = response.coord.lat;
            let lon = response.coord.lon;
            let UVqueryUrl= "https://api.openweathermap.org/data/2.5/uvi?lat="+ lat + "&lon=" + lon + "&units=imperial" + apiKey;

            $.ajax({
            url: UVqueryUrl,
            method: "GET"
            }).then(function(response){
           // console.log(response)

            //UV INDEX TO WEATHER DIV
            
            let UV = response.value
            //IF ELSE FOR WEATHER INDEX AND THE COLORS THEY REPRESENT
            if (UV < 3) {
                let uvIndex = $("<a class='light-green accent-3 btn-small'>").text("UV INDEX: " + UV);
                let buttonP = $("<p>").append(uvIndex);
                weatherDiv.append(buttonP);
                
            } else if (UV > 6) {
                let uvIndex = $("<a class='red darken-3 btn-small'>").text("UV INDEX: " + UV)
                let buttonP = $("<p>").append(uvIndex);
                weatherDiv.append(buttonP);
            } else {
                let uvIndex = $("<a class='amber darken-3 btn-small'>").text("UV INDEX: " + UV)
                let buttonP = $("<p>").append(uvIndex);
                weatherDiv.append(buttonP);
            }
            fiveDay(lat,lon,apiKey);
        });
    });
};

//FIVE DAY FORECAST
function fiveDay(lat,lon,apiKey) {
        

        let fiveQueryUrl = "https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + lon + "&exclude=minutely,hourly,current&units=imperial" + apiKey;
    
    $.ajax({
    url: fiveQueryUrl,
    method: "GET"
    }).then(function(response) {
        //console.log(response);

        let input = response.daily
    
        $("#five-day").empty();

        for (let i = 0; i < input.length - 3; i ++) {
            let tempF = input[i].temp.day;
            let humidityF = input[i].humidity;
            let dateF = new Date(input[i].dt * 1000).toDateString();
            let weathericon = input[i].weather[0].icon;
            

            let forecastDiv = $("<div class='card'>");
            forecastDiv.addClass("col s2");
            let foreDate = $("<h5>").text(dateF);
            tempF = Math.floor(tempF);
            let foreTemp = $("<p>").text("Temp: " + tempF + "°F");
            let foreHum = $("<p>").text("Humidity: " + humidityF + "%");
            let icon5 = $("<img>").attr("src", "https://openweathermap.org/img/wn/" + weathericon + ".png");
        
            forecastDiv.append(foreDate);
            forecastDiv.append(icon5);
            forecastDiv.append(foreTemp);
            forecastDiv.append(foreHum);
            
            $("#five-day").append(forecastDiv);     
        };
    }); 
};  

//ADD SEARCH RESULTS TO ONGOING "past-search" DIV

let searchResults = [];

function pastSearch() {
    
    $("#past-search").empty();

    for (let i = 0; i < searchResults.length; i++) {
        let a = $("<a class='btn-small blue'>");
        a.addClass("past-search-btn");
        a.attr("data-name", searchResults[i]);
        a.text(searchResults[i]);
        $("#past-search").prepend(a);
    }   
}

//CITY BUTTONS CLICKED = WEATHER LOADS AGAIN
$(document).on("click", ".past-search-btn", function(event) {
    event.preventDefault();
    console.log($(this).text());
    displayWeather($(this).text());
})


//WHEN PAGE IS OPENED, LAST SEARCHED CITY IS DISPLAYED
function pageLoad() {
    let searchResult = JSON.parse(localStorage.getItem("searchResult"));
    //console.log(searchResult);
    displayWeather(searchResult);
};