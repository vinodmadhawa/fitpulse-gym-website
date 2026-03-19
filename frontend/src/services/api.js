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

// Payment Processing Endpoints
export const processPayment = async (paymentData) => {
  try {
    const response = await apiClient.post('/payments/process', {
      amount: paymentData.amount,
      currency: 'USD',
      cardholderName: paymentData.cardholderName,
      cardLast4: paymentData.cardLast4,
      cardType: paymentData.cardType,
      billingEmail: paymentData.email,
      billingAddress: paymentData.address,
      billingCity: paymentData.city,
      billingZipCode: paymentData.zipCode,
      planId: paymentData.planId,
      planName: paymentData.planName
    });
    return response.data;
  } catch (error) {
    if (error.response?.data?.message) {
      throw new Error(error.response.data.message);
    }
    throw new Error(error.message || 'Payment processing failed. Please try again.');
  }
};

export const validatePaymentMethod = async (paymentData) => {
  try {
    const response = await apiClient.post('/payments/validate', {
      cardholderName: paymentData.cardholderName,
      cardNumber: paymentData.cardNumber,
      expiryDate: paymentData.expiryDate,
      cvv: paymentData.cvv,
      billingEmail: paymentData.email
    });
    return response.data;
  } catch (error) {
    if (error.response?.data?.message) {
      throw new Error(error.response.data.message);
    }
    throw new Error(error.message || 'Payment method validation failed.');
  }
};

export const createPaymentIntent = async (amount, planName) => {
  try {
    const response = await apiClient.post('/payments/create-intent', {
      amount: Math.round(amount * 100),
      planName,
      currency: 'USD'
    });
    return response.data;
  } catch (error) {
    if (error.response?.data?.message) {
      throw new Error(error.response.data.message);
    }
    throw new Error(error.message || 'Failed to create payment intent.');
  }
};

export const confirmPayment = async (paymentIntentId, paymentData) => {
  try {
    const response = await apiClient.post('/payments/confirm', {
      paymentIntentId,
      cardholderName: paymentData.cardholderName,
      cardLast4: paymentData.cardLast4,
      cardType: paymentData.cardType,
      email: paymentData.email,
      firstName: paymentData.firstName,
      lastName: paymentData.lastName,
      phone: paymentData.phone
    });
    return response.data;
  } catch (error) {
    if (error.response?.data?.message) {
      throw new Error(error.response.data.message);
    }
    throw new Error(error.message || 'Payment confirmation failed.');
  }
};

export const getPaymentReceipt = async (orderId) => {
  try {
    const response = await apiClient.get(`/payments/receipt/${orderId}`);
    return response.data;
  } catch (error) {
    if (error.response?.data?.message) {
      throw new Error(error.response.data.message);
    }
    throw new Error(error.message || 'Failed to retrieve receipt.');
  }
};

export default apiClient;
