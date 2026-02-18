export const celsiusToFahrenheit = (celsius) => {
  return (celsius * 9/5) + 32;
};

export const getWeatherBackground = (weatherCondition, isDaytime = true) => {
  const condition = weatherCondition.toLowerCase();

  if (condition.includes('clear')) {
    return isDaytime
      ? 'bg-gradient-to-br from-teal-500 via-teal-600 to-cyan-600'
      : 'bg-gradient-to-br from-teal-900 via-gray-900 to-black';
  }

  if (condition.includes('cloud')) {
    return 'bg-gradient-to-br from-teal-400 via-teal-500 to-teal-600';
  }

  if (condition.includes('rain') || condition.includes('drizzle')) {
    return 'bg-gradient-to-br from-teal-700 via-slate-700 to-slate-800';
  }

  if (condition.includes('snow')) {
    return 'bg-gradient-to-br from-cyan-300 via-teal-300 to-teal-400';
  }

  if (condition.includes('thunder')) {
    return 'bg-gradient-to-br from-teal-800 via-gray-800 to-gray-900';
  }

  if (condition.includes('mist') || condition.includes('fog') || condition.includes('haze')) {
    return 'bg-gradient-to-br from-teal-300 via-teal-400 to-teal-500';
  }

  return isDaytime
    ? 'bg-gradient-to-br from-teal-600 via-teal-500 to-teal-400'
    : 'bg-gradient-to-br from-teal-900 via-gray-800 to-gray-900';
};

export const formatDate = (timestamp) => {
  const date = new Date(timestamp * 1000);
  return date.toLocaleDateString('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric'
  });
};

export const formatTime = (timestamp, timezone) => {
  const date = new Date((timestamp + timezone) * 1000);
  return date.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    timeZone: 'UTC'
  });
};

export const isDaytime = (currentTime, sunrise, sunset) => {
  return currentTime >= sunrise && currentTime < sunset;
};
