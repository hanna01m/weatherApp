const apiKey = "d9b449fc93bf0ba23d57f8fbfe9d18f3";
const apiUrl =
  "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

const srcField = document.querySelector("#search input");
const srcBtn = document.querySelector("#search button");
const msg = document.querySelector("#message");
const bodyBackground = document.querySelector("body");

async function checkWeather(city) {
  msg.innerHTML = "";

  if (!city) {
    msg.innerHTML = "Enter a valid city!";
    return;
  }

  const response = await fetch(apiUrl + city + `&appid=${apiKey}`);

  if (response.status == 404) {
    msg.innerHTML = "Enter a valid city!";
    return;
  }
  let data = await response.json();

  console.log(data);

  switch (data.weather[0].main.toLowerCase()) {
    case "rain":
      bodyBackground.style.background = "gray";
      break;
    case "clear":
      bodyBackground.style.background = "yellow";
      break;
    case "clouds":
      bodyBackground.style.background = "lightgray";
      break;
    case "snow":
      bodyBackground.style.background = "white";
      break;
    default:
      bodyBackground.style.background = "none";
      break;
  }

  document.querySelector("#city").innerHTML = data.name;
  document.querySelector("#temprature").innerHTML =
    Math.round(data.main.temp) + "°C";

  // add weather icon
  const iconCode = data.weather[0].icon;
  const iconUrl = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;

  const weatherIcon = document.querySelector("#weather-icon");
  weatherIcon.src = iconUrl;
  weatherIcon.style.display = "block";

  // search div styling
  const searchDiv = document.querySelector("#search");
  searchDiv.style.background = "none";

  // add weather description
  const weatherDescripton = data.weather[0].description;

  const description = document.querySelector("#description");
  description.innerHTML = weatherDescripton;

  // add highest / lowest temprature
  const tempMax = Math.round(data.main.temp_max);
  const tempMin = Math.round(data.main.temp_min);

  const showMax = document.querySelector("#temp-max");
  const showMin = document.querySelector("#temp-min");

  showMax.innerHTML = "H:" + tempMax;
  showMin.innerHTML = "L:" + tempMin;
}
//Search for city
srcBtn.addEventListener("click", () => {
  checkWeather(srcField.value);
  srcField.value = ""; // clear input
});

srcField.addEventListener("keypress", () => {
  if (event.key === "Enter") {
    const city = srcField.value.trim();
    if (city) {
      checkWeather(city);
      srcField.value = "";
    }
  }
});
