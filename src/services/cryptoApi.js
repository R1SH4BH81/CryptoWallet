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
        sparkline: false,
        price_change_percentage: '24h',
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching market data:', error);
    return null;
  }
};
