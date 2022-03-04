//Date
function getTime() {}
let now = new Date();

let time = document.querySelector("#time-number");
let hour = now.getHours();
if (hour < 10) {
  hour = `0${hour}`;
}

let minute = now.getMinutes();
if (minute < 10) {
  minute = `0${minute}`;
}
time.innerHTML = `${hour}:${minute}`;

let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let day = days[now.getDay()];

let number = now.getDate();

let months = [
  "01",
  "02",
  "03",
  "04",
  "05",
  "06",
  "07",
  "08",
  "09",
  "10",
  "11",
  "12",
];
let month = months[now.getMonth()];

let date = document.querySelector("#date");
date.innerHTML = `${day}, ${month}/${number}`;

// City
function changeCity(event) {
  let cityTyped = document.querySelector("#city-form");
  let cityToChange = document.querySelector("#city");
  cityToChange.innerHTML = cityTyped.value;

  let apiKey = "0c1a639b4888a93ab5ae1ed2074d5083";
  let unitMetric = "metric";
  let city = cityTyped.value;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=${unitMetric}&appid=${apiKey}`;

  axios.get(apiUrl).then(showTemperature);
}

let selectCity = document.querySelector("#search");
selectCity.addEventListener("click", changeCity, showTemperature);

// Change Temperature unit

function changeToFahrenheit(celsius) {
  let temperature = document.querySelector("#temperature-variable");

  temperature.innerHTML = 64;
}

let selectFahreinheit = document.querySelector("#fahrenheit");
selectFahreinheit.addEventListener("click", changeToFahrenheit);

function changeToCelsius(fahreinheit) {
  let temperature = document.querySelector("#temperature-variable");
  temperature.innerHTML = 18;
}

let selectCelsius = document.querySelector("#celsius");
selectCelsius.addEventListener("click", changeToCelsius);

//Side Dates to loop still a mess atm but it will look better

// Temperature

function showTemperature(response) {
  let temperature = Math.round(response.data.main.temp);
  let temperatureToShow = document.querySelector("#temperature-variable");
  temperatureToShow.innerHTML = temperature;

  setDescription(
    response.data.weather[0].description,
    document.querySelector("#description")
  );

  setHumidity(response.data.main.humidity, document.querySelector("#humidity"));

  setWind(response.data.wind.speed, document.querySelector("#windspeed"));
}

//Current

function retrievePosition(position) {
  let apiKey = "0c1a639b4888a93ab5ae1ed2074d5083";
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let unitMetric = "metric";
  let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=${unitMetric}&appid=${apiKey}`;
  axios.get(url).then(showCurrentTemperature);
}
function getCoords(event) {
  navigator.geolocation.getCurrentPosition(retrievePosition);
}
function showCurrentTemperature(response) {
  let temperature = Math.round(response.data.main.temp);
  let temperatureToShow = document.querySelector("#temperature-variable");
  temperatureToShow.innerHTML = temperature;

  let city = document.querySelector("#city");
  city.innerHTML = response.data.name;

  setDescription(
    response.data.weather[0].description,
    document.querySelector("#description")
  );
  setHumidity(response.data.main.humidity, document.querySelector("#humidity"));
  setWind(response.data.wind.speed, document.querySelector("#windspeed"));
}

let selectCurrent = document.querySelector("#current");
selectCurrent.addEventListener("click", getCoords);

function setDescription(description, element) {
  element.innerHTML = description;
}
function setHumidity(humidity, element) {
  element.innerHTML = humidity + " %";
}
function setWind(wind, element) {
  element.innerHTML = Math.round(wind * 3.6) + " km/h";
}
