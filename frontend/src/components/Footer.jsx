import { motion } from 'framer-motion';
import { Facebook, Instagram, Twitter, Mail, Phone } from 'lucide-react';
import './Footer.css';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    { icon: Facebook, label: 'Facebook', href: '#' },
    { icon: Instagram, label: 'Instagram', href: '#' },
    { icon: Twitter, label: 'Twitter', href: '#' }
  ];

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="footer-section"
          >
            <div className="footer-logo-section">
              <img 
                src="/assets/logo.png" 
                alt="FitPulse Sports Center" 
                className="footer-logo"
                onError={(e) => {
                  e.target.style.display = 'none';
                  const el = document.querySelector('.footer-brand-text');
                  if (el) el.style.display = 'block';
                }}
              />
              <h3 className="footer-brand-text">FitPulse</h3>
            </div>
            <p>Your ultimate gym experience with expert trainers and modern facilities.</p>
            <div className="social-links">
              {socialLinks.map((social) => {
                const IconComponent = social.icon;
                return (
                  <a key={social.label} href={social.href} aria-label={social.label}>
                    <IconComponent size={20} />
                  </a>
                );
              })}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
            className="footer-section"
          >
            <h4>Quick Links</h4>
            <ul>
              <li><a href="#about">About Us</a></li>
              <li><a href="#services">Services</a></li>
              <li><a href="#membership">Membership</a></li>
              <li><a href="#contact">Contact</a></li>
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
            className="footer-section"
          >
            <h4>Services</h4>
            <ul>
              <li><a href="#services">Personal Training</a></li>
              <li><a href="#services">Group Classes</a></li>
              <li><a href="#services">Cardio Programs</a></li>
              <li><a href="#services">Strength Training</a></li>
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            viewport={{ once: true }}
            className="footer-section"
          >
            <h4>Contact Info</h4>
            <ul className="contact-info">
              <li>
                <Mail size={18} />
                <a href="mailto:info@fitpulse.com">info@fitpulse.com</a>
              </li>
              <li>
                <Phone size={18} />
                <a href="tel:+1234567890">+1 (234) 567-890</a>
              </li>
            </ul>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          viewport={{ once: true }}
          className="footer-bottom"
        >
          <p>&copy; {currentYear} FitPulse. All rights reserved.</p>
        </motion.div>
      </div>
    </footer>
  );
}
