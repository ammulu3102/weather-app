let inputElement = document.querySelector(".input-btn");
let cityElement = document.querySelector(".city");
const submitElement = document.querySelector(".submit-btn");
const tempdata = document.querySelector(".tempdata");
const humidityElement = document.querySelector(".humidity");
const descdata = document.querySelector(".descdata");
const emoji = document.querySelector(".emoji");
const weatherForm = document.querySelector(".weather-form");
weatherForm.style.display = "none";
async function getWeatherData(city) {
  let apikey = "509089eeb23d42ccfa4f8d7ef3557ce7";
  let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apikey}`;
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`weather  not found`);
    }
    const data = await response.json();
    displayWeatherInfo(data);
    weatherForm.style.display = "block";
  } catch (error) {
    console.error("error");
    cityElement.textContent = "Please Enter Valid City ";
    tempdata.textContent = "";
    humidityElement.textContent = "";
    descdata.textContent = "";
    emoji.textContent = "";
    weatherForm.style.display = "block";
  }
}
function displayWeatherInfo(data) {
  const {
    name: city,
    main: { temp, humidity },
    weather: [{ description, id }],
  } = data;
  cityElement.textContent = `City: ${city}`;
  tempdata.textContent = `Temperature: ${temp.toFixed(2)}°C`;
  humidityElement.textContent = `Humidity:${humidity}%`;
  descdata.textContent = `Description:${description}`;
  getWeatherEmoji(id);
}
function getWeatherEmoji(weatherid) {
  if (weatherid <= 300) {
    emoji.textContent = "⛈️";
  } else if (weatherid < 600) {
    emoji.textContent = "❄️";
  } else if (weatherid < 700) {
    emoji.textContent = "🧥";
  } else if (weatherid < 800) {
    emoji.textContent = "☁️";
  } else if (weatherid === 800) {
    emoji.textContent = "🔥";
  } else if (weatherid > 800) {
    emoji.textContent = "🌤️";
  }
}
submitElement.addEventListener("click", function () {
  cityElement.textContent = inputElement.value;
  if (inputElement.value === "") {
    alert("Please enter a city Name");
    weatherForm.style.display = "none";
    return;
  }
  getWeatherData(inputElement.value);
});
