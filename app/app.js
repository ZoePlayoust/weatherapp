//Date
function formatDate(timestamp) {
  let date = new Date(timestamp);
  let hours = date.getHours();
  if (hours > 18) {
    nightTime();
  }
  if (hours < 7) {
    nightTime();
  }
  if (hours < 10) {
    hours = `0${hours}`;
  }

  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[date.getDay()];

  return `${day} ${hours}:${minutes}`;
}
//Side Dates to loop still a mess atm but it will look better

// City
function submitForm(event) {
  event.preventDefault();
  let city = document.querySelector("#city-form").value;
  searchCity(city);
}
function searchCity(city) {
  let apiKey = "0c1a639b4888a93ab5ae1ed2074d5083";
  let unitMetric = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=${unitMetric}&appid=${apiKey}`;
  axios.get(apiUrl).then(showWeather);
}
let selectCity = document.querySelector("#search");
selectCity.addEventListener("click", submitForm);

// Change Temperature unit -to be done

//Current
function retrievePosition(position) {
  let apiKey = "0c1a639b4888a93ab5ae1ed2074d5083";
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let unitMetric = "metric";
  let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=${unitMetric}&appid=${apiKey}`;
  axios.get(url).then(showWeather);
}
function getCoords(event) {
  navigator.geolocation.getCurrentPosition(retrievePosition);
}

// Forecast
function formatDay(timesnap) {
  let date = new Date(timesnap * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  return days[day];
}

function displayForecast(response) {
  let forecastElement = document.querySelector("#weather-forecast");
  let forecast = response.data.daily;

  let forecastHTML = `<div class="row row-day">`;

  forecast.forEach(function (forecastDay, index) {
    if (index < 5) {
      forecastHTML =
        forecastHTML +
        `<div class="col-3 day-forecast"><span class="day day2">${formatDay(
          forecastDay.dt
        )}</span></div>
              <div class="col-4 image-forecast"><img src="http://openweathermap.org/img/wn/${
                forecastDay.weather[0].icon
              }@2x.png" class ="image-forecast" alt="cloudy" width="60px"></div>
              <div class="col-5 temperature-forecast">  <span class="maximum-temperature">${Math.round(
                forecastDay.temp.max
              )}° </span><span class="minimum-temperature"> | ${Math.round(
          forecastDay.temp.min
        )}°</span></div>
            `;
    }
  });
  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

function getForecast(coordinates) {
  console.log(coordinates);
  let apiKey = "0c1a639b4888a93ab5ae1ed2074d5083";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&exclude={part}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
}
// Display Weather
function showWeather(response) {
  document.querySelector("#city").innerHTML = response.data.name;
  document.querySelector("#temperature-variable").innerHTML = Math.round(
    response.data.main.temp
  );
  document.querySelector("#humidity").innerHTML =
    response.data.main.humidity + " %";
  document.querySelector("#windspeed").innerHTML =
    Math.round(response.data.wind.speed * 3.6) + " km/h";
  document.querySelector("#description").innerHTML =
    response.data.weather[0].description;
  document.querySelector("#date").innerHTML = formatDate(
    response.data.dt * 1000
  );
  let icon = document.querySelector("#weather-icon");
  icon.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  icon.setAttribute("alt", response.data.weather[0].description);

  getForecast(response.data.coord);
}

let selectCurrent = document.querySelector("#current-location");
selectCurrent.addEventListener("click", getCoords);

searchCity("Arles");

// Fahreinheit / Celsius
function displayFahrenheitTemperature(event) {
  let apiKey = "0c1a639b4888a93ab5ae1ed2074d5083";
  let unit = "imperial";
  let city = document.querySelector("#city").innerHTML;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=${unit}&appid=${apiKey}`;
  axios.get(apiUrl).then(showFahrenheit);
}
function displayCelsiusTemperature(event) {
  let apiKey = "0c1a639b4888a93ab5ae1ed2074d5083";
  let unit = "metric";
  let city = document.querySelector("#city").innerHTML;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=${unit}&appid=${apiKey}`;
  axios.get(apiUrl).then(showCelsius);
}

function showCelsius(response) {
  let temperature = document.querySelector("#temperature-variable");
  temperature.innerHTML = Math.round(response.data.main.temp);
  fahrenheitLink.classList.remove("active");
  celsiusLink.classList.add("active");
}
function showFahrenheit(response) {
  let temperature = document.querySelector("#temperature-variable");
  temperature.innerHTML = Math.round(response.data.main.temp);
  celsiusLink.classList.remove("active");
  fahrenheitLink.classList.add("active");
}

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", displayFahrenheitTemperature);
let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", displayCelsiusTemperature);
let celsiusTemperature = document.querySelector("#temperature-variable");

function nightTime(time) {
  let container = document.querySelector(".container");
  container.classList.add("container-night");
  container.classList.remove("container");
  let lastUpdate = document.querySelector(".current-date");
  lastUpdate.classList.add("current-date-night");
  lastUpdate.classList.remove("current-date");
}
