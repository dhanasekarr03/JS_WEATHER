function getWeatherIcon(conditionId) {
  if (conditionId >= 200 && conditionId < 300) return "⛈️";  
  if (conditionId >= 300 && conditionId < 400) return "🌦️";  
  if (conditionId >= 500 && conditionId < 600) return "🌧️";  
  if (conditionId >= 600 && conditionId < 700) return "❄️";  
  if (conditionId >= 700 && conditionId < 800) return "🌫️";  
  if (conditionId === 800) return "☀️";                        
  if (conditionId === 801) return "🌤️";                       
  if (conditionId === 802) return "⛅";                       
  if (conditionId >= 803) return "☁️";                        
  return "🌡️"; 
}

function getWeatherType(conditionId) {
  if (conditionId >= 500 && conditionId < 600) return "rainy";
  if (conditionId >= 200 && conditionId < 300) return "rainy";  
  if (conditionId === 800 || conditionId === 801) return "sunny";
  if (conditionId >= 600 && conditionId < 700) return "snowy";
  return "cloudy";
}

// Convert Celsius to Fahrenheit
function celsiusToFahrenheit(tempC) {
  return ((tempC * 9) / 5 + 32).toFixed(1);
}


function formatDate(unixTimestamp) {
  const date = new Date(unixTimestamp * 1000);
  const options = { weekday: "short", month: "short", day: "numeric" };
  return date.toLocaleDateString("en-US", options);
}

function formatForecastDate(dateStr) {
  const date = new Date(dateStr);
  const options = { weekday: "short", month: "short", day: "numeric" };
  return date.toLocaleDateString("en-US", options);
}


function getDailyForecasts(forecastList) {
  const seen = {};
  const daily = [];

  for (let i = 0; i < forecastList.length; i++) {
    const item = forecastList[i];
    const dayKey = item.dt_txt.split(" ")[0];

    
    if (!seen[dayKey]) {
      seen[dayKey] = true;
      daily.push(item);
    }

    if (daily.length === 5) break;
  }

  return daily;
}


function isExtremeTemp(tempC) {
  return tempC > 40 || tempC < -10;
}


function getExtremeTempMessage(tempC) {
  if (tempC > 40) {
    return `🔥 Extreme heat! ${tempC}°C — Stay hydrated and avoid direct sunlight!`;
  } else if (tempC < -10) {
    return `🥶 Extreme cold! ${tempC}°C — Dress warmly and limit outdoor exposure!`;
  }
  return "";
}

