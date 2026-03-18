import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Check } from 'lucide-react';
import './Membership.css';

export default function Membership() {
  const navigate = useNavigate();


  const plans = [
    {
      id: 1,
      name: 'Basic',
      price: '29',
      features: [
        'Gym Access',
        '1 Class/Week'
      ],
      badge: null
    },
    {
      id: 2,
      name: 'Standard',
      price: '49',
      features: [
        'Full Access',
        '5 Classes/Week',
        'Personal Training'
      ],
      badge: 'Most Popular'
    },
    {
      id: 3,
      name: 'Premium',
      price: '79',
      features: [
        'All Access',
        'Unlimited Classes',
        '2x Personal Training'
      ],
      badge: null
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 }
    }
  };

  return (
    <section className="membership" id="membership">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="section-header"
        >
          <h2>Membership Plans</h2>
          <p>Choose Your Plan</p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="membership-grid"
        >
          {plans.map((plan) => (
            <motion.div
              key={plan.id}
              variants={cardVariants}
              className={`membership-card ${plan.badge ? 'featured' : ''}`}
              whileHover={{ y: -10 }}
            >
              {plan.badge && <div className="badge">{plan.badge}</div>}
              
              <h3>{plan.name}</h3>
              <div className="price">
                <span className="currency">$</span>
                <span className="amount">{plan.price}</span>
                <span className="period">/month</span>
              </div>

              <ul className="features">
                {plan.features.map((feature, index) => (
                  <li key={index}>
                    <Check size={20} color="#D4A017" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`btn ${plan.badge ? 'btn-primary' : 'btn-secondary'}`}
                onClick={() => navigate(`/membership/${plan.name.toLowerCase()}`)}
              >
                Get Started
              </motion.button>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
