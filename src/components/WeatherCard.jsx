import { getWeatherIconUrl } from '../utils/weatherApi';
import { celsiusToFahrenheit, formatTime } from '../utils/weatherHelpers';

const WeatherCard = ({ weather, unit }) => {
  const displayTemp = (temp) => {
    if (unit === 'fahrenheit') {
      return Math.round(celsiusToFahrenheit(temp));
    }
    return Math.round(temp);
  };

  const unitSymbol = unit === 'celsius' ? '°C' : '°F';

  const localTime = formatTime(weather.dt, weather.timezone);
  const currentDate = new Date(weather.dt * 1000).toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  return (
    <div className="w-full max-w-2xl mb-8 fade-in">
      <div className="bg-teal-700/95 backdrop-blur-md rounded-3xl shadow-2xl p-8 border border-teal-500/30">
        <div className="text-center mb-6">
          <h1 className="text-4xl font-bold text-white mb-1">
            {weather.name}, {weather.sys.country}
          </h1>
          <p className="text-teal-100 text-lg">{currentDate}</p>
          <p className="text-teal-100 text-md">{localTime}</p>
        </div>

        <div className="flex items-center justify-center mb-6">
          <img
            src={getWeatherIconUrl(weather.weather[0].icon)}
            alt={weather.weather[0].description}
            className="w-32 h-32"
          />
        </div>

        <div className="text-center mb-6">
          <div className="text-7xl font-bold text-white mb-2">
            {displayTemp(weather.main.temp)}{unitSymbol}
          </div>
          <div className="text-2xl text-teal-50 capitalize mb-2">
            {weather.weather[0].description}
          </div>
          <div className="text-lg text-teal-100">
            Feels like {displayTemp(weather.main.feels_like)}{unitSymbol}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 mt-8">
          <div className="bg-teal-600/70 rounded-2xl p-4 text-center">
            <div className="flex items-center justify-center mb-2">
              <svg className="w-6 h-6 text-teal-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
            </div>
            <div className="text-2xl font-bold text-white">{weather.main.humidity}%</div>
            <div className="text-sm text-teal-100">Humidity</div>
          </div>

          <div className="bg-teal-600/70 rounded-2xl p-4 text-center">
            <div className="flex items-center justify-center mb-2">
              <svg className="w-6 h-6 text-teal-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </div>
            <div className="text-2xl font-bold text-white">{Math.round(weather.wind.speed)} m/s</div>
            <div className="text-sm text-teal-100">Wind Speed</div>
          </div>

          <div className="bg-teal-600/70 rounded-2xl p-4 text-center">
            <div className="flex items-center justify-center mb-2">
              <svg className="w-6 h-6 text-teal-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3" />
              </svg>
            </div>
            <div className="text-2xl font-bold text-white">{weather.main.pressure} hPa</div>
            <div className="text-sm text-teal-100">Pressure</div>
          </div>

          <div className="bg-teal-600/70 rounded-2xl p-4 text-center">
            <div className="flex items-center justify-center mb-2">
              <svg className="w-6 h-6 text-teal-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              </svg>
            </div>
            <div className="text-2xl font-bold text-white">{weather.visibility / 1000} km</div>
            <div className="text-sm text-teal-100">Visibility</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WeatherCard;
