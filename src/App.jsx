import { useState, useEffect } from 'react';
import SearchBar from './components/SearchBar';
import WeatherCard from './components/WeatherCard';
import ForecastCard from './components/ForecastCard';
import UnitToggle from './components/UnitToggle';
import LoadingSpinner from './components/LoadingSpinner';
import ErrorMessage from './components/ErrorMessage';
import {
  fetchWeatherByCity,
  fetchWeatherByCoords,
  fetchForecast,
  fetchForecastByCoords
} from './utils/weatherApi';
import { getSearchHistory, addToSearchHistory } from './utils/localStorage';
import { getWeatherBackground, isDaytime } from './utils/weatherHelpers';

function App() {
  const [weather, setWeather] = useState(null);
  const [forecast, setForecast] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [unit, setUnit] = useState('celsius');
  const [searchHistory, setSearchHistory] = useState([]);
  const [backgroundClass, setBackgroundClass] = useState('bg-gradient-to-br from-teal-600 via-teal-500 to-teal-400');

  useEffect(() => {
    setSearchHistory(getSearchHistory());

    const defaultCity = 'London';
    handleSearch(defaultCity);
  }, []);

  useEffect(() => {
    if (weather) {
      const isDay = isDaytime(weather.dt, weather.sys.sunrise, weather.sys.sunset);
      const bgClass = getWeatherBackground(weather.weather[0].main, isDay);
      setBackgroundClass(bgClass);
    }
  }, [weather]);

  const handleSearch = async (city) => {
    setLoading(true);
    setError(null);

    try {
      const [weatherData, forecastData] = await Promise.all([
        fetchWeatherByCity(city),
        fetchForecast(city)
      ]);

      setWeather(weatherData);
      setForecast(forecastData);
      addToSearchHistory(city);
      setSearchHistory(getSearchHistory());
    } catch (err) {
      setError(err.message || 'Failed to fetch weather data. Please try again.');
      setWeather(null);
      setForecast(null);
    } finally {
      setLoading(false);
    }
  };

  const handleUseLocation = () => {
    if (!navigator.geolocation) {
      setError('Geolocation is not supported by your browser');
      return;
    }

    setLoading(true);
    setError(null);

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        try {
          const { latitude, longitude } = position.coords;
          const [weatherData, forecastData] = await Promise.all([
            fetchWeatherByCoords(latitude, longitude),
            fetchForecastByCoords(latitude, longitude)
          ]);

          setWeather(weatherData);
          setForecast(forecastData);
          addToSearchHistory(weatherData.name);
          setSearchHistory(getSearchHistory());
        } catch (err) {
          setError(err.message || 'Failed to fetch weather data. Please try again.');
          setWeather(null);
          setForecast(null);
        } finally {
          setLoading(false);
        }
      },
      (err) => {
        setError('Unable to retrieve your location. Please search for a city instead.');
        setLoading(false);
      }
    );
  };

  const handleUnitToggle = (newUnit) => {
    setUnit(newUnit);
  };

  return (
    <div className={`min-h-screen ${backgroundClass} animate-gradient transition-all duration-1000`}>
      <div className="container mx-auto px-4 py-8 flex flex-col items-center">
        <div className="flex justify-between items-center w-full max-w-2xl mb-6">
          <h1 className="text-3xl md:text-4xl font-bold text-white drop-shadow-lg">
            Weather App
          </h1>
          <UnitToggle unit={unit} onToggle={handleUnitToggle} />
        </div>

        <SearchBar
          onSearch={handleSearch}
          onUseLocation={handleUseLocation}
          searchHistory={searchHistory}
        />

        {loading && <LoadingSpinner />}

        {error && <ErrorMessage message={error} onRetry={() => setError(null)} />}

        {!loading && !error && weather && (
          <>
            <WeatherCard weather={weather} unit={unit} />
            {forecast && <ForecastCard forecast={forecast} unit={unit} />}
          </>
        )}

        {!loading && !error && !weather && (
          <div className="text-center text-white">
            <p className="text-xl">Search for a city to get started</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
