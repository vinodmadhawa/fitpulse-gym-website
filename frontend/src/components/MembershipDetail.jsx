import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Check, Zap, Clock, Users as UsersIcon } from 'lucide-react';
import './MembershipDetail.css';

export default function MembershipDetail() {
  const { planName } = useParams();
  const navigate = useNavigate();

  const plans = {
    basic: {
      name: 'Basic',
      price: 29,
      period: '/month',
      subtitle: 'Perfect for getting started',
      description: 'Get access to our gym facility and start your fitness journey with basic amenities and equipment.',
      color: '#6B7280',
      features: [
        'Unlimited gym access',
        'Access to all equipment',
        'Locker room & shower facilities',
        'Basic fitness assessment',
        'Mobile app access',
        'WiFi access',
        'Free parking'
      ],
      notIncluded: [
        'Group classes',
        'Personal training',
        'Nutrition coaching',
        'Childcare',
        'Guest passes',
        'Recovery services'
      ],
      highlights: [
        'Most affordable option',
        'Full equipment access',
        'Flexible schedule'
      ],
      upsell: 'Upgrade to Pro to add group classes and personal training'
    },
    pro: {
      name: 'Pro',
      price: 59,
      period: '/month',
      subtitle: 'Most popular choice',
      description: 'Join the majority of our members with unlimited gym access, group classes, and expert guidance.',
      color: '#D4A017',
      features: [
        'Unlimited gym access',
        'Unlimited group classes',
        'Access to all equipment',
        'Monthly fitness assessment',
        '2 personal training sessions/month',
        'Nutrition consultation',
        'Mobile app access',
        'WiFi access',
        'Free parking',
        'Locker room & shower facilities',
        'Guest passes (2/month)',
        'Class booking priority'
      ],
      notIncluded: [
        'Unlimited personal training',
        'Childcare',
        'Recovery services',
        'Premium nutrition coaching'
      ],
      highlights: [
        '50% of members choose this plan',
        'Unlimited classes included',
        '2 PT sessions per month',
        'Best value'
      ],
      upsell: 'Upgrade to Premium for unlimited personal training'
    },
    premium: {
      name: 'Premium',
      price: 99,
      period: '/month',
      subtitle: 'For serious fitness enthusiasts',
      description: 'Everything in Pro plus unlimited personal training sessions and exclusive perks for your fitness goals.',
      color: '#D4A017',
      features: [
        'Unlimited gym access',
        'Unlimited group classes',
        'Unlimited personal training',
        'Weekly fitness assessments',
        'Personalized workout plans',
        'Nutrition coaching (bi-weekly)',
        'Recovery services (massage, sauna)',
        'Mobile app access',
        'WiFi access',
        'Free parking',
        'Locker room & shower facilities',
        'Guest passes (4/month)',
        'Priority class booking',
        'Priority trainer booking',
        'Recovery equipment access'
      ],
      notIncluded: [
        'Childcare'
      ],
      highlights: [
        'Unlimited personal training',
        'Recovery services included',
        'Bi-weekly nutrition coaching',
        'Personalized plans'
      ],
      upsell: 'Add Elite for childcare and VIP amenities'
    },
    elite: {
      name: 'Elite',
      price: 149,
      period: '/month',
      subtitle: 'Ultimate fitness experience',
      description: 'Our most comprehensive membership with every service, amenity, and perk to support your fitness journey.',
      color: '#D4A017',
      features: [
        'Unlimited gym access (24/7)',
        'Unlimited group classes',
        'Unlimited personal training',
        'Weekly fitness assessments & coaching',
        'Personalized meal plans',
        'Unlimited nutrition coaching',
        'Recovery services (massage, sauna, ice bath)',
        'Childcare (unlimited)',
        'Guest privileges (unlimited)',
        'Priority booking for all services',
        'VIP lounge access',
        'Exclusive member events',
        'Mobile app access',
        'Private locker',
        'Towel service',
        '10% discount on supplements',
        'Expert lifestyle coaching',
        'Recovery monitoring'
      ],
      notIncluded: [],
      highlights: [
        ' Premium 24/7 access',
        'Full childcare included',
        'VIP lounge & private locker',
        'Unlimited everything',
        'Personal concierge service'
      ],
      upsell: 'You have our most complete membership!'
    }
  };

  const selectedPlan = plans[planName?.toLowerCase()];

  if (!selectedPlan) {
    return (
      <div className="membership-detail-error">
        <h2>Membership plan not found</h2>
        <button onClick={() => navigate('/')}>Back to Home</button>
      </div>
    );
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.2 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.5 } }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="membership-detail-page"
    >
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="membership-detail-header"
      >
        <button 
          className="back-button"
          onClick={() => navigate('/#membership')}
        >
          <ArrowLeft size={20} />
          <span>Back to Membership</span>
        </button>
      </motion.div>

      {/* Main Content */}
      <div className="membership-detail-container">
        {/* Hero */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="membership-detail-hero"
          style={{ borderColor: selectedPlan.color }}
        >
          <h1 style={{ color: selectedPlan.color }}>{selectedPlan.name} Plan</h1>
          <p className="subtitle">{selectedPlan.subtitle}</p>
          <p className="description">{selectedPlan.description}</p>

          <div className="price-display">
            <span className="currency">$</span>
            <span className="amount">{selectedPlan.price}</span>
            <span className="period">{selectedPlan.period}</span>
          </div>
        </motion.div>

        <div className="membership-content">
          {/* Features */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="membership-left"
          >
            {/* Highlights */}
            {selectedPlan.highlights.length > 0 && (
              <motion.div variants={itemVariants} className="membership-section highlights-section">
                <h3>Why Choose This Plan?</h3>
                <ul className="highlights-list">
                  {selectedPlan.highlights.map((highlight, idx) => (
                    <li key={idx}>
                      <Zap size={16} style={{ color: selectedPlan.color }} />
                      <span>{highlight}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            )}

            {/* Included Features */}
            <motion.div variants={itemVariants} className="membership-section">
              <h3>What's Included</h3>
              <ul className="features-list">
                {selectedPlan.features.map((feature, idx) => (
                  <li key={idx}>
                    <Check size={18} style={{ color: selectedPlan.color }} />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Not Included */}
            {selectedPlan.notIncluded.length > 0 && (
              <motion.div variants={itemVariants} className="membership-section not-included">
                <h3>Not Included</h3>
                <ul className="not-included-list">
                  {selectedPlan.notIncluded.map((item, idx) => (
                    <li key={idx}>
                      <span>✗</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            )}
          </motion.div>

          {/* Right Side - Signup & Info */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="membership-right"
          >
            {/* Signup Card */}
            <motion.div 
              variants={itemVariants} 
              className="signup-card"
              style={{ borderTopColor: selectedPlan.color }}
            >
              <h3>Ready to get started?</h3>
              <p className="card-subtitle">Join today and start your fitness journey!</p>

              <button className="btn-signup" style={{ backgroundColor: selectedPlan.color }}>
                Sign Up Now
              </button>

              <p className="terms">No credit card required. Cancel anytime.</p>

              <div className="divider"></div>

              <p className="upsell">{selectedPlan.upsell}</p>
            </motion.div>

            {/* Comparison */}
            <motion.div variants={itemVariants} className="comparison-card">
              <h3>All Plans Include</h3>
              <ul className="all-plans-features">
                <li><Check size={16} color="#D4A017" />Gym access</li>
                <li><Check size={16} color="#D4A017" />Equipment</li>
                <li><Check size={16} color="#D4A017" />Mobile app</li>
                <li><Check size={16} color="#D4A017" />WiFi</li>
                <li><Check size={16} color="#D4A017" />Free parking</li>
              </ul>
            </motion.div>

            {/* Benefits */}
            <motion.div variants={itemVariants} className="benefits-card">
              <h3>Member Benefits</h3>
              
              <div className="benefit-item">
                <Users size={20} color="#D4A017" />
                <div>
                  <strong>Community</strong>
                  <p>Join thousands of members</p>
                </div>
              </div>

              <div className="benefit-item">
                <Clock size={20} color="#D4A017" />
                <div>
                  <strong>Flexible</strong>
                  <p>Cancel anytime</p>
                </div>
              </div>

              <div className="benefit-item">
                <Zap size={20} color="#D4A017" />
                <div>
                  <strong>Support</strong>
                  <p>Expert trainers available</p>
                </div>
              </div>
            </motion.div>

            {/* FAQ Link */}
            <motion.div variants={itemVariants} className="faq-link-card">
              <p>Have questions about this plan?</p>
              <button 
                className="btn-faq"
                onClick={() => navigate('/faq')}
              >
                Read Our FAQs
              </button>
            </motion.div>
          </motion.div>
        </div>

        {/* Comparison Table */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="membership-comparison"
        >
          <h2>Compare Our Plans</h2>
          <div className="comparison-table">
            <table>
              <thead>
                <tr>
                  <th>Feature</th>
                  <th>Basic<br /><span style={{ fontSize: '12px' }}>$29</span></th>
                  <th>Pro<br /><span style={{ fontSize: '12px' }}>$59</span></th>
                  <th>Premium<br /><span style={{ fontSize: '12px' }}>$99</span></th>
                  <th>Elite<br /><span style={{ fontSize: '12px' }}>$149</span></th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Gym Access</td>
                  <td><Check size={18} color="#D4A017" /></td>
                  <td><Check size={18} color="#D4A017" /></td>
                  <td><Check size={18} color="#D4A017" /></td>
                  <td><Check size={18} color="#D4A017" /></td>
                </tr>
                <tr>
                  <td>Group Classes</td>
                  <td>-</td>
                  <td><Check size={18} color="#D4A017" /></td>
                  <td><Check size={18} color="#D4A017" /></td>
                  <td><Check size={18} color="#D4A017" /></td>
                </tr>
                <tr>
                  <td>Personal Training</td>
                  <td>-</td>
                  <td>2/month</td>
                  <td>Unlimited</td>
                  <td>Unlimited</td>
                </tr>
                <tr>
                  <td>Nutrition Coaching</td>
                  <td>-</td>
                  <td>1 session</td>
                  <td>Bi-weekly</td>
                  <td>Unlimited</td>
                </tr>
                <tr>
                  <td>Recovery Services</td>
                  <td>-</td>
                  <td>-</td>
                  <td><Check size={18} color="#D4A017" /></td>
                  <td><Check size={18} color="#D4A017" /></td>
                </tr>
                <tr>
                  <td>Childcare</td>
                  <td>-</td>
                  <td>-</td>
                  <td>-</td>
                  <td><Check size={18} color="#D4A017" /></td>
                </tr>
                <tr>
                  <td>VIP Lounge</td>
                  <td>-</td>
                  <td>-</td>
                  <td>-</td>
                  <td><Check size={18} color="#D4A017" /></td>
                </tr>
              </tbody>
            </table>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}
