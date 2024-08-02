const apiKey = "d9b449fc93bf0ba23d57f8fbfe9d18f3";
const apiUrl =
  " https://api.openweathermap.org/data/2.5/weather?units=metric&q=london";

async function checkWeather() {
  const response = await fetch(apiUrl + `&appid=${apiKey}`);
  let data = await response.json();
  console.log(data);

  document.querySelector("#city").innerHTML = data.name;
  document.querySelector("#temprature").innerHTML = data.main.temp;
}

checkWeather();
