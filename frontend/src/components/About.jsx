import { motion } from 'framer-motion';
import { CheckCircle } from 'lucide-react';
import './About.css';

export default function About() {
  const features = [
    { icon: '10+', text: 'Years Experience' },
    { icon: '500+', text: 'Happy Members' }
  ];

  return (
    <section className="about" id="about">
      <div className="container">
        <div className="about-grid">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="about-image"
          >
            <div className="about-logo-section">
              <img 
                src="/assets/logo.png" 
                alt="FitPulse Sports Center" 
                className="about-logo-img"
                onError={(e) => {
                  e.target.style.display = 'none';
                  const el = document.querySelector('.about-logo-fallback');
                  if (el) el.style.display = 'flex';
                }}
              />
              <div className="about-logo-fallback" style={{ display: 'none' }}>
                <img 
                  src="https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=500&h=400&fit=crop" 
                  alt="Gym interior"
                  loading="lazy"
                />
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="about-content"
          >
            <h2>About Us</h2>
            <p className="subtitle">Your Ultimate Gym Experience</p>
            
            <p className="description">
              Welcome to FitPulse! We offer top-notch facilities, expert trainers, and a motivating environment to help you achieve your fitness goals. Our state-of-the-art equipment and personalized training programs are designed to support your journey to success.
            </p>

            <div className="features">
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="feature"
                >
                  <CheckCircle color="#D4A017" size={24} />
                  <div>
                    <div className="feature-number">{feature.icon}</div>
                    <div className="feature-text">{feature.text}</div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
