import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate, useLocation } from 'react-router-dom';
import { Menu, X, Moon, Sun } from 'lucide-react';
import './Header.css';

export default function Header({ darkMode, setDarkMode }) {
  const navigate = useNavigate();
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Home', href: '#hero' },
    { label: 'About', href: '#about' },
    { label: 'Services', href: '#services' },
    { label: 'Trainers', href: '#trainers' },
    { label: 'Membership', href: '#membership' },
    { label: 'Contact', href: '#contact' }
  ];

  const handleNavClick = (href) => {
    setIsMenuOpen(false);
    
    // If we're on home page, just scroll to the section
    if (location.pathname === '/') {
      const element = document.querySelector(href);
      element?.scrollIntoView({ behavior: 'smooth' });
    } else {
      // If on a detail page, navigate to home with the hash
      navigate(`/${href}`);
    }
  };

  return (
    <motion.header
      className={`header ${isScrolled ? 'scrolled' : ''}`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="header-container">
<div className="header-brand">
        <motion.div
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5 }}
          className="logo-container"
          onClick={() => {
            setIsMenuOpen(false);
            navigate('/');
          }}
        >
          <img 
            src="/assets/logo.png" 
            alt="FitPulse Sports Center" 
            className="logo"
            onError={(e) => {
              e.target.style.display = 'none';
            }}
          />
          <span className="brand-name">FitPulse</span>
        </motion.div>
        </div>

        {/* Desktop Navigation */}
        <nav className="nav-desktop">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={(e) => {
                e.preventDefault();
                handleNavClick(link.href);
              }}
              className="nav-link"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Controls */}
        <div className="header-controls">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            className="theme-toggle"
            onClick={() => setDarkMode(!darkMode)}
            aria-label="Toggle theme"
          >
            {darkMode ? <Sun size={24} /> : <Moon size={24} />}
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            className="menu-toggle"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </motion.button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <motion.nav
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
          className="nav-mobile"
        >
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={(e) => {
                e.preventDefault();
                handleNavClick(link.href);
              }}
              className="nav-link-mobile"
            >
              {link.label}
            </a>
          ))}
        </motion.nav>
      )}
    </motion.header>
  );
}
