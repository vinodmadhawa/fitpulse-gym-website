import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Check, AlertCircle } from 'lucide-react';
import './MembershipCheckout.css';

export default function MembershipCheckout() {
  const { planName } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    zipCode: '',
    cardName: '',
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    agreeToTerms: false
  });

  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const plans = {
    basic: { name: 'Basic', price: 29 },
    pro: { name: 'Pro', price: 59 },
    premium: { name: 'Premium', price: 99 }
  };

  const plan = plans[planName];

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    let finalValue = type === 'checkbox' ? checked : value;
    
    // Auto-format expiry date (MM/YY)
    if (name === 'expiryDate') {
      // Remove non-digits
      let digits = value.replace(/\D/g, '');
      // Add / after 2 digits if length is more than 2
      if (digits.length >= 2) {
        digits = digits.slice(0, 2) + '/' + digits.slice(2, 4);
      }
      finalValue = digits;
    }
    
    setFormData(prev => ({
      ...prev,
      [name]: finalValue
    }));
    // Clear error for this field when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.firstName.trim()) newErrors.firstName = 'First name is required';
    if (!formData.lastName.trim()) newErrors.lastName = 'Last name is required';
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) newErrors.email = 'Valid email is required';
    if (!formData.phone.trim()) newErrors.phone = 'Phone is required';
    if (!formData.address.trim()) newErrors.address = 'Address is required';
    if (!formData.city.trim()) newErrors.city = 'City is required';
    if (!formData.zipCode.trim()) newErrors.zipCode = 'Zip code is required';
    if (!formData.cardName.trim()) newErrors.cardName = 'Cardholder name is required';
    if (!formData.cardNumber.replace(/\s/g, '').match(/^\d{13,19}$/)) newErrors.cardNumber = 'Valid card number is required';
    
    // Validate expiry date format
    if (!formData.expiryDate) {
      newErrors.expiryDate = 'Expiry date is required';
    } else if (!formData.expiryDate.match(/^\d{2}\/\d{2}$/)) {
      newErrors.expiryDate = 'Use MM/YY format';
    } else {
      // Validate expiry date is not in the past
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
    
    if (!formData.cvv.match(/^\d{3,4}$/)) newErrors.cvv = 'Valid CVV is required';
    if (!formData.agreeToTerms) newErrors.agreeToTerms = 'You must agree to terms and conditions';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setLoading(true);
    
    try {
      // Simulate payment processing
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Navigate to confirmation with plan data
      navigate(`/membership/confirmation/${planName}`, {
        state: {
          userName: `${formData.firstName} ${formData.lastName}`,
          email: formData.email,
          plan: plan.name,
          price: plan.price
        }
      });
    } catch (error) {
      setErrors({ submit: 'Payment failed. Please try again.' });
    } finally {
      setLoading(false);
    }
  };

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

        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="checkout-header"
        >
          <h2>Complete Your Membership</h2>
          <p>Join the {plan.name} plan for ${plan.price}/month</p>
        </motion.div>

        <div className="checkout-content">
          <motion.form
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            onSubmit={handleSubmit}
            className="checkout-form"
          >
            {errors.submit && (
              <div className="error-message">
                <AlertCircle size={16} />
                {errors.submit}
              </div>
            )}

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
              </div>
            </fieldset>

            <fieldset>
              <legend>Payment Information</legend>
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

              <div className="form-group">
                <label htmlFor="cardNumber">Card Number *</label>
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
                {errors.cardNumber && <span className="error-text">{errors.cardNumber}</span>}
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
                    placeholder="123"
                    value={formData.cvv}
                    onChange={handleInputChange}
                    maxLength="4"
                    className={errors.cvv ? 'error' : ''}
                  />
                  {errors.cvv && <span className="error-text">{errors.cvv}</span>}
                </div>
              </div>
            </fieldset>

            <div className="form-group checkbox">
              <label htmlFor="agreeToTerms">
                <input
                  type="checkbox"
                  id="agreeToTerms"
                  name="agreeToTerms"
                  checked={formData.agreeToTerms}
                  onChange={handleInputChange}
                />
                <span>I agree to the Terms & Conditions and Auto-Renewal Policy *</span>
              </label>
              {errors.agreeToTerms && <span className="error-text">{errors.agreeToTerms}</span>}
            </div>

            <motion.button
              type="submit"
              disabled={loading}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="btn btn-primary btn-submit"
            >
              {loading ? 'Processing...' : `Complete Purchase - $${plan.price}/month`}
            </motion.button>
          </motion.form>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="order-summary"
          >
            <div className="summary-header">
              <h3>Order Summary</h3>
            </div>

            <div className="summary-item">
              <span>{plan.name} Plan</span>
              <span>${plan.price}</span>
            </div>

            <div className="summary-divider"></div>

            <div className="summary-item total">
              <span>Monthly Total</span>
              <span>${plan.price}</span>
            </div>

            <div className="summary-info">
              <p>Billed ${plan.price} every month. Cancel anytime.</p>
            </div>

            <div className="plan-features">
              <h4>What's Included:</h4>
              <ul>
                {plan.name === 'Basic' && (
                  <>
                    <li><Check size={16} /> Unlimited gym access</li>
                    <li><Check size={16} /> Access to all equipment</li>
                    <li><Check size={16} /> Locker room & shower facilities</li>
                    <li><Check size={16} /> Free parking</li>
                  </>
                )}
                {plan.name === 'Pro' && (
                  <>
                    <li><Check size={16} /> Unlimited gym access</li>
                    <li><Check size={16} /> Unlimited group classes</li>
                    <li><Check size={16} /> 2 personal training sessions/month</li>
                    <li><Check size={16} /> Nutrition consultation</li>
                    <li><Check size={16} /> Guest passes (2/month)</li>
                  </>
                )}
                {plan.name === 'Premium' && (
                  <>
                    <li><Check size={16} /> Unlimited gym access</li>
                    <li><Check size={16} /> Unlimited personal training</li>
                    <li><Check size={16} /> Bi-weekly nutrition coaching</li>
                    <li><Check size={16} /> Recovery services included</li>
                    <li><Check size={16} /> Guest passes (4/month)</li>
                  </>
                )}
              </ul>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
