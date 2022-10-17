function handleSubmit(event) {
    event.preventDefault();
    let searchInput = document.querySelector("#city-input");
    if (searchInput.value) {
        axiosCalls("submit", searchInput, "weather");
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
        document.querySelector("#humidity").innerHTML = " ";
        document.querySelector("#wind-speed").innerHTML = " ";
        document.querySelector("#weatherImgIcon").remove();
    }
}

function errorCheck(error) {
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
        document.querySelector("#humidity").innerHTML = " ";
        document.querySelector("#wind-speed").innerHTML = " ";
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
    axiosCalls("click", position, "weather");
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

function showInformation(response) {
    let city = document.querySelector("#city");
    city.innerHTML = `${response.data.name}`;

    let country = document.querySelector("#country");
    country.innerHTML = `${response.data.sys.country}`;

    //weather icons
    if (document.getElementById("weatherImgIcon") === null) {
        let weatherImg = document.createElement("img");
        weatherImg.src = `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`;
        weatherImg.id = "weatherImgIcon";
        document.getElementById("weatherIcon").appendChild(weatherImg);
    } else {
        let weatherImg = document.getElementById("weatherImgIcon");
        weatherImg.src = `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`;
        document.getElementById("weatherIcon").appendChild(weatherImg);
    }

    let temperature = Math.round(response.data.main.temp);
    let currentTemperature = document.querySelector("#current-temperature");
    currentTemperature.innerHTML = `${temperature}°C`;

    let description = document.querySelector("#weather-description");
    description.innerHTML = `${response.data.weather[0].description}`;

    let feelsLike = document.querySelector("#feels");
    feelsLike.innerHTML = `Feels like: ${Math.round(
        response.data.main.feels_like
    )}°`;

    let todayMax = document.querySelector("#today-temp-max");
    todayMax.innerHTML = `${Math.round(response.data.main.temp_max)}°`;

    let todayMin = document.querySelector("#today-temp-min");
    todayMin.innerHTML = `${Math.round(response.data.main.temp_min)}°`;

    let humidity = document.querySelector("#humidity");
    humidity.innerHTML = `${response.data.main.humidity}%`;

    let wind = document.querySelector("#wind-speed");
    let windSpeed = (response.data.wind.speed * 3.6).toFixed(1);
    wind.innerHTML = `${windSpeed} km/h`;
}

function axiosCalls(type, actionObj, endPoint) {
    let apiKey = "45bb2b01d47a7c6f32fb06dd72181ea6";
    let units = "metric";
    let apiEndPoint = `https://api.openweathermap.org/data/2.5/${endPoint}?`;

    let apiUrl = "";
    let latitude = "";
    let longitude = "";

    switch (type) {
        case "submit":
            apiUrl = `${apiEndPoint}q=${actionObj.value}&appid=${apiKey}&units=${units}`;
            axios.get(apiUrl).then(showInformation).catch(errorCheck);
            break;

        case "click":
            latitude = actionObj.coords.latitude;
            longitude = actionObj.coords.longitude;

            apiUrl = `${apiEndPoint}lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=${units}`;
            axios.get(apiUrl).then(showInformation);
            break;
    }
}

let searchCity = document.querySelector("#search-form");
searchCity.addEventListener("submit", handleSubmit);

let locationButton = document.querySelector("button");
locationButton.addEventListener("click", getCurrentLocation);

showDay();
showDate();
showTime();
