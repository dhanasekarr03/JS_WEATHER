let currentWeatherData = null;
let isCelsius = true; 

async function handleSearch() {
  const input = document.getElementById("city-input");
  const city = input.value.trim();

  if (city === "") {
    showError("Please enter a city name before searching.");
    return;
  }

  if (/^\d+$/.test(city)) {
    showError("Invalid city name. Please enter a valid city.");
    return;
  }

  isCelsius = true;

  showLoader(true);
  document.getElementById("current-weather").classList.add("hidden");
  document.getElementById("forecast-section").classList.add("hidden");

  try {
    const weatherData = await fetchCurrentWeatherByCity(city);
    const forecastData = await fetchForecastByCity(city);

    currentWeatherData = weatherData;

    displayCurrentWeather(weatherData, isCelsius);
    displayForecast(forecastData);

    input.value = "";
    saveRecentCity(weatherData.name);

  } catch (error) {
    showError(error.message);
  } finally {
    showLoader(false);
  }
}

window.addEventListener("load", function() {
  const input = document.getElementById("city-input");
  input.addEventListener("keydown", function(e) {
    if (e.key === "Enter") {
      handleSearch();
    }
  });
});

function useCurrentLocation() {
  if (!navigator.geolocation) {
    showError("Geolocation is not supported by your browser.");
    return;
  }

  showLoader(true);
  document.getElementById("current-weather").classList.add("hidden");
  document.getElementById("forecast-section").classList.add("hidden");

  navigator.geolocation.getCurrentPosition(
    async function(position) {
      const lat = position.coords.latitude;
      const lon = position.coords.longitude;

      try {
        const weatherData = await fetchCurrentWeatherByCoords(lat, lon);
        const forecastData = await fetchForecastByCoords(lat, lon);

        currentWeatherData = weatherData;
        isCelsius = true;

        displayCurrentWeather(weatherData, isCelsius);
        displayForecast(forecastData);

      } catch (error) {
        showError(error.message);
      } finally {
        showLoader(false);
      }
    },
    function(err) {
      showLoader(false);
      if (err.code === 1) {
        showError("Location access denied. Please allow location access or search manually.");
      } else {
        showError("Could not get your location. Please try searching manually.");
      }
    }
  );
}

let recentCities = JSON.parse(sessionStorage.getItem("recentCities")) || [];

function saveRecentCity(cityName) {
  recentCities = recentCities.filter(function(c) {
    return c.toLowerCase() !== cityName.toLowerCase();
  });

  recentCities.unshift(cityName);

  if (recentCities.length > 5) {
    recentCities = recentCities.slice(0, 5);
  }

  sessionStorage.setItem("recentCities", JSON.stringify(recentCities));
}

document.addEventListener("DOMContentLoaded", function() {
  const input = document.getElementById("city-input");

  input.addEventListener("focus", function() {
    if (recentCities.length > 0) {
      renderDropdown(recentCities);
    }
  });

  document.addEventListener("click", function(e) {
    const dropdown = document.getElementById("recent-dropdown");
    if (!dropdown.contains(e.target) && e.target !== input) {
      dropdown.classList.add("hidden");
    }
  });
});

function toggleUnit() {
  if (!currentWeatherData) return;

  isCelsius = !isCelsius;
  displayCurrentWeather(currentWeatherData, isCelsius);
}
