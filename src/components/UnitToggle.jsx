const UnitToggle = ({ unit, onToggle }) => {
  return (
    <div className="flex bg-white/80 backdrop-blur-sm rounded-xl shadow-md overflow-hidden">
      <button
        onClick={() => onToggle('celsius')}
        className={`px-6 py-2 font-medium transition-all ${
          unit === 'celsius'
            ? 'bg-white text-blue-600 shadow-md'
            : 'text-gray-600 hover:bg-white/50'
        }`}
      >
        °C
      </button>
      <button
        onClick={() => onToggle('fahrenheit')}
        className={`px-6 py-2 font-medium transition-all ${
          unit === 'fahrenheit'
            ? 'bg-white text-blue-600 shadow-md'
            : 'text-gray-600 hover:bg-white/50'
        }`}
      >
        °F
      </button>
    </div>
  );
};

export default UnitToggle;
