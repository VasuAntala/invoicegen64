import axios from 'axios';

// ✅ CORRECT baseURL - points to your backend server
const api = axios.create({
  baseURL: 'http://localhost:3002/gen', // Backend server on port 3000
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000,
});

// Debug logging to verify the URL
api.interceptors.request.use(
  (config) => {
    console.log('🚀 Making API call to:', config.baseURL + config.url);
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export const createInvoice = async (invoiceData) => {
  try {
    // This will call: http://localhost:3002/api/invoices
    const response = await api.post('/invoice', invoiceData);
    return response.data;
  } catch (error) {
    const errorMessage = error.response?.data?.message || error.message || 'Failed to create invoice';
    throw new Error(errorMessage);
  }
};

export default api;
