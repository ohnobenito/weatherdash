
//ADD SEARCH RESULTS TO ONGOING "past-search" DIV. 
let searchResults = [];
//ADDS RESULTS AS BUTTONS
function renderButtons() {
    $("#past-search").empty();

    for (let i = 0; i < searchResults.length; i++) {

        let a = $("<button>");
        a.addClass("search")
        a.attr("data-name", searchResults[i]);
        a.text(searchResults[i]);
        $("#past-search").append(a);
    }
}
//WHEN SEARCH BUTTON IS CLICKED, USE INPUT FOR BUTTONS
$("#search-btn").on("click", function(event) {
    event.preventDefault();

    let searchResult = $("#search-term").val();
    $("#search-term").val("");
    searchResults.push(searchResult);
    renderButtons();

});
//URL TO OPENWEATHER MAP PLUS API CODE

//WILL NEED TO RUN AJAX TO RECEIVE DATA

//USE USER INPUT IN SEARCH FIELD FOR "cityName"

//WHEN cityName IS RECEIVED, APPEND WEATHER TO "current-weather" DIV. MUST INCLUDE: CITY NAME, DATE, ICON REPRESENTATION OF WEATHER, THE TEMP, HUMIDITY, WIND SPEED, AND UV INDEX. COLOR REPRESENTATION OF FAVORABLE, MODERATE, OR SEVERE

//WHEN cityName IS RECEIVED ADD 5 DAY FORECAST TO "five-day" DIV: DATE, ICONS OF WEATHER, TEMP & HUMIDITY

//IF CITY IS CLICKED THEN INFORMATION LOADS AGAIN.
//WHEN PAGE IS OPENED, LAST SEARCHED CITY'S FORECAST IS PRESENTED
