function handleSubmit(event) {
    event.preventDefault();
    let searchInput = document.querySelector("#city-input");
    if (searchInput.value) {
        axiosCalls("submit", searchInput, "current");
        axiosCallsOpenWeather(searchInput);
        searchInput.value = "";
    } else {
        alert("Please enter a city.");
        document.querySelector("#city").innerHTML = "CITY";
        document.querySelector("#country").innerHTML = "COUNTRY";
        document.querySelector("#current-temperature").innerHTML = " ";
        document.querySelector("#weather-description").innerHTML = " ";
        document.querySelector("#feels").innerHTML = " ";
        document.querySelector("#today-temp-max-0").innerHTML = " ";
        document.querySelector("#today-temp-min-0").innerHTML = " ";
        document.querySelector("#feels").innerHTML = " ";
        document.querySelector("#weather-forecast").innerHTML = " ";
        document.querySelector("#humidity").innerHTML = " ";
        document.querySelector("#wind-speed").innerHTML = " ";
        document.querySelector("#sunrise").innerHTML = " ";
        document.querySelector("#sunset").innerHTML = " ";
        document.querySelector("#weatherImgIcon").remove();
    }
}

function errorCheck(error = null) {
    if (!error) {
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
    } else {
        alert("Please enter a valid city.");
        document.querySelector("#city").innerHTML = "CITY";
        document.querySelector("#country").innerHTML = "COUNTRY";
        document.querySelector("#current-temperature").innerHTML = " ";
        document.querySelector("#weather-description").innerHTML = " ";
        document.querySelector("#feels").innerHTML = " ";
        document.querySelector("#today-temp-max-0").innerHTML = " ";
        document.querySelector("#today-temp-min-0").innerHTML = " ";
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
function displayFahrenheitTemperature(event) {
    event.preventDefault();
    celsiusLink.classList.remove("active");
    fahrenheitLink.classList.add("active");
    let temperatureElement = document.querySelector("#current-temperature");
    let feelsLike = document.querySelector("#feels");
    let todayMax = document.querySelector("#today-temp-max-0");
    let todayMin = document.querySelector("#today-temp-min-0");
    let fahrenheitTemperature = (celsiusTemperature * 9) / 5 + 32;
    let fahrenheitFeels = (celsiusTemperatureFeels * 9) / 5 + 32;
    let fahrenheitMax = (celsiusTemperatureMax * 9) / 5 + 32;
    let fahrenheitMin = (celsiusTemperatureMin * 9) / 5 + 32;
    temperatureElement.innerHTML = Math.round(fahrenheitTemperature);
    feelsLike.innerHTML = `Feels like: ${Math.round(fahrenheitFeels)}°`;
    todayMax.innerHTML = `${Math.round(fahrenheitMax)}°`;
    todayMin.innerHTML = `${Math.round(fahrenheitMin)}°`;

    let foreachArray = [1, 2, 3, 4, 5, 6];
    foreachArray.forEach(function (value) {
        let tempMax = document.getElementById(`temp-max-${value}`);
        let tempMin = document.getElementById(`temp-min-${value}`);

        tempMaxN = tempMax.innerText.replace("°", "");
        tempMinN = tempMin.innerText.replace("°", "");

        let fahrenheitMax = (tempMaxN * 9) / 5 + 32;
        let fahrenheitMin = (tempMinN * 9) / 5 + 32;
        tempMax.innerHTML = `${Math.round(fahrenheitMax)}°`;
        tempMin.innerHTML = `${Math.round(fahrenheitMin)}°`;
    });
}

//Conversion to Celsius
function displayCelsiusTemperature(event) {
    event.preventDefault();
    celsiusLink.classList.add("active");
    fahrenheitLink.classList.remove("active");
    let temperatureElement = document.querySelector("#current-temperature");
    let feelsLike = document.querySelector("#feels");
    let todayMax = document.querySelector("#today-temp-max-0");
    let todayMin = document.querySelector("#today-temp-min-0");
    temperatureElement.innerHTML = Math.round(celsiusTemperature);
    feelsLike.innerHTML = `Feels like: ${Math.round(celsiusTemperatureFeels)}°`;
    todayMax.innerHTML = `${Math.round(celsiusTemperatureMax)}°`;
    todayMin.innerHTML = `${Math.round(celsiusTemperatureMin)}°`;
}

function formatDay(timestamp) {
    let date = new Date(timestamp * 1000);
    let day = date.getDay();
    let days = [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
    ];

    return days[day];
}

function displayForecast(response) {
    celsiusTemperatureMax = response.data.daily[0].temperature.maximum;
    celsiusTemperatureMin = response.data.daily[0].temperature.minimum;

    let forecast = response.data.daily;
    let forecastElement = document.querySelector("#weather-forecast");
    let todayMax = document.querySelector("#today-temp-max-0");
    let todayMin = document.querySelector("#today-temp-min-0");
    let forecastHTML = "";
    forecast.forEach(function (forecastDay, index) {
        if (index === 0) {
            todayMax.innerHTML = `${Math.round(
                forecastDay.temperature.maximum
            )}°`;
            todayMin.innerHTML = `${Math.round(
                forecastDay.temperature.minimum
            )}°`;
        } else {
            forecastHTML =
                forecastHTML +
                `<div class="row" id="weather-forecast-day">
                    <div class="col-5 weather-forecast-date">
                        ${formatDay(forecastDay.time)}
                    </div>    
                    <div class="col-3 weather-forecast-icon">
                        <img src="http://shecodes-assets.s3.amazonaws.com/api/weather/icons/${
                            forecastDay.condition.icon
                        }.png" alt="" width="40"/>
                    </div>    
                    <div class="col-2 weather-forecast-temperature-max" id="temp-max-${index}">${Math.round(
                    forecastDay.temperature.maximum
                )}°
                    </div>    
                    <div class="col-2 weather-forecast-temperature-min"  id="temp-min-${index}">${Math.round(
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
    if (response.data.temperature) {
        celsiusTemperature = response.data.temperature.current;
        celsiusTemperatureFeels = response.data.temperature.feels_like;

        if (response.data.status != "not_found") {
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
            let currentTemperature = document.querySelector(
                "#current-temperature"
            );
            currentTemperature.innerHTML = `${temperature}`;

            let description = document.querySelector("#weather-description");
            description.innerHTML = `${response.data.condition.description}`;

            let feelsLike = document.querySelector("#feels");
            feelsLike.innerHTML = `Feels like: ${Math.round(
                response.data.temperature.feels_like
            )}°`;

            let humidity = document.querySelector("#humidity");
            humidity.innerHTML = `${response.data.temperature.humidity}%`;

            let wind = document.querySelector("#wind-speed");
            let windSpeed = response.data.wind.speed.toFixed(0);
            wind.innerHTML = `${windSpeed} km/h`;

            getForecast(response.data.city);
        } else {
            errorCheck();
        }
    }
}

function axiosCallsOpenWeather(city) {
    let apiKey = "45bb2b01d47a7c6f32fb06dd72181ea6";
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city.value}&appid=${apiKey}`;
    axios.get(apiUrl).then(showSunriseSunset).catch(errorCheck);
}

function showSunriseSunset(response) {
    let sunrise = document.querySelector("#sunrise");
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
}

function axiosCalls(type, actionObj, endPoint) {
    let units = "metric";
    let apiKey = "";
    let apiEndPoint = "";
    let apiUrl = "";
    let latitude = "";
    let longitude = "";
    let locateCity = "";

    switch (type) {
        case "submit":
            apiKey = "b220773ot9b8ef196b845b21b5cabb26";
            apiEndPoint = `https://api.shecodes.io/weather/v1/${endPoint}`;
            apiUrl = `${apiEndPoint}?query=${actionObj.value}&key=${apiKey}&units=${units}`;
            axios.get(apiUrl).then(showInformation);
            break;

        case "click":
            apiKey = "45bb2b01d47a7c6f32fb06dd72181ea6";
            latitude = actionObj.coords.latitude;
            longitude = actionObj.coords.longitude;
            apiUrl = `https://api.openweathermap.org/geo/1.0/reverse?lat=${latitude}&lon=${longitude}&limit=5&appid=${apiKey}`;
            axios.get(apiUrl).then(LocateCity);
            break;
    }
}

function LocateCity(response) {
    let city = { value: response.data[0].name };
    axiosCalls("submit", city, "current");
    axiosCallsOpenWeather(city);
}

let celsiusTemperature = null;
let celsiusTemperatureFeels = null;
let celsiusTemperatureMax = null;
let celsiusTemperatureMin = null;

let searchCity = document.querySelector("#search-form");
searchCity.addEventListener("submit", handleSubmit);

let locationButton = document.querySelector("button");
locationButton.addEventListener("click", getCurrentLocation);

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", displayFahrenheitTemperature);

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", displayCelsiusTemperature);

showDay();
showDate();
showTime();
