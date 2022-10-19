function handleSubmit(event) {
    event.preventDefault();
    let searchInput = document.querySelector("#city-input");
    if (searchInput.value) {
        axiosCalls("submit", searchInput, "current");
        searchInput.value = "";
    } else {
        alert("Please enter a city.");
        document.querySelector("#city").innerHTML = "CITY";
        document.querySelector("#country").innerHTML = "COUNTRY";
        document.querySelector("#current-temperature").innerHTML = " ";
        document.querySelector("#weather-description").innerHTML = " ";
        document.querySelector("#feels").innerHTML = " ";
        document.querySelector("#today-temp-max").innerHTML = " ";
        document.querySelector("#today-temp-min").innerHTML = " ";
        document.querySelector("#feels").innerHTML = " ";
        document.querySelector("#weather-forecast").innerHTML = " ";
        document.querySelector("#humidity").innerHTML = " ";
        document.querySelector("#wind-speed").innerHTML = " ";
        document.querySelector("#sunrise").innerHTML = " ";
        document.querySelector("#sunset").innerHTML = " ";
        document.querySelector("#weatherImgIcon").remove();
    }
}

/*function errorCheck(error) {
    let returnObject = JSON.parse(error.request.response);
    if (returnObject.cod == 404) {
        alert("Please enter a valid city.");
        document.querySelector("#city").innerHTML = "CITY";
        document.querySelector("#country").innerHTML = "COUNTRY";
        document.querySelector("#current-temperature").innerHTML = " ";
        document.querySelector("#weather-description").innerHTML = " ";
        document.querySelector("#feels").innerHTML = " ";
        document.querySelector("#today-temp-max").innerHTML = " ";
        document.querySelector("#today-temp-min").innerHTML = " ";
        document.querySelector("#feels").innerHTML = " ";
        document.querySelector("#weather-forecast").innerHTML = " ";
        document.querySelector("#humidity").innerHTML = " ";
        document.querySelector("#wind-speed").innerHTML = " ";
        document.querySelector("#sunrise").innerHTML = " ";
        document.querySelector("#sunset").innerHTML = " ";
        if (document.getElementById("weatherImgIcon") !== null) {
            document.querySelector("#weatherImgIcon").remove();
        }
    }
}
*/
function getCurrentLocation(event) {
    event.preventDefault();
    navigator.geolocation.getCurrentPosition(showPosition);
}

function showPosition(position) {
    axiosCalls("click", position, "current");
}

function showDay() {
    let days = [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
    ];

    let nowDay = document.querySelector("#current-day");
    let day = days[new Date().getDay()];
    nowDay.innerHTML = `${day}`;
}

function showDate() {
    let now = new Date();
    let nowDate = document.querySelector("#current-date");
    let date = ("0" + now.getDate()).slice(-2);
    let month = ("0" + (now.getMonth() + 1)).slice(-2);
    let year = now.getFullYear();
    nowDate.innerHTML = `${date}.${month}.${year}`;
}

function showTime() {
    let now = new Date();
    let nowTime = document.querySelector("#current-time");
    let hours = ("0" + now.getHours()).slice(-2);
    let minutes = ("0" + now.getMinutes()).slice(-2);
    nowTime.innerHTML = `${hours}:${minutes}`;
}

//Conversion to Fahrenheit
/*function displayFahrenheitTemperature(event) {
    event.preventDefault();
    celsiusLink.classList.remove("active");
    fahrenheitLink.classList.add("active");
    let temperatureElement = document.querySelector("#current-temperature");
    let feelsLike = document.querySelector("#feels");
    let todayMax = document.querySelector("#today-temp-max");
    let todayMin = document.querySelector("#today-temp-min");
    let fahrenheitTemperature = (celsiusTemperature * 9) / 5 + 32;
    let fahrenheitFeels = (celsiusTemperatureFeels * 9) / 5 + 32;
    let fahrenheitMax = (celsiusTemperatureMax * 9) / 5 + 32;
    let fahrenheitMin = (celsiusTemperatureMin * 9) / 5 + 32;
    temperatureElement.innerHTML = Math.round(fahrenheitTemperature);
    feelsLike.innerHTML = `Feels like: ${Math.round(fahrenheitFeels)}°`;
    todayMax.innerHTML = `${Math.round(fahrenheitMax)}°`;
    todayMin.innerHTML = `${Math.round(fahrenheitMin)}°`;
}

//Conversion to Celsius
function displayCelsiusTemperature(event) {
    event.preventDefault();
    celsiusLink.classList.add("active");
    fahrenheitLink.classList.remove("active");
    let temperatureElement = document.querySelector("#current-temperature");
    let feelsLike = document.querySelector("#feels");
    let todayMax = document.querySelector("#today-temp-max");
    let todayMin = document.querySelector("#today-temp-min");
    temperatureElement.innerHTML = Math.round(celsiusTemperature);
    feelsLike.innerHTML = `Feels like: ${Math.round(celsiusTemperatureFeels)}°`;
    todayMax.innerHTML = `${Math.round(celsiusTemperatureMax)}°`;
    todayMin.innerHTML = `${Math.round(celsiusTemperatureMin)}°`;
}
*/
function formatDay(timestamp) {
    let date = new Date(timestamp * 1000);
    let day = date.getDay();
    let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

    return days[day];
}

function displayForecast(response) {
    let forecast = response.data.daily;
    let forecastElement = document.querySelector("#weather-forecast");
    let forecastHTML = "";
    forecast.forEach(function (forecastDay, index) {
        if (index === 0) {
            forecastHTML =
                forecastHTML +
                `<div class="row" id="weather-forecast-today">
                    <div class="col-4 weather-forecast-date">
                        ${formatDay(forecastDay.time)}
                    </div>    
                    <div class="col-2 weather-forecast-icon">
                        <img src="http://shecodes-assets.s3.amazonaws.com/api/weather/icons/${
                            forecastDay.condition.icon
                        }.png" alt="" width="40"/>
                    </div>    
                    <div class="col-3 weather-forecast-temperature-max">    
                        ${Math.round(forecastDay.temperature.maximum)}°
                    </div>    
                    <div class="col-3 weather-forecast-temperature-min">
                        ${Math.round(forecastDay.temperature.minimum)}°
                    </div>
                </div>`;
        } else {
            forecastHTML =
                forecastHTML +
                `<div class="row" id="weather-forecast-day">
                    <div class="col-4 weather-forecast-date">
                        ${formatDay(forecastDay.time)}
                    </div>    
                    <div class="col-2 weather-forecast-icon">
                        <img src="http://shecodes-assets.s3.amazonaws.com/api/weather/icons/${
                            forecastDay.condition.icon
                        }.png" alt="" width="40"/>
                    </div>    
                    <div class="col-3 weather-forecast-temperature-max">${Math.round(
                        forecastDay.temperature.maximum
                    )}°
                    </div>    
                    <div class="col-3 weather-forecast-temperature-min">${Math.round(
                        forecastDay.temperature.minimum
                    )}°
                    </div>
                    
                </div>`;
        }
    });
    forecastElement.innerHTML = forecastHTML;
}

function getForecast(coordinates) {
    let apiKey = "b220773ot9b8ef196b845b21b5cabb26";
    let apiUrl = `https://api.shecodes.io/weather/v1/forecast?query=${coordinates}&key=${apiKey}`;
    axios.get(apiUrl).then(displayForecast);
    //axiosCalls("submit",coordinates,"forecast");
}

function showInformation(response) {
    console.log(response);
    /*celsiusTemperature = response.data.main.temp;
    celsiusTemperatureFeels = response.data.main.feels_like;
    celsiusTemperatureMax = response.data.main.temp_max;
    celsiusTemperatureMin = response.data.main.temp_min;
*/
    let city = document.querySelector("#city");
    city.innerHTML = `${response.data.city}`;

    let country = document.querySelector("#country");
    country.innerHTML = `${response.data.country}`;

    //Weather Icons
    if (document.getElementById("weatherImgIcon") === null) {
        let weatherImg = document.createElement("img");
        weatherImg.src = `http://shecodes-assets.s3.amazonaws.com/api/weather/icons/${response.data.condition.icon}.png`;
        weatherImg.id = "weatherImgIcon";
        document.getElementById("weatherIcon").appendChild(weatherImg);
    } else {
        let weatherImg = document.getElementById("weatherImgIcon");
        weatherImg.src = `http://shecodes-assets.s3.amazonaws.com/api/weather/icons/${response.data.condition.icon}.png`;
        document.getElementById("weatherIcon").appendChild(weatherImg);
    }

    let temperature = Math.round(response.data.temperature.current);
    let currentTemperature = document.querySelector("#current-temperature");
    currentTemperature.innerHTML = `${temperature}`;

    let description = document.querySelector("#weather-description");
    description.innerHTML = `${response.data.condition.description}`;

    let feelsLike = document.querySelector("#feels");
    feelsLike.innerHTML = `Feels like: ${Math.round(
        response.data.temperature.feels_like
    )}°`;

    //let todayMax = document.querySelector("#today-temp-max");
    //todayMax.innerHTML = `${Math.round(response.data.main.temp_max)}°`;

    //let todayMin = document.querySelector("#today-temp-min");
    //todayMin.innerHTML = `${Math.round(response.data.main.temp_min)}°`;

    let humidity = document.querySelector("#humidity");
    humidity.innerHTML = `${response.data.temperature.humidity}%`;

    let wind = document.querySelector("#wind-speed");
    let windSpeed = (response.data.wind.speed * 3.6).toFixed(0);
    wind.innerHTML = `${windSpeed} km/h`;

    /*let sunrise = document.querySelector("#sunrise");
    let timezone = response.data.timezone;
    let sunriseTime = response.data.sys.sunrise;
    let sunriseLocal = (timezone + sunriseTime) * 1000;
    let sunriseNow = new Date(sunriseLocal);
    let sunriseHours = ("0" + sunriseNow.getUTCHours()).slice(-2);
    let sunriseMinutes = ("0" + sunriseNow.getUTCMinutes()).slice(-2);
    sunrise.innerHTML = `${sunriseHours}:${sunriseMinutes}`;

    let sunset = document.querySelector("#sunset");
    let sunsetTime = response.data.sys.sunset;
    let sunsetLocal = (timezone + sunsetTime) * 1000;
    let sunsetNow = new Date(sunsetLocal);
    let sunsetHours = ("0" + sunsetNow.getUTCHours()).slice(-2);
    let sunsetMinutes = ("0" + sunsetNow.getUTCMinutes()).slice(-2);
    sunset.innerHTML = `${sunsetHours}:${sunsetMinutes}`;
*/
    getForecast(response.data.city);
}

function axiosCalls(type, actionObj, endPoint) {
    let apiKey = "b220773ot9b8ef196b845b21b5cabb26";
    let units = "metric";
    let apiEndPoint = `https://api.shecodes.io/weather/v1/${endPoint}`;

    let apiUrl = "";
    let latitude = "";
    let longitude = "";

    switch (type) {
        case "submit":
            apiUrl = `${apiEndPoint}?query=${actionObj.value}&key=${apiKey}&units=${units}`;
            axios.get(apiUrl).then(showInformation).catch(errorCheck);
            break;

        /*case "click":
            latitude = actionObj.coords.latitude;
            longitude = actionObj.coords.longitude;

            apiUrl = `${apiEndPoint}lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=${units}`;
            axios.get(apiUrl).then(showInformation);
            break;*/
    }
}

let celsiusTemperature = null;
let celsiusTemperatureFeels = null;
let celsiusTemperatureMax = null;
let celsiusTemperatureMin = null;

let searchCity = document.querySelector("#search-form");
searchCity.addEventListener("submit", handleSubmit);

//let locationButton = document.querySelector("button");
//locationButton.addEventListener("click", getCurrentLocation);

/*let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", displayFahrenheitTemperature);

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", displayCelsiusTemperature);
*/
showDay();
showDate();
showTime();
displayForecast();
