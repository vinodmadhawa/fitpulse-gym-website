import { useParams, useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { CheckCircle, Download, Home, Calendar } from 'lucide-react';
import './MembershipConfirmation.css';

export default function MembershipConfirmation() {
  const { planName } = useParams();
  const location = useLocation();
  const navigate = useNavigate();

  const state = location.state || {};
  const userName = state.userName || 'Member';
  const email = state.email || '';
  const plan = state.plan || 'Membership';
  const price = state.price || 0;

  const plans = {
    basic: { name: 'Basic', price: 29 },
    pro: { name: 'Pro', price: 59 },
    premium: { name: 'Premium', price: 99 }
  };

  const selectedPlan = plans[planName] || { name: plan, price: price };
  const startDate = new Date();
  const renewalDate = new Date(startDate.getTime() + 30 * 24 * 60 * 60 * 1000);

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.5 }
    }
  };

  return (
    <section className="confirmation">
      <div className="container">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="confirmation-content"
        >
          {/* Success Header */}
          <motion.div
            variants={itemVariants}
            className="success-header"
          >
            <motion.div
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 0.6 }}
              className="success-icon"
            >
              <CheckCircle size={80} />
            </motion.div>
            <h1>Welcome to FitPulse!</h1>
            <p>Your membership is now active</p>
          </motion.div>

          {/* Confirmation Details */}
          <motion.div
            variants={itemVariants}
            className="confirmation-card"
          >
            <div className="card-header">
              <h2>Membership Confirmed</h2>
              <div className="plan-badge">{selectedPlan.name} Plan</div>
            </div>

            <div className="details-grid">
              <div className="detail-item">
                <span className="label">Member Name</span>
                <span className="value">{userName}</span>
              </div>
              <div className="detail-item">
                <span className="label">Email</span>
                <span className="value">{email}</span>
              </div>
              <div className="detail-item">
                <span className="label">Plan Type</span>
                <span className="value">{selectedPlan.name}</span>
              </div>
              <div className="detail-item">
                <span className="label">Monthly Fee</span>
                <span className="value price">${selectedPlan.price}</span>
              </div>
              <div className="detail-item">
                <span className="label">Start Date</span>
                <span className="value">{startDate.toLocaleDateString()}</span>
              </div>
              <div className="detail-item">
                <span className="label">Next Renewal</span>
                <span className="value">{renewalDate.toLocaleDateString()}</span>
              </div>
            </div>
          </motion.div>

          {/* Next Steps */}
          <motion.div
            variants={itemVariants}
            className="next-steps"
          >
            <h3>What's Next?</h3>
            <div className="steps-list">
              <div className="step">
                <div className="step-number">1</div>
                <div className="step-content">
                  <h4>Download Your App</h4>
                  <p>Get the FitPulse app to book classes, track workouts, and more</p>
                </div>
              </div>
              <div className="step">
                <div className="step-number">2</div>
                <div className="step-content">
                  <h4>Visit Us in Person</h4>
                  <p>Come by our gym to pick up your membership card and get a tour</p>
                </div>
              </div>
              <div className="step">
                <div className="step-number">3</div>
                <div className="step-content">
                  <h4>Schedule Your Session</h4>
                  <p>Book your first personal training session or group class</p>
                </div>
              </div>
              <div className="step">
                <div className="step-number">4</div>
                <div className="step-content">
                  <h4>Start Your Journey</h4>
                  <p>Begin your fitness transformation with our expert trainers</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Features Included */}
          <motion.div
            variants={itemVariants}
            className="features-included"
          >
            <h3>Your {selectedPlan.name} Plan Includes</h3>
            <div className="features-list">
              {selectedPlan.name === 'Basic' && (
                <>
                  <div className="feature-item">
                    <div className="feature-icon">✓</div>
                    <span>Unlimited gym access, 24/7</span>
                  </div>
                  <div className="feature-item">
                    <div className="feature-icon">✓</div>
                    <span>Access to all gym equipment</span>
                  </div>
                  <div className="feature-item">
                    <div className="feature-icon">✓</div>
                    <span>Locker room & shower facilities</span>
                  </div>
                  <div className="feature-item">
                    <div className="feature-icon">✓</div>
                    <span>Free parking</span>
                  </div>
                  <div className="feature-item">
                    <div className="feature-icon">✓</div>
                    <span>Mobile app access</span>
                  </div>
                </>
              )}
              {selectedPlan.name === 'Pro' && (
                <>
                  <div className="feature-item">
                    <div className="feature-icon">✓</div>
                    <span>Unlimited gym access, 24/7</span>
                  </div>
                  <div className="feature-item">
                    <div className="feature-icon">✓</div>
                    <span>Unlimited group classes</span>
                  </div>
                  <div className="feature-item">
                    <div className="feature-icon">✓</div>
                    <span>2 personal training sessions per month</span>
                  </div>
                  <div className="feature-item">
                    <div className="feature-icon">✓</div>
                    <span>Monthly nutrition consultation</span>
                  </div>
                  <div className="feature-item">
                    <div className="feature-icon">✓</div>
                    <span>2 guest passes per month</span>
                  </div>
                  <div className="feature-item">
                    <div className="feature-icon">✓</div>
                    <span>Priority class booking</span>
                  </div>
                </>
              )}
              {selectedPlan.name === 'Premium' && (
                <>
                  <div className="feature-item">
                    <div className="feature-icon">✓</div>
                    <span>Unlimited gym access, 24/7</span>
                  </div>
                  <div className="feature-item">
                    <div className="feature-icon">✓</div>
                    <span>Unlimited group classes</span>
                  </div>
                  <div className="feature-item">
                    <div className="feature-icon">✓</div>
                    <span>Unlimited personal training sessions</span>
                  </div>
                  <div className="feature-item">
                    <div className="feature-icon">✓</div>
                    <span>Bi-weekly nutrition coaching</span>
                  </div>
                  <div className="feature-item">
                    <div className="feature-icon">✓</div>
                    <span>Recovery services (massage & sauna)</span>
                  </div>
                  <div className="feature-item">
                    <div className="feature-icon">✓</div>
                    <span>4 guest passes per month</span>
                  </div>
                  <div className="feature-item">
                    <div className="feature-icon">✓</div>
                    <span>Priority trainer booking</span>
                  </div>
                  <div className="feature-item">
                    <div className="feature-icon">✓</div>
                    <span>Personalized workout plans</span>
                  </div>
                </>
              )}
            </div>
          </motion.div>

          {/* Important Info */}
          <motion.div
            variants={itemVariants}
            className="important-info"
          >
            <h3>Important Information</h3>
            <div className="info-boxes">
              <div className="info-box">
                <Calendar size={20} />
                <div>
                  <h4>Billing Cycle</h4>
                  <p>Your membership will renew on {renewalDate.toLocaleDateString()}. You can cancel anytime before renewal without penalty.</p>
                </div>
              </div>
              <div className="info-box">
                <Download size={20} />
                <div>
                  <h4>Confirmation Email</h4>
                  <p>A detailed receipt and membership details have been sent to {email}</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Action Buttons */}
          <motion.div
            variants={itemVariants}
            transition={{ delay: 0.3 }}
            className="action-buttons"
          >
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="btn btn-primary"
              onClick={() => navigate('/')}
            >
              <Home size={18} />
              Return Home
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="btn btn-secondary"
              onClick={() => navigate('/booking')}
            >
              <Calendar size={18} />
              Book Your First Session
            </motion.button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
