import { getWeatherIconUrl } from '../utils/weatherApi';
import { celsiusToFahrenheit, formatDate } from '../utils/weatherHelpers';

const ForecastCard = ({ forecast, unit }) => {
  const displayTemp = (temp) => {
    if (unit === 'fahrenheit') {
      return Math.round(celsiusToFahrenheit(temp));
    }
    return Math.round(temp);
  };

  const unitSymbol = unit === 'celsius' ? '°C' : '°F';

  const getDailyForecasts = () => {
    const dailyData = {};

    forecast.list.forEach((item) => {
      const date = new Date(item.dt * 1000).toLocaleDateString();

      if (!dailyData[date]) {
        dailyData[date] = {
          date: item.dt,
          temps: [],
          icon: item.weather[0].icon,
          description: item.weather[0].description
        };
      }

      dailyData[date].temps.push(item.main.temp);
    });

    return Object.values(dailyData).slice(0, 5).map((day) => ({
      ...day,
      minTemp: Math.min(...day.temps),
      maxTemp: Math.max(...day.temps)
    }));
  };

  const dailyForecasts = getDailyForecasts();

  return (
    <div className="w-full max-w-2xl fade-in">
      <div className="bg-teal-700/95 backdrop-blur-md rounded-3xl shadow-2xl p-8 border border-teal-500/30">
        <h2 className="text-2xl font-bold text-white mb-6 text-center">
          5-Day Forecast
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {dailyForecasts.map((day, index) => (
            <div
              key={index}
              className="bg-teal-600/70 rounded-2xl p-4 text-center hover:bg-teal-600/90 transition-all hover:scale-105 hover:shadow-lg"
            >
              <div className="text-white font-medium mb-2">
                {formatDate(day.date)}
              </div>

              <img
                src={getWeatherIconUrl(day.icon)}
                alt={day.description}
                className="w-16 h-16 mx-auto"
              />

              <div className="text-sm text-teal-100 capitalize mb-2">
                {day.description}
              </div>

              <div className="flex justify-center gap-2 text-white">
                <span className="font-bold">{displayTemp(day.maxTemp)}{unitSymbol}</span>
                <span className="text-teal-200">/</span>
                <span className="text-teal-100">{displayTemp(day.minTemp)}{unitSymbol}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ForecastCard;
