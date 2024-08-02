const apiKey = "d9b449fc93bf0ba23d57f8fbfe9d18f3";
const apiUrl =
  "https://api.openweathermap.org/data/2.5/weather?units=metric&q=london";

async function checkWeather() {
  const response = await fetch(apiUrl + `&appid=${apiKey}`);
  const data = await response.json();
  console.log(data);

  document.querySelector("#city").innerHTML = data.name;
  document.querySelector("#temprature").innerHTML = `${data.main.temp}°C`;

  // add weather icon
  const iconCode = data.weather[0].icon;
  const iconUrl = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;

  const weatherIcon = document.querySelector("#weather-icon");
  weatherIcon.src = iconUrl;

  // add weather description
  const weatherDescripton = data.weather[0].description;

  const description = document.querySelector("#description");
  description.innerHTML = weatherDescripton;

  // add highest / lowest temprature
  const tempMax = data.main.temp_max;
  const tempMin = data.main.temp_min;

  const showMax = document.querySelector("#temp-max");
  const showMin = document.querySelector("#temp-min");

  showMax.innerHTML = "H:" + tempMax;
  showMin.innerHTML = "M:" + tempMin;
}

checkWeather();
