import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import './Hero.css';

export default function Hero() {
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
              src="https://images.unsplash.com/photo-1517836357463-d25ddfcbf042?w=500&h=600&fit=crop" 
              alt="Fit woman exercising"
              loading="lazy"
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
