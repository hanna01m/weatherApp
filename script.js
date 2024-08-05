const apiKey = "d9b449fc93bf0ba23d57f8fbfe9d18f3";
const apiUrl =
  "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

const srcField = document.querySelector("#search input");
const srcBtn = document.querySelector("#search button");
const msg = document.querySelector("#message");

const infoBtn = document.querySelector(
  "[data-bs-target='#collapseWidthExample']"
);
const infoCard = document.querySelector("#collapseWidthExample");

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

  infoBtn.style.display = "block";

  localStorage.setItem("lsCity", city);

  document.querySelector("#city").innerHTML =
    data.name + ", " + data.sys.country;

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

  //  sunrise and sunset
  const sunrise = formatTime(data.sys.sunrise * 1000);
  const sunset = formatTime(data.sys.sunset * 1000);

  document.getElementById("sunrise").innerHTML = "Sunrise: " + sunrise;
  document.getElementById("sunset").innerHTML = "Sunset: " + sunset;

  document.querySelector("#feels-like").innerHTML =
    "Feels like: " + data.main.feels_like + "°c";

  document.querySelector("#wind-deg").innerHTML = "Wind deg: " + data.wind.deg;
  document.querySelector("#wind-speed").innerHTML =
    "Wind speed: " + data.wind.speed;
}

function formatTime(timestamp) {
  return new Date(timestamp).toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });
}

// more info card
document.addEventListener("DOMContentLoaded", () => {
  infoBtn.textContent = "Show detailed Information";

  infoBtn.addEventListener("click", () => {
    if (infoCard.classList.contains("show")) {
      infoCard.classList.remove("show");
      infoBtn.textContent = "Show detailed Information";
    } else {
      infoCard.classList.add("show");
      infoBtn.textContent = "Hide detailed Information";
    }
  });
});

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

window.addEventListener("load", () => {
  const lsCity = localStorage.getItem("lsCity");
  if (lsCity) {
    checkWeather(lsCity);
  }
});
