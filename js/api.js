const API_KEY = "f0a908f26428675cdf8ff1b3e9eb16e0";
const BASE_URL = "https://api.openweathermap.org/data/2.5";


//current weather
async function fetchCurrentWeatherByCity(city) {
  const url = `${BASE_URL}/weather?q=${city}&appid=${API_KEY}&units=metric`;
  const response = await fetch(url);

  // If the response is not ok, throw an error so we can catch it
  if (!response.ok) {
    if (response.status === 404) {
      throw new Error("City not found. Please check the spelling and try again.");
    } else if (response.status === 401) {
      throw new Error("Invalid API key. Please check your API key.");
    } else {
      throw new Error("Failed to fetch weather data. Try again later.");
    }
  }

  const data = await response.json();
  return data;
}

// Fetch current weather by coordinates (lat, lon)
async function fetchCurrentWeatherByCoords(lat, lon) {
  const url = `${BASE_URL}/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`;
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error("Could not get weather for your location.");
  }

  const data = await response.json();
  return data;
}

// Fetch 5-day forecast by city name
async function fetchForecastByCity(city) {
  const url = `${BASE_URL}/forecast?q=${city}&appid=${API_KEY}&units=metric`;
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error("Could not fetch forecast data.");
  }

  const data = await response.json();
  return data;
}

// Fetch 5-day forecast by coordinates
async function fetchForecastByCoords(lat, lon) {
  const url = `${BASE_URL}/forecast?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`;
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error("Could not fetch forecast for your location.");
  }

  const data = await response.json();
  return data;
}
