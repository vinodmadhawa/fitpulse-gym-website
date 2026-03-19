import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Check, AlertCircle, Lock, CreditCard, ShieldCheck, Loader } from 'lucide-react';
import { processPayment, confirmPayment } from '../services/api';
import { 
  validateCardNumber, 
  getCardType, 
  maskCardNumber,
  validateCVV,
  calculateBillingAmount,
  formatCurrency,
  createPaymentMethod
} from '../utils/paymentUtils';
import './MembershipCheckout.css';

const PAYMENT_STEPS = {
  BILLING: 'billing',
  PAYMENT: 'payment',
  REVIEW: 'review',
  PROCESSING: 'processing',
  COMPLETE: 'complete'
};

const TAX_RATE = 0.08; // 8% tax

export default function MembershipCheckout() {
  const { planName } = useParams();
  const navigate = useNavigate();
  
  const [currentStep, setCurrentStep] = useState(PAYMENT_STEPS.BILLING);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    country: 'US',
    cardName: '',
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    agreeToTerms: false,
    agreeToAutoRenewal: false
  });

  const [errors, setErrors] = useState({});
  const [generalError, setGeneralError] = useState(null);
  const [processing, setProcessing] = useState(false);
  const [paymentResult, setPaymentResult] = useState(null);
  const [cardType, setCardType] = useState(null);

  const plans = {
    basic: { name: 'Basic', price: 29, description: 'Perfect for beginners', features: ['Access to gym', 'Basic classes'] },
    pro: { name: 'Pro', price: 59, description: 'Most popular', features: ['Everything in Basic', 'Trainer assistance', 'Advanced classes'] },
    premium: { name: 'Premium', price: 99, description: 'Complete experience', features: ['Everything in Pro', 'Personal trainer', '1-on-1 coaching'] }
  };

  const plan = plans[planName];
  const billing = calculateBillingAmount(plan?.price || 0, TAX_RATE);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    let finalValue = type === 'checkbox' ? checked : value;
    
    // Auto-format expiry date (MM/YY)
    if (name === 'expiryDate') {
      let digits = value.replace(/\D/g, '');
      if (digits.length >= 2) {
        digits = digits.slice(0, 2) + '/' + digits.slice(2, 4);
      }
      finalValue = digits;
    }

    // Format card number with spaces
    if (name === 'cardNumber') {
      const digits = value.replace(/\D/g, '');
      const formatted = digits.match(/.{1,4}/g)?.join(' ') || digits;
      finalValue = formatted;
      
      // Detect card type
      if (digits.length >= 4) {
        setCardType(getCardType(digits));
      } else {
        setCardType(null);
      }
    }

    setFormData(prev => ({
      ...prev,
      [name]: finalValue
    }));

    // Clear error for this field
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateBillingStep = () => {
    const newErrors = {};
    
    if (!formData.firstName.trim()) newErrors.firstName = 'First name is required';
    if (!formData.lastName.trim()) newErrors.lastName = 'Last name is required';
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) newErrors.email = 'Valid email is required';
    if (!formData.phone.trim()) newErrors.phone = 'Phone is required';
    if (!formData.address.trim()) newErrors.address = 'Street address is required';
    if (!formData.city.trim()) newErrors.city = 'City is required';
    if (!formData.state.trim()) newErrors.state = 'State is required';
    if (!formData.zipCode.trim()) newErrors.zipCode = 'Zip code is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validatePaymentStep = () => {
    const newErrors = {};
    
    if (!formData.cardName.trim()) newErrors.cardName = 'Cardholder name is required';
    
    const cardDigits = formData.cardNumber.replace(/\D/g, '');
    if (!cardDigits) {
      newErrors.cardNumber = 'Card number is required';
    } else if (!validateCardNumber(cardDigits)) {
      newErrors.cardNumber = 'Invalid card number';
    }
    
    if (!formData.expiryDate) {
      newErrors.expiryDate = 'Expiry date is required';
    } else if (!formData.expiryDate.match(/^\d{2}\/\d{2}$/)) {
      newErrors.expiryDate = 'Use MM/YY format';
    } else {
      const [month, year] = formData.expiryDate.split('/');
      const currentDate = new Date();
      const currentYear = currentDate.getFullYear() % 100;
      const currentMonth = currentDate.getMonth() + 1;
      
      const expiryYear = parseInt(year);
      const expiryMonth = parseInt(month);
      
      if (expiryYear < currentYear || (expiryYear === currentYear && expiryMonth < currentMonth)) {
        newErrors.expiryDate = 'Card has expired';
      }
    }

    if (!formData.cvv) {
      newErrors.cvv = 'CVV is required';
    } else if (!validateCVV(formData.cvv, cardType)) {
      newErrors.cvv = cardType === 'amex' ? 'CVV must be 4 digits' : 'CVV must be 3 digits';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateAgreements = () => {
    const newErrors = {};
    
    if (!formData.agreeToTerms) newErrors.agreeToTerms = 'You must agree to Terms & Conditions';
    if (!formData.agreeToAutoRenewal) newErrors.agreeToAutoRenewal = 'You must agree to Auto-Renewal Policy';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNextStep = () => {
    if (currentStep === PAYMENT_STEPS.BILLING) {
      if (validateBillingStep()) {
        setCurrentStep(PAYMENT_STEPS.PAYMENT);
        window.scrollTo(0, 0);
      }
    } else if (currentStep === PAYMENT_STEPS.PAYMENT) {
      if (validatePaymentStep()) {
        setCurrentStep(PAYMENT_STEPS.REVIEW);
        window.scrollTo(0, 0);
      }
    }
  };

  const handleProcessPayment = async () => {
    if (!validateAgreements()) return;

    try {
      setProcessing(true);
      setGeneralError(null);
      setCurrentStep(PAYMENT_STEPS.PROCESSING);

      const cardDigits = formData.cardNumber.replace(/\D/g, '');
      
      // Create payment data
      const paymentData = {
        amount: billing.total,
        cardholderName: formData.cardName,
        cardLast4: cardDigits.slice(-4),
        cardType: getCardType(cardDigits),
        email: formData.email,
        firstName: formData.firstName,
        lastName: formData.lastName,
        phone: formData.phone,
        address: formData.address,
        city: formData.city,
        state: formData.state,
        zipCode: formData.zipCode,
        planId: planName,
        planName: plan.name
      };

      // Process payment through API
      const result = await processPayment(paymentData);

      // Confirm payment
      const confirmation = await confirmPayment(result.paymentIntentId, paymentData);

      setPaymentResult({
        orderId: confirmation.orderId,
        status: 'success',
        message: 'Payment processed successfully!'
      });

      setCurrentStep(PAYMENT_STEPS.COMPLETE);
    } catch (error) {
      setGeneralError(error.message || 'Payment processing failed. Please try again.');
      setCurrentStep(PAYMENT_STEPS.REVIEW);
      setProcessing(false);
    }
  };

  const stepVariants = {
    hidden: { opacity: 0, x: 20 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.4 } },
    exit: { opacity: 0, x: -20, transition: { duration: 0.3 } }
  };

  const progressSteps = [
    { key: PAYMENT_STEPS.BILLING, label: 'Billing', number: 1 },
    { key: PAYMENT_STEPS.PAYMENT, label: 'Payment', number: 2 },
    { key: PAYMENT_STEPS.REVIEW, label: 'Review', number: 3 }
  ];

  if (!plan) {
    return (
      <section className="checkout-error">
        <div className="container">
          <AlertCircle size={48} />
          <h2>Plan Not Found</h2>
          <p>The membership plan you're looking for doesn't exist.</p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="btn btn-primary"
            onClick={() => navigate('/#membership')}
          >
            Back to Plans
          </motion.button>
        </div>
      </section>
    );
  }

  if (currentStep === PAYMENT_STEPS.COMPLETE && paymentResult?.status === 'success') {
    return (
      <section className="checkout-complete">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="success-container"
          >
            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 0.6 }}
              className="success-icon"
            >
              <Check size={64} />
            </motion.div>

            <h2>Payment Successful!</h2>
            <p>Welcome to FitPulse {plan.name} Plan</p>

            <div className="confirmation-details">
              <div className="detail-item">
                <span className="label">Order ID</span>
                <span className="value">{paymentResult.orderId}</span>
              </div>
              <div className="detail-item">
                <span className="label">Plan</span>
                <span className="value">{plan.name}</span>
              </div>
              <div className="detail-item">
                <span className="label">Amount</span>
                <span className="value">{formatCurrency(billing.total)}/month</span>
              </div>
              <div className="detail-item">
                <span className="label">Confirmation Email</span>
                <span className="value">{formData.email}</span>
              </div>
            </div>

            <div className="success-actions">
              <button
                className="btn btn-primary"
                onClick={() => navigate(`/membership/confirmation/${planName}`, {
                  state: {
                    userName: `${formData.firstName} ${formData.lastName}`,
                    email: formData.email,
                    plan: plan.name,
                    price: plan.price,
                    orderId: paymentResult.orderId
                  }
                })}
              >
                View Confirmation
              </button>
              <button
                className="btn btn-secondary"
                onClick={() => navigate('/')}
              >
                Back to Home
              </button>
            </div>
          </motion.div>
        </div>
      </section>
    );
  }

  return (
    <section className="checkout">
      <div className="container">
        <motion.button
          whileHover={{ x: -5 }}
          className="back-btn"
          onClick={() => navigate(-1)}
        >
          <ArrowLeft size={20} />
          Back
        </motion.button>

        {/* Progress Steps */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="progress-steps"
        >
          {progressSteps.map((step, idx) => (
            <div key={step.key} className="progress-item">
              <div className={`step-indicator ${
                currentStep === step.key || 
                (currentStep === PAYMENT_STEPS.REVIEW && step.key !== PAYMENT_STEPS.BILLING) ||
                (currentStep === PAYMENT_STEPS.PROCESSING && step.key !== PAYMENT_STEPS.BILLING)
                ? 'active' : ''
              }`}>
                {step.number}
              </div>
              <div className="step-label">{step.label}</div>
              {idx < progressSteps.length - 1 && <div className="step-divider"></div>}
            </div>
          ))}
        </motion.div>

        {/* General Error */}
        <AnimatePresence>
          {generalError && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="alert alert-error"
            >
              <AlertCircle size={20} />
              <span>{generalError}</span>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="checkout-content">
          <motion.div
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={stepVariants}
            key={currentStep}
            className="checkout-form"
          >

            {/* BILLING STEP */}
            {currentStep === PAYMENT_STEPS.BILLING && (
              <div className="step-content">
                <h2>Billing Information</h2>
                
                <fieldset>
                  <legend>Personal Information</legend>
                  <div className="form-row">
                    <div className="form-group">
                      <label htmlFor="firstName">First Name *</label>
                      <input
                        type="text"
                        id="firstName"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleInputChange}
                        className={errors.firstName ? 'error' : ''}
                      />
                      {errors.firstName && <span className="error-text">{errors.firstName}</span>}
                    </div>
                    <div className="form-group">
                      <label htmlFor="lastName">Last Name *</label>
                      <input
                        type="text"
                        id="lastName"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleInputChange}
                        className={errors.lastName ? 'error' : ''}
                      />
                      {errors.lastName && <span className="error-text">{errors.lastName}</span>}
                    </div>
                  </div>

                  <div className="form-row">
                    <div className="form-group">
                      <label htmlFor="email">Email *</label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        className={errors.email ? 'error' : ''}
                      />
                      {errors.email && <span className="error-text">{errors.email}</span>}
                    </div>
                    <div className="form-group">
                      <label htmlFor="phone">Phone *</label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        className={errors.phone ? 'error' : ''}
                      />
                      {errors.phone && <span className="error-text">{errors.phone}</span>}
                    </div>
                  </div>
                </fieldset>

                <fieldset>
                  <legend>Billing Address</legend>
                  <div className="form-group">
                    <label htmlFor="address">Street Address *</label>
                    <input
                      type="text"
                      id="address"
                      name="address"
                      value={formData.address}
                      onChange={handleInputChange}
                      className={errors.address ? 'error' : ''}
                    />
                    {errors.address && <span className="error-text">{errors.address}</span>}
                  </div>

                  <div className="form-row">
                    <div className="form-group">
                      <label htmlFor="city">City *</label>
                      <input
                        type="text"
                        id="city"
                        name="city"
                        value={formData.city}
                        onChange={handleInputChange}
                        className={errors.city ? 'error' : ''}
                      />
                      {errors.city && <span className="error-text">{errors.city}</span>}
                    </div>
                    <div className="form-group">
                      <label htmlFor="state">State *</label>
                      <input
                        type="text"
                        id="state"
                        name="state"
                        value={formData.state}
                        onChange={handleInputChange}
                        className={errors.state ? 'error' : ''}
                      />
                      {errors.state && <span className="error-text">{errors.state}</span>}
                    </div>
                  </div>

                  <div className="form-group">
                    <label htmlFor="zipCode">Zip Code *</label>
                    <input
                      type="text"
                      id="zipCode"
                      name="zipCode"
                      value={formData.zipCode}
                      onChange={handleInputChange}
                      className={errors.zipCode ? 'error' : ''}
                    />
                    {errors.zipCode && <span className="error-text">{errors.zipCode}</span>}
                  </div>
                </fieldset>

                <button
                  type="button"
                  onClick={handleNextStep}
                  className="btn btn-primary btn-full"
                >
                  Continue to Payment
                </button>
              </div>
            )}

            {/* PAYMENT STEP */}
            {currentStep === PAYMENT_STEPS.PAYMENT && (
              <div className="step-content">
                <h2>Payment Method</h2>
                
                <fieldset>
                  <legend>
                    <CreditCard size={20} />
                    Card Details
                  </legend>

                  <div className="form-group">
                    <label htmlFor="cardName">Cardholder Name *</label>
                    <input
                      type="text"
                      id="cardName"
                      name="cardName"
                      value={formData.cardName}
                      onChange={handleInputChange}
                      className={errors.cardName ? 'error' : ''}
                    />
                    {errors.cardName && <span className="error-text">{errors.cardName}</span>}
                  </div>

                  <div className="form-group card-number-group">
                    <label htmlFor="cardNumber">Card Number *</label>
                    <div className="card-input-wrapper">
                      <input
                        type="text"
                        id="cardNumber"
                        name="cardNumber"
                        placeholder="1234 5678 9012 3456"
                        value={formData.cardNumber}
                        onChange={handleInputChange}
                        maxLength="19"
                        className={errors.cardNumber ? 'error' : ''}
                      />
                      {cardType && (
                        <span className={`card-type-badge ${cardType}`}>
                          {cardType.toUpperCase()}
                        </span>
                      )}
                    </div>
                    {errors.cardNumber && <span className="error-text">{errors.cardNumber}</span>}
                    <small className="security-badge"><ShieldCheck size={14} /> Secure SSL Encrypted</small>
                  </div>

                  <div className="form-row">
                    <div className="form-group">
                      <label htmlFor="expiryDate">Expiry Date *</label>
                      <input
                        type="text"
                        id="expiryDate"
                        name="expiryDate"
                        placeholder="MM/YY"
                        value={formData.expiryDate}
                        onChange={handleInputChange}
                        maxLength="5"
                        className={errors.expiryDate ? 'error' : ''}
                      />
                      {errors.expiryDate && <span className="error-text">{errors.expiryDate}</span>}
                    </div>
                    <div className="form-group">
                      <label htmlFor="cvv">CVV *</label>
                      <input
                        type="text"
                        id="cvv"
                        name="cvv"
                        placeholder={cardType === 'amex' ? '1234' : '123'}
                        value={formData.cvv}
                        onChange={handleInputChange}
                        maxLength={cardType === 'amex' ? '4' : '3'}
                        className={errors.cvv ? 'error' : ''}
                      />
                      {errors.cvv && <span className="error-text">{errors.cvv}</span>}
                    </div>
                  </div>
                </fieldset>

                <div className="form-actions">
                  <button
                    type="button"
                    onClick={() => setCurrentStep(PAYMENT_STEPS.BILLING)}
                    className="btn btn-secondary"
                  >
                    Back
                  </button>
                  <button
                    type="button"
                    onClick={handleNextStep}
                    className="btn btn-primary"
                  >
                    Review Order
                  </button>
                </div>
              </div>
            )}

            {/* REVIEW STEP */}
            {currentStep === PAYMENT_STEPS.REVIEW && (
              <div className="step-content">
                <h2>Review Your Order</h2>

                <div className="review-sections">
                  <div className="review-section">
                    <h3>Billing Information</h3>
                    <div className="review-item">
                      <span className="label">Name:</span>
                      <span className="value">{formData.firstName} {formData.lastName}</span>
                    </div>
                    <div className="review-item">
                      <span className="label">Email:</span>
                      <span className="value">{formData.email}</span>
                    </div>
                    <div className="review-item">
                      <span className="label">Address:</span>
                      <span className="value">{formData.address}, {formData.city}, {formData.state} {formData.zipCode}</span>
                    </div>
                  </div>

                  <div className="review-section">
                    <h3>Payment Method</h3>
                    <div className="review-item">
                      <span className="label">Cardholder:</span>
                      <span className="value">{formData.cardName}</span>
                    </div>
                    <div className="review-item">
                      <span className="label">Card:</span>
                      <span className="value">{cardType?.toUpperCase()} ending in {maskCardNumber(formData.cardNumber).slice(-4)}</span>
                    </div>
                    <div className="review-item">
                      <span className="label">Expires:</span>
                      <span className="value">{formData.expiryDate}</span>
                    </div>
                  </div>
                </div>

                <div className="agreements">
                  <div className="agreement-item">
                    <label htmlFor="agreeToTerms">
                      <input
                        type="checkbox"
                        id="agreeToTerms"
                        name="agreeToTerms"
                        checked={formData.agreeToTerms}
                        onChange={handleInputChange}
                      />
                      <span>I agree to the Terms & Conditions *</span>
                    </label>
                    {errors.agreeToTerms && <span className="error-text">{errors.agreeToTerms}</span>}
                  </div>

                  <div className="agreement-item">
                    <label htmlFor="agreeToAutoRenewal">
                      <input
                        type="checkbox"
                        id="agreeToAutoRenewal"
                        name="agreeToAutoRenewal"
                        checked={formData.agreeToAutoRenewal}
                        onChange={handleInputChange}
                      />
                      <span>I agree to Auto-Renewal Policy and consent to recurring charges *</span>
                    </label>
                    {errors.agreeToAutoRenewal && <span className="error-text">{errors.agreeToAutoRenewal}</span>}
                  </div>
                </div>

                <div className="form-actions">
                  <button
                    type="button"
                    onClick={() => setCurrentStep(PAYMENT_STEPS.PAYMENT)}
                    className="btn btn-secondary"
                  >
                    Back
                  </button>
                  <button
                    type="button"
                    onClick={handleProcessPayment}
                    disabled={processing}
                    className="btn btn-primary"
                  >
                    {processing ? (
                      <>
                        <Loader size={18} className="spinner" />
                        Processing...
                      </>
                    ) : (
                      <>
                        <Lock size={18} />
                        Complete Payment
                      </>
                    )}
                  </button>
                </div>
              </div>
            )}

            {/* PROCESSING STEP */}
            {currentStep === PAYMENT_STEPS.PROCESSING && (
              <div className="step-content processing">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
                  className="processing-spinner"
                >
                  <Loader size={48} />
                </motion.div>
                <h2>Processing Payment</h2>
                <p>Please wait while we process your payment securely...</p>
              </div>
            )}
          </motion.div>

          {/* ORDER SUMMARY SIDEBAR */}
          {currentStep !== PAYMENT_STEPS.PROCESSING && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="order-summary"
            >
              <div className="summary-header">
                <h3>{plan.name} Plan</h3>
                <p>{plan.description}</p>
              </div>

              <ul className="plan-features">
                {plan.features.map((feature, idx) => (
                  <li key={idx}>
                    <Check size={16} />
                    {feature}
                  </li>
                ))}
              </ul>

              <div className="summary-divider"></div>

              <div className="summary-pricing">
                <div className="price-item">
                  <span>Subtotal</span>
                  <span>{formatCurrency(billing.subtotal)}</span>
                </div>
                <div className="price-item">
                  <span>Tax ({(TAX_RATE * 100).toFixed(0)}%)</span>
                  <span>{formatCurrency(billing.tax)}</span>
                </div>
              </div>

              <div className="summary-divider"></div>

              <div className="price-total">
                <span>Monthly Total</span>
                <span>{formatCurrency(billing.total)}</span>
              </div>

              <div className="summary-info">
                <p>✓ Billed {formatCurrency(billing.total)} every month</p>
                <p>✓ Cancel anytime, no hidden fees</p>
                <p>✓ Secure payment processing</p>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </section>
  );
}
