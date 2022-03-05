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
date.innerHTML = `Last uptated: ${day}, ${month}/${number} at ${hour}:${minute}`;

//Side Dates to loop still a mess atm but it will look better

// City
function submitForm(event) {
  event.preventDefault();
  let city = document.querySelector("#city-form").value;
  searchCity(city);
  console.log(city);
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
}

let selectCurrent = document.querySelector("#current");
selectCurrent.addEventListener("click", getCoords);

searchCity("Arles");
