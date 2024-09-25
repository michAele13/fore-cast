function refreshWeather(response) {
    let temperatureElement = document.querySelector("#temperature");
    let temperature = response.data.temperature.current;
    let cityElement = document.querySelector("#city");
    let descriptionElement = document.querySelector("#description");
    let humidityElement = document.querySelector("#humidity");
    let windSpeedElement = document.querySelector("#wind-speed");
    let timeElement = document.querySelector("#time");
    let date = new Date(response.data.time * 1000);
    let icon = document.querySelector("#icon");

    icon.innerHTML = `<img src="${response.data.condition.icon_url}" class="weather-app-icon" />`

    cityElement.innerHTML = response.data.city;
    descriptionElement.innerHTML = response.data.condition.description;
    humidityElement.innerHTML = `${response.data.temperature.humidity}%`;
    windSpeedElement.innerHTML = `${response.data.wind.speed}mph`;
    timeElement.innerHTML = formatDate(date);
    temperatureElement.innerHTML = Math.round(temperature);

    getForecast(response.data.city);
}

function formatDate(date) {

let minutes = date.getMinutes();
let hours = date.getHours();
let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

let day = days[date.getDay()];

if (minutes < 10) {
    minutes = `0${minutes}`;
}

return `${day} ${hours}:${minutes}`;
}

function searchCity(city) {
    let apiKey = "7dc1fb414419t3f0f0ecf4ddodda5a29";
    let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=imperial`;
    axios.get(apiUrl).then(refreshWeather);
    //make API call and update the UI
}



function handleSearchSubmit(event) {
    event.preventDefault();
    let searchInput = document.querySelector("#search-form-input");
    let cityElement = document.querySelector("#city");
    cityElement.innerHTML = searchInput.value;
    searchCity(searchInput.value);
    //call the API
    //search for the city we want info on
}

function getForecast(city) {
    let apiKey = "7dc1fb414419t3f0f0ecf4ddodda5a29";
    let apiUrl = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}&units=imperial`;
    axios(apiUrl).then(displayForecast);
}

function displayForecast(response) {
    console.log(response.data);


    let days = ["Tue", "Wed", "Thu", "Fri", "Sat"];
    let forecastHtml = "";

days.forEach(function (day) {
forecastHtml =
forecastHtml +
`
   <div class="weather-forecast-day">
    <div class="weather-forecast-date">${day}</div>  
    <div class="weather-forecast-icon">🌤️</div> 
    <div class="weather-forecast-temperatures">
        <div class="weather-forecast-temperature">
        <strong>90°</strong></div> 
        <div class="weather-forecast-temperature">72°</div>
        </div>
</div>`;
});

let forecastElement = document.querySelector("#forecast");
forecastElement.innerHTML = forecastHtml;
}

let searchFormElement = document.querySelector("#search-form");
searchFormElement.addEventListener("submit", handleSearchSubmit);

searchCity("Austin");
getForecast("Austin");