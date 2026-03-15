import axios from 'axios';

const COINGECKO_BASE_URL = 'https://api.coingecko.com/api/v3';

export const getCryptoPrices = async (ids = ['bitcoin', 'litecoin', 'ethereum', 'binancecoin', 'tether']) => {
  try {
    const response = await axios.get(`${COINGECKO_BASE_URL}/simple/price`, {
      params: {
        ids: ids.join(','),
        vs_currencies: 'usd',
        include_24hr_change: true,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching crypto prices:', error);
    return null;
  }
};

export const getCoinMarketData = async (ids = ['bitcoin', 'litecoin', 'ethereum', 'binancecoin', 'tether']) => {
  try {
    const response = await axios.get(`${COINGECKO_BASE_URL}/coins/markets`, {
      params: {
        vs_currency: 'usd',
        ids: ids.join(','),
        order: 'market_cap_desc',
        per_page: 100,
        page: 1,
        sparkline: true,
        price_change_percentage: '24h',
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching market data:', error);
    return null;
  }
};

export const getCoinHistory = async (id, days = 365) => {
  try {
    const normalizedId = id.toLowerCase();
    const response = await axios.get(`${COINGECKO_BASE_URL}/coins/${normalizedId}/market_chart`, {
      params: {
        vs_currency: 'usd',
        days: days,
      },
    });
    return response.data;
  } catch (error) {
    console.error(`Error fetching historical data for ${id}:`, error);
    return null;
  }
};

export const getGlobalData = async () => {
  try {
    const response = await axios.get(`${COINGECKO_BASE_URL}/global`);
    return response.data;
  } catch (error) {
    console.error('Error fetching global data:', error);
    return null;
  }
};

export const getTrendingCoins = async () => {
  try {
    const response = await axios.get(`${COINGECKO_BASE_URL}/search/trending`);
    return response.data;
  } catch (error) {
    console.error('Error fetching trending coins:', error);
    return null;
  }
};

export const getCoinDetails = async (id) => {
  try {
    const normalizedId = id.toLowerCase();
    const response = await axios.get(`${COINGECKO_BASE_URL}/coins/${normalizedId}`, {
      params: {
        localization: false,
        tickers: false,
        market_data: true,
        community_data: true,
        developer_data: true,
        sparkline: false,
      },
    });
    return response.data;
  } catch (error) {
    console.error(`Error fetching details for ${id}:`, error);
    return null;
  }
};

export const getSearchSuggestions = async (query) => {
  try {
    const response = await axios.get(`${COINGECKO_BASE_URL}/search`, {
      params: { query },
    });
    return response.data;
  } catch (error) {
    console.error(`Error searching for ${query}:`, error);
    return null;
  }
};

export const getCoinOHLC = async (id, days = 1) => {
  try {
    const normalizedId = id.toLowerCase();
    const response = await axios.get(`${COINGECKO_BASE_URL}/coins/${normalizedId}/ohlc`, {
      params: {
        vs_currency: 'usd',
        days: days,
      },
    });
    return response.data;
  } catch (error) {
    console.error(`Error fetching OHLC data for ${id}:`, error);
    return null;
  }
};
