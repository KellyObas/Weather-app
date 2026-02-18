const SEARCH_HISTORY_KEY = 'weatherSearchHistory';
const MAX_HISTORY_ITEMS = 5;

export const getSearchHistory = () => {
  try {
    const history = localStorage.getItem(SEARCH_HISTORY_KEY);
    return history ? JSON.parse(history) : [];
  } catch (error) {
    console.error('Error reading search history:', error);
    return [];
  }
};

export const addToSearchHistory = (city) => {
  try {
    let history = getSearchHistory();

    history = history.filter(item => item.toLowerCase() !== city.toLowerCase());

    history.unshift(city);

    history = history.slice(0, MAX_HISTORY_ITEMS);

    localStorage.setItem(SEARCH_HISTORY_KEY, JSON.stringify(history));
  } catch (error) {
    console.error('Error saving search history:', error);
  }
};

export const clearSearchHistory = () => {
  try {
    localStorage.removeItem(SEARCH_HISTORY_KEY);
  } catch (error) {
    console.error('Error clearing search history:', error);
  }
};
