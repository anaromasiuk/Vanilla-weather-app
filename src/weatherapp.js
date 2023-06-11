function formatDate(timestamp) {
  let date = new Date(timestamp);
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  let weekdays = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let weekday = weekdays[date.getDay()];
  let months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  let month = months[date.getMonth()];

  let day = date.getDate();

  return `${weekday}, ${month} ${day} ${hours}:${minutes}`;
}

function displayTemperature(response) {
  let temperatureElement = document.querySelector(".number");
  let cityElement = document.querySelector(".city");
  let descriptionElement = document.querySelector(".weatherDescription");
  let feelslikeElement = document.querySelector("#feelslike");
  let humidityElement = document.querySelector("#humidity");
  let windspeedElement = document.querySelector("#windspeed");
  let dateElement = document.querySelector(".date");
  let iconElement = document.querySelector("#icon");

  celsiusTemp = response.data.main.temp;

  temperatureElement.innerHTML = Math.round(celsiusTemp);
  cityElement.innerHTML = "📍 " + response.data.name;
  descriptionElement.innerHTML = response.data.weather[0].description;
  humidityElement.innerHTML = response.data.main.humidity + "%";
  feelslikeElement.innerHTML = Math.round(response.data.main.feels_like) + "°C";
  windspeedElement.innerHTML = response.data.wind.speed + "km/h";
  dateElement.innerHTML = "Updated: " + formatDate(response.data.dt * 1000);
  iconElement.setAttribute(
    "src",
    `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
}

function search(city) {
  let apiKey = "f47a3ec592b9d7c74815dad665355000";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayTemperature);
}

function handleSubmit(event) {
  event.preventDefault();
  let cityInputElement = document.querySelector("#city");
  search(cityInputElement.value);
}

function displayFahrenheitTemp(event) {
  event.preventDefault();

  let temperatureElement = document.querySelector(".number");
  celsiusConversion.classList.remove("active");
  fahrenheitConversion.classList.add("active");
  let fahrenheitTemp = (celsiusTemp * 9) / 5 + 32;
  temperatureElement.innerHTML = Math.round(fahrenheitTemp);
}

function displayCelsiusTemp(event) {
  event.preventDefault();
  celsiusConversion.classList.add("active");
  fahrenheitConversion.classList.remove("active");
  let temperatureElement = document.querySelector(".number");
  temperatureElement.innerHTML = Math.round(celsiusTemp);
}

let celsiusTemp = null;

let form = document.querySelector("#search-form");
form.addEventListener("submit", handleSubmit);

let fahrenheitConversion = document.querySelector("#fahrenheit-conversion");
fahrenheitConversion.addEventListener("click", displayFahrenheitTemp);

let celsiusConversion = document.querySelector("#celsius-conversion");
celsiusConversion.addEventListener("click", displayCelsiusTemp);

search("Berlin");
