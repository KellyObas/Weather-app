import { useState } from 'react';

const SearchBar = ({ onSearch, onUseLocation, searchHistory }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [showHistory, setShowHistory] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      onSearch(searchTerm);
      setSearchTerm('');
      setShowHistory(false);
    }
  };

  const handleHistoryClick = (city) => {
    onSearch(city);
    setShowHistory(false);
  };

  return (
    <div className="w-full max-w-2xl mb-8 relative">
      <form onSubmit={handleSubmit} className="flex gap-2 mb-4">
        <div className="flex-1 relative">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onFocus={() => setShowHistory(true)}
            onBlur={() => setTimeout(() => setShowHistory(false), 200)}
            placeholder="Search for a city..."
            className="w-full px-6 py-4 rounded-2xl bg-white/90 backdrop-blur-sm shadow-lg border border-white/50 focus:outline-none focus:ring-2 focus:ring-white/50 text-gray-800 placeholder-gray-500 text-lg transition-all"
          />
          {showHistory && searchHistory.length > 0 && (
            <div className="absolute top-full left-0 right-0 mt-2 bg-white/95 backdrop-blur-sm rounded-xl shadow-xl overflow-hidden z-10">
              <div className="px-4 py-2 bg-gray-100 text-gray-600 text-sm font-medium">
                Recent Searches
              </div>
              {searchHistory.map((city, index) => (
                <button
                  key={index}
                  type="button"
                  onClick={() => handleHistoryClick(city)}
                  className="w-full px-4 py-3 text-left hover:bg-blue-50 transition-colors text-gray-800 border-b border-gray-100 last:border-b-0"
                >
                  {city}
                </button>
              ))}
            </div>
          )}
        </div>
        <button
          type="submit"
          className="px-8 py-4 rounded-2xl bg-white/90 backdrop-blur-sm shadow-lg hover:bg-white transition-all hover:scale-105 active:scale-95 text-gray-800 font-medium"
        >
          Search
        </button>
      </form>
      <button
        type="button"
        onClick={onUseLocation}
        className="w-full px-6 py-3 rounded-xl bg-white/80 backdrop-blur-sm shadow-md hover:bg-white/90 transition-all hover:scale-105 active:scale-95 text-gray-800 font-medium flex items-center justify-center gap-2"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
        Use My Location
      </button>
    </div>
  );
};

export default SearchBar;
