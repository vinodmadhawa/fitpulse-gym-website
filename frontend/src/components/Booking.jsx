import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Calendar, Clock, User, MessageSquare, CheckCircle, AlertCircle, X } from 'lucide-react';
import { trainersData } from '../data/trainersData';
import './Booking.css';

export default function Booking() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    selectTrainer: '',
    selectedDate: '',
    selectedTime: '',
    sessionType: '60',
    fitnessGoal: '',
    experience: 'beginner',
    notes: ''
  });

  const [bookingStatus, setBookingStatus] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const validateBookingForm = () => {
    const errors = [];
    
    if (!formData.name.trim()) errors.push('Name is required');
    if (!formData.email.trim()) errors.push('Email is required');
    if (!formData.phone.trim()) errors.push('Phone number is required');
    if (!formData.selectTrainer) errors.push('Please select a trainer');
    if (!formData.selectedDate) errors.push('Preferred date is required');
    if (!formData.selectedTime) errors.push('Preferred time is required');
    if (!formData.fitnessGoal) errors.push('Fitness goal is required');
    
    return errors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const validationErrors = validateBookingForm();
    if (validationErrors.length > 0) {
      setBookingStatus({
        type: 'error',
        message: `Please fix the following: ${validationErrors.join(', ')}`
      });
      return;
    }

    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      setBookingStatus({
        type: 'success',
        message: 'Booking request submitted successfully!'
      });
      
      // Reset form
      setFormData({
        name: '',
        email: '',
        phone: '',
        selectTrainer: '',
        selectedDate: '',
        selectedTime: '',
        sessionType: '60',
        fitnessGoal: '',
        experience: 'beginner',
        notes: ''
      });
      
      // Auto clear success message after 5 seconds
      setTimeout(() => setBookingStatus(null), 5000);
    }, 1500);
    setIsSubmitting(false);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="booking-page"
    >
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="booking-header"
      >
        <button 
          className="back-button"
          onClick={() => navigate('/')}
        >
          <ArrowLeft size={20} />
          <span>Back Home</span>
        </button>
      </motion.div>

      {/* Main Content */}
      <div className="booking-container">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="booking-hero"
        >
          <h1>Book Your Training Session</h1>
          <p>Schedule a session with our expert trainers and start your fitness journey today!</p>
        </motion.div>

        <div className="booking-content">
          {/* Form Section */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="booking-form-section"
          >
            <motion.form onSubmit={handleSubmit} className="booking-form">
              {/* Personal Information */}
              <motion.div variants={itemVariants} className="form-section">
                <h3>Personal Information</h3>
                
                <div className="form-group">
                  <label>Full Name *</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="John Doe"
                    required
                  />
                </div>

                <div className="form-group">
                  <label>Email *</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="john@example.com"
                    required
                  />
                </div>

                <div className="form-group">
                  <label>Phone Number *</label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="+1 (234) 567-8901"
                    required
                  />
                </div>
              </motion.div>

              {/* Trainer Selection */}
              <motion.div variants={itemVariants} className="form-section">
                <h3>Select Your Trainer</h3>
                
                <div className="form-group">
                  <label>Choose a Trainer *</label>
                  <select
                    name="selectTrainer"
                    value={formData.selectTrainer}
                    onChange={handleChange}
                    required
                  >
                    <option value="">-- Select a trainer --</option>
                    {trainersData.map(trainer => (
                      <option key={trainer.id} value={trainer.name}>
                        {trainer.name} - {trainer.specialty}
                      </option>
                    ))}
                  </select>
                </div>

                <p className="form-hint">Not sure? Our coordinators can match you with the best trainer for your goals!</p>
              </motion.div>

              {/* Session Details */}
              <motion.div variants={itemVariants} className="form-section">
                <h3>Session Details</h3>
                
                <div className="form-row">
                  <div className="form-group">
                    <label>Preferred Date *</label>
                    <input
                      type="date"
                      name="selectedDate"
                      value={formData.selectedDate}
                      onChange={handleChange}
                      min={new Date().toISOString().split('T')[0]}
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label>Preferred Time *</label>
                    <select
                      name="selectedTime"
                      value={formData.selectedTime}
                      onChange={handleChange}
                      required
                    >
                      <option value="">-- Select time --</option>
                      <option value="6:00 AM">6:00 AM</option>
                      <option value="6:30 AM">6:30 AM</option>
                      <option value="7:00 AM">7:00 AM</option>
                      <option value="5:00 PM">5:00 PM</option>
                      <option value="5:30 PM">5:30 PM</option>
                      <option value="6:00 PM">6:00 PM</option>
                      <option value="7:00 PM">7:00 PM</option>
                      <option value="8:00 PM">8:00 PM</option>
                    </select>
                  </div>
                </div>

                <div className="form-group">
                  <label>Session Duration *</label>
                  <radio-group className="radio-group">
                    <label className="radio-label">
                      <input
                        type="radio"
                        name="sessionType"
                        value="30"
                        checked={formData.sessionType === '30'}
                        onChange={handleChange}
                      />
                      <span>30 minutes</span>
                    </label>
                    <label className="radio-label">
                      <input
                        type="radio"
                        name="sessionType"
                        value="45"
                        checked={formData.sessionType === '45'}
                        onChange={handleChange}
                      />
                      <span>45 minutes</span>
                    </label>
                    <label className="radio-label">
                      <input
                        type="radio"
                        name="sessionType"
                        value="60"
                        checked={formData.sessionType === '60'}
                        onChange={handleChange}
                      />
                      <span>60 minutes (Recommended)</span>
                    </label>
                  </radio-group>
                </div>
              </motion.div>

              {/* Fitness Goals */}
              <motion.div variants={itemVariants} className="form-section">
                <h3>Your Fitness Information</h3>
                
                <div className="form-group">
                  <label>Primary Fitness Goal *</label>
                  <select
                    name="fitnessGoal"
                    value={formData.fitnessGoal}
                    onChange={handleChange}
                    required
                  >
                    <option value="">-- Select a goal --</option>
                    <option value="weight-loss">Weight Loss</option>
                    <option value="muscle-gain">Muscle Gain</option>
                    <option value="strength">Build Strength</option>
                    <option value="endurance">Improve Endurance</option>
                    <option value="flexibility">Increase Flexibility</option>
                    <option value="general-fitness">General Fitness</option>
                  </select>
                </div>

                <div className="form-group">
                  <label>Experience Level *</label>
                  <radio-group className="radio-group">
                    <label className="radio-label">
                      <input
                        type="radio"
                        name="experience"
                        value="beginner"
                        checked={formData.experience === 'beginner'}
                        onChange={handleChange}
                      />
                      <span>Beginner</span>
                    </label>
                    <label className="radio-label">
                      <input
                        type="radio"
                        name="experience"
                        value="intermediate"
                        checked={formData.experience === 'intermediate'}
                        onChange={handleChange}
                      />
                      <span>Intermediate</span>
                    </label>
                    <label className="radio-label">
                      <input
                        type="radio"
                        name="experience"
                        value="advanced"
                        checked={formData.experience === 'advanced'}
                        onChange={handleChange}
                      />
                      <span>Advanced</span>
                    </label>
                  </radio-group>
                </div>
              </motion.div>

              {/* Additional Notes */}
              <motion.div variants={itemVariants} className="form-section">
                <h3>Additional Information</h3>
                
                <div className="form-group">
                  <label>Any injuries or limitations we should know about?</label>
                  <textarea
                    name="notes"
                    value={formData.notes}
                    onChange={handleChange}
                    placeholder="Tell us about any injuries, allergies, or medical conditions..."
                    rows="4"
                  />
                </div>
              </motion.div>

              {/* Submit Button */}
              <motion.div variants={itemVariants} className="form-actions">
                <button type="submit" disabled={isSubmitting} className="btn-submit">
                  {isSubmitting ? (
                    <>
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ repeat: Infinity, duration: 1 }}
                        style={{ display: 'inline-block' }}
                      >
                        <MessageSquare size={18} />
                      </motion.div>
                      Submitting...
                    </>
                  ) : (
                    <>
                      <MessageSquare size={18} />
                      Request Booking
                    </>
                  )}
                </button>
                <p className="form-footer">We'll contact you within 24 hours to confirm your booking.</p>
              </motion.div>
            </motion.form>
          </motion.div>

          {/* Info Box */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="booking-info"
          >
            <motion.div variants={itemVariants} className="info-box">
              <h3>Why Book With Us?</h3>
              <ul>
                <li>Expert certified trainers</li>
                <li>Personalized workout plans</li>
                <li>Flexible scheduling</li>
                <li>Progress tracking</li>
                <li>Form correction & guidance</li>
                <li>Nutritional advice</li>
              </ul>
            </motion.div>

            <motion.div variants={itemVariants} className="info-box pricing">
              <h3>Pricing</h3>
              <div className="price-item">
                <span>30 minutes</span>
                <span><strong>$40</strong></span>
              </div>
              <div className="price-item">
                <span>45 minutes</span>
                <span><strong>$55</strong></span>
              </div>
              <div className="price-item">
                <span>60 minutes</span>
                <span><strong>$70</strong></span>
              </div>
              <p className="discount-hint">Book 5+ sessions and get 10% off!</p>
            </motion.div>

            <motion.div variants={itemVariants} className="info-box schedule">
              <h3>Operating Hours</h3>
              <p><strong>Monday - Friday:</strong><br />5:00 AM - 10:00 PM</p>
              <p><strong>Saturday - Sunday:</strong><br />7:00 AM - 8:00 PM</p>
            </motion.div>

            <motion.div variants={itemVariants} className="info-box contact">
              <h3>Questions?</h3>
              <p><strong>Call us:</strong> +1 (234) 567-8901</p>
              <p><strong>Email us:</strong> book@fitpulse.com</p>
              <p style={{ fontSize: '13px', marginTop: '10px', opacity: 0.8 }}>Available 9 AM - 6 PM</p>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Booking Status Modal */}
      <AnimatePresence>
        {bookingStatus && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="modal-overlay"
            onClick={() => setBookingStatus(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className={`booking-modal ${bookingStatus.type}`}
              onClick={(e) => e.stopPropagation()}
            >
              <button 
                className="modal-close"
                onClick={() => setBookingStatus(null)}
              >
                <X size={24} />
              </button>

              <div className="modal-content">
                {bookingStatus.type === 'success' ? (
                  <>
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.2, type: 'spring' }}
                      className="modal-icon success"
                    >
                      <CheckCircle size={64} />
                    </motion.div>
                    <h2>Booking Confirmed!</h2>
                    <p>{bookingStatus.message}</p>
                    <p className="modal-subtitle">Our team will contact you within 24 hours to confirm your training session.</p>
                  </>
                ) : (
                  <>
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.2, type: 'spring' }}
                      className="modal-icon error"
                    >
                      <AlertCircle size={64} />
                    </motion.div>
                    <h2>Booking Failed</h2>
                    <p>{bookingStatus.message}</p>
                    <p className="modal-subtitle">Please check the form and try again.</p>
                  </>
                )}
              </div>

              <div className="modal-actions">
                {bookingStatus.type === 'success' ? (
                  <>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="btn btn-primary"
                      onClick={() => {
                        setBookingStatus(null);
                        navigate('/');
                      }}
                    >
                      Back to Home
                    </motion.button>
                  </>
                ) : (
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="btn btn-secondary"
                    onClick={() => setBookingStatus(null)}
                  >
                    Try Again
                  </motion.button>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
