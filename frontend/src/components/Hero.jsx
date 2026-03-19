import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import './Hero.css';

export default function Hero() {
  const navigate = useNavigate();
  const scrollToContact = () => {
    const contactSection = document.getElementById('contact');
    contactSection?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="hero" id="hero">
      <div className="hero-content">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="hero-text"
        >
          <motion.div 
            className="hero-logo-badge"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <img 
              src="/assets/logo.png" 
              alt="FitPulse Sports Center Gym" 
              className="hero-logo-img"
              onError={(e) => e.target.style.display = 'none'}
            />
          </motion.div>
          <h1>Reach Your Fitness Goals</h1>
          <p>Get in the best shape of your life with our expert trainers and a motivating environment to help you succeed.</p>
          
          <div className="hero-buttons">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="btn btn-primary"
              onClick={scrollToContact}
            >
              Join Now <ArrowRight size={20} />
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="btn btn-secondary"
              onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })}
            >
              Learn More
            </motion.button>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="hero-image"
        >
          <div className="image-placeholder">
            <img 
              src="https://media.istockphoto.com/id/1277242852/photo/holding-weight-and-sitting.jpg?s=612x612&w=0&k=20&c=3sy-VVhUYjABpNEMI2aoruXQuOVb__-AUR6BzOHoSJg=" 
              alt="Fit woman exercising"
              loading="lazy"
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
