// src/api.js
import axios from 'axios';

// Create an Axios instance
const api = axios.create({
  baseURL: 'http://127.0.0.1:8000', // Backend URL
  timeout: 10000, // Optional timeout in ms
});

// Example API methods
export const getItems = async () => {
  try {
    const response = await api.get('/cryptocurrencies');
    return response.data;
  } catch (error) {
    console.error('Error fetching items:', error);
    throw error;
  }
};

export const getCryptocurrency = async (id, query) => {
  try {
    const response = await api.get(`/cryptocurrencies/${id}`, { params: { q: query } });
    return response.data;
  } catch (error) {
    console.error('Error fetching cryptocurrency:', error);
    throw error;
  }
};

export const createItem = async (data) => {
  try {
    const response = await api.post('/cryptocurrencies', data);
    return response.data;
  } catch (error) {
    console.error('Error creating item:', error);
    throw error;
  }
};
