import axios from 'axios';

// Base URL should point to backend root (no path prefix)
const api = axios.create({
  baseURL: 'http://localhost:3002',
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
    const response = await api.post('/gen/invoice', invoiceData);
    return response.data;
  } catch (error) {
    const errorMessage = error.response?.data?.message || error.message || 'Failed to create invoice';
    throw new Error(errorMessage);
  }
};

export const fetchAdminStats = async () => {
  try {
    const response = await api.get('/admin/stats');
    return response.data?.data;
  } catch (error) {
    const errorMessage = error.response?.data?.message || error.message || 'Failed to fetch stats';
    throw new Error(errorMessage);
  }
};

export const fetchAdminUsers = async () => {
  try {
    const response = await api.get('/admin/users');
    return response.data?.data;
  } catch (error) {
    const errorMessage = error.response?.data?.message || error.message || 'Failed to fetch users';
    throw new Error(errorMessage);
  }
};

export const fetchAdminInvoices = async () => {
  try {
    const response = await api.get('/admin/invoices');
    return response.data?.data;
  } catch (error) {
    const errorMessage = error.response?.data?.message || error.message || 'Failed to fetch invoices';
    throw new Error(errorMessage);
  }
};

export default api;
