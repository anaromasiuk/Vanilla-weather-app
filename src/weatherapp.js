function displayTemperature(response) {
  console.log(response.data);
  let temperatureElement = document.querySelector(".number");
  let cityElement = document.querySelector(".city");
  let feelslikeElement = document.querySelector("#feelslike");
  let humidityElement = document.querySelector("#humidity");
  let windspeedElement = document.querySelector("#windspeed");
  temperatureElement.innerHTML = Math.round(response.data.main.temp);
  cityElement.innerHTML = response.data.name;
  humidityElement.innerHTML = response.data.main.humidity + "%";
  feelslikeElement.innerHTML = Math.round(response.data.main.feels_like) + "°C";
  windspeedElement.innerHTML = response.data.wind.speed + "km/h";
}

let apiKey = "f47a3ec592b9d7c74815dad665355000";
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=Berlin&appid=${apiKey}&units=metric`;
console.log(apiUrl);
axios.get(apiUrl).then(displayTemperature);
