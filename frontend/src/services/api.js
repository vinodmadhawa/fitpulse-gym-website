import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

export const submitContact = async (data) => {
  try {
    const response = await apiClient.post('/contact', {
      name: data.name,
      email: data.email,
      message: data.message
    });
    return response.data;
  } catch (error) {
    if (error.response?.data?.message) {
      throw new Error(error.response.data.message);
    }
    throw new Error(error.message || 'An error occurred while submitting the form.');
  }
};

export const getContacts = async () => {
  try {
    const response = await apiClient.get('/contact');
    return response.data;
  } catch (error) {
    throw new Error(error.message || 'An error occurred while fetching contacts.');
  }
};

export default apiClient;
