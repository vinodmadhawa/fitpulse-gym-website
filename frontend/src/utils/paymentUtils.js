// Payment validation utilities

// Luhn algorithm for card validation
export const validateCardNumber = (cardNumber) => {
  const digits = cardNumber.replace(/\D/g, '');
  if (digits.length < 13 || digits.length > 19) return false;

  let sum = 0;
  let isEven = false;

  for (let i = digits.length - 1; i >= 0; i--) {
    let digit = parseInt(digits[i], 10);

    if (isEven) {
      digit *= 2;
      if (digit > 9) digit -= 9;
    }

    sum += digit;
    isEven = !isEven;
  }

  return sum % 10 === 0;
};

// Detect card type
export const getCardType = (cardNumber) => {
  const patterns = {
    visa: /^4[0-9]{12}(?:[0-9]{3})?$/,
    mastercard: /^5[1-5][0-9]{14}$/,
    amex: /^3[47][0-9]{13}$/,
    discover: /^6(?:011|5[0-9]{2})[0-9]{12}$/
  };

  const digits = cardNumber.replace(/\D/g, '');
  for (const [type, pattern] of Object.entries(patterns)) {
    if (pattern.test(digits)) return type;
  }
  return 'unknown';
};

// Format card number for display (mask)
export const maskCardNumber = (cardNumber) => {
  const digits = cardNumber.replace(/\D/g, '');
  return digits.slice(-4).padStart(digits.length, '*');
};

// Validate CVV based on card type
export const validateCVV = (cvv, cardType) => {
  const cvvDigits = cvv.replace(/\D/g, '');
  if (cardType === 'amex') {
    return cvvDigits.length === 4;
  }
  return cvvDigits.length === 3;
};

// Calculate billing amount with taxes
export const calculateBillingAmount = (baseAmount, taxRate = 0.1) => {
  const tax = baseAmount * taxRate;
  const total = baseAmount + tax;
  return {
    subtotal: baseAmount,
    tax: parseFloat(tax.toFixed(2)),
    total: parseFloat(total.toFixed(2))
  };
};

// Format currency
export const formatCurrency = (amount) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD'
  }).format(amount);
};

// Payment method object
export const createPaymentMethod = (formData) => {
  return {
    type: getCardType(formData.cardNumber),
    cardholderName: formData.cardName,
    last4: formData.cardNumber.slice(-4),
    expiryDate: formData.expiryDate,
    billing: {
      address: formData.address,
      city: formData.city,
      postalCode: formData.zipCode,
      country: 'US'
    }
  };
};

// Order summary
export const createOrderSummary = (planData, paymentMethod) => {
  const billing = calculateBillingAmount(planData.price);
  return {
    orderId: `ORD-${Date.now()}`,
    date: new Date().toISOString(),
    plan: planData,
    billing,
    paymentMethod: {
      type: paymentMethod.type,
      last4: paymentMethod.last4,
      expiryDate: paymentMethod.expiryDate
    },
    status: 'completed'
  };
};
