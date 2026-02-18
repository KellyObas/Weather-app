const API_KEY = import.meta.env.VITE_OPENWEATHER_API_KEY;
const BASE_URL = 'https://api.openweathermap.org/data/2.5';

if (!API_KEY || API_KEY === 'your_api_key_here') {
  console.error('OpenWeatherMap API key is missing or invalid. Please add it to your .env file.');
}

export const fetchWeatherByCity = async (city) => {
  const response = await fetch(
    `${BASE_URL}/weather?q=${city}&appid=${API_KEY}&units=metric`
  );

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || 'City not found');
  }

  return response.json();
};

export const fetchWeatherByCoords = async (lat, lon) => {
  const response = await fetch(
    `${BASE_URL}/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
  );

  if (!response.ok) {
    throw new Error('Unable to fetch weather data');
  }

  return response.json();
};

export const fetchForecast = async (city) => {
  const response = await fetch(
    `${BASE_URL}/forecast?q=${city}&appid=${API_KEY}&units=metric`
  );

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || 'Unable to fetch forecast data');
  }

  return response.json();
};

export const fetchForecastByCoords = async (lat, lon) => {
  const response = await fetch(
    `${BASE_URL}/forecast?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
  );

  if (!response.ok) {
    throw new Error('Unable to fetch forecast data');
  }

  return response.json();
};

export const getWeatherIconUrl = (iconCode) => {
  return `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
};
