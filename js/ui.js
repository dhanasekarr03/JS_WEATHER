function showLoader(visible) {
  const loader = document.getElementById("loader");
  if (visible) {
    loader.classList.remove("hidden");
  } else {
    loader.classList.add("hidden");
  }
}

function showError(message) {
  const popup = document.getElementById("error-popup");
  const msgEl = document.getElementById("error-msg");
  msgEl.textContent = message;
  popup.classList.remove("hidden");

  setTimeout(() => {
    popup.classList.add("hidden");
  }, 5000);
}

function closeError() {
  document.getElementById("error-popup").classList.add("hidden");
}

function showTempAlert(message) {
  const alertEl = document.getElementById("temp-alert");
  const msgEl = document.getElementById("temp-alert-msg");
  msgEl.textContent = message;
  alertEl.classList.remove("hidden");
}

function setBackground(weatherType) {
  const body = document.getElementById("app-body");
  body.classList.remove("rainy-bg", "sunny-bg", "cloudy-bg", "snowy-bg");

  if (weatherType === "rainy") body.classList.add("rainy-bg");
  else if (weatherType === "sunny") body.classList.add("sunny-bg");
  else if (weatherType === "snowy") body.classList.add("snowy-bg");
  else body.classList.add("cloudy-bg");
}

function displayCurrentWeather(data, isCelsius) {
  const section = document.getElementById("current-weather");
  section.classList.remove("hidden");
  section.classList.add("fade-in");

  document.getElementById("city-name").textContent = `${data.name}, ${data.sys.country}`;
  document.getElementById("weather-date").textContent = formatDate(data.dt);

  const tempC = data.main.temp;
  const tempDisplay = isCelsius
    ? `${tempC.toFixed(1)}°C`
    : `${celsiusToFahrenheit(tempC)}°F`;

  document.getElementById("temperature").textContent = tempDisplay;

  const toggleBtn = document.getElementById("toggle-unit");
  toggleBtn.textContent = isCelsius ? "Switch to °F" : "Switch to °C";

  document.getElementById("wind-speed").textContent = `${data.wind.speed} m/s`;
  document.getElementById("humidity").textContent = `${data.main.humidity}%`;

  const condition = data.weather[0];
  document.getElementById("weather-desc").textContent = condition.description;
  document.getElementById("weather-condition").textContent = condition.main;
  document.getElementById("weather-icon").textContent = getWeatherIcon(condition.id);

  setBackground(getWeatherType(condition.id));

  if (isExtremeTemp(tempC)) {
    showTempAlert(getExtremeTempMessage(tempC));
  }
}

function displayForecast(forecastData) {
  const section = document.getElementById("forecast-section");
  const container = document.getElementById("forecast-cards");

  section.classList.remove("hidden");
  container.innerHTML = ""; 

  const dailyList = getDailyForecasts(forecastData.list);

  dailyList.forEach(function(item) {
    const icon = getWeatherIcon(item.weather[0].id);
    const temp = item.main.temp.toFixed(1);
    const wind = item.wind.speed;
    const humidity = item.main.humidity;
    const date = formatForecastDate(item.dt_txt);

    const card = document.createElement("div");
    card.className = "forecast-card fade-in";
    card.innerHTML = `
      <p class="date">${date}</p>
      <div class="icon">${icon}</div>
      <p class="temp">${temp}°C</p>
      <p class="detail">💨 ${wind} m/s</p>
      <p class="detail">💧 ${humidity}%</p>
    `;

    container.appendChild(card);
  });
}

function renderDropdown(cities) {
  const dropdown = document.getElementById("recent-dropdown");

  if (cities.length === 0) {
    dropdown.classList.add("hidden");
    return;
  }

  dropdown.innerHTML = "";
  dropdown.classList.remove("hidden");

  cities.forEach(function(city) {
    const li = document.createElement("li");
    li.textContent = city;
    li.addEventListener("click", function() {
      document.getElementById("city-input").value = city;
      dropdown.classList.add("hidden");
      handleSearch(); 
    });
    dropdown.appendChild(li);
  });
}
