import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Clock, MapPin, DollarSign, Users as UsersIcon, Zap } from 'lucide-react';
import { servicesData } from '../data/servicesData';
import './ServiceDetail.css';

export default function ServiceDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const service = servicesData.find(s => s.id === parseInt(id));

  if (!service) {
    return (
      <div className="service-detail-error">
        <h2>Service not found</h2>
        <button onClick={() => navigate('/')}>Back to Home</button>
      </div>
    );
  }

  const IconComponent = service.icon;

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
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
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="service-detail-page"
    >
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="service-detail-header"
      >
        <button 
          className="back-button"
          onClick={() => {
            const element = document.getElementById('services');
            if (element) {
              element.scrollIntoView({ behavior: 'smooth' });
            } else {
              navigate('/');
            }
          }}
        >
          <ArrowLeft size={20} />
          <span>Back to Services</span>
        </button>
      </motion.div>

      {/* Main Content */}
      <div className="service-detail-container">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="service-hero"
        >
          <div className="service-hero-icon">
            <IconComponent size={80} color={service.color} />
          </div>
          <h1>{service.title}</h1>
          <p className="service-subtitle">{service.subtitle}</p>
        </motion.div>

        {/* Main Info Section */}
        <div className="service-content-wrapper">
          {/* Left Column - Description */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="service-left-column"
          >
            {/* Full Description */}
            <motion.div variants={itemVariants} className="service-section">
              <h2>About This Service</h2>
              <p>{service.fullDescription}</p>
            </motion.div>

            {/* Key Features */}
            <motion.div variants={itemVariants} className="service-section">
              <h3>Key Features</h3>
              <ul className="features-list">
                {service.features.map((feature, idx) => (
                  <li key={idx}>
                    <Zap size={18} color={service.color} />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Benefits */}
            <motion.div variants={itemVariants} className="service-section">
              <h3>Benefits</h3>
              <ul className="benefits-list">
                {service.benefits.map((benefit, idx) => (
                  <li key={idx}>
                    <span className="benefit-check">✓</span>
                    <span>{benefit}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          </motion.div>

          {/* Right Column - Details Card */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="service-right-column"
          >
            {/* Info Card */}
            <motion.div variants={itemVariants} className="service-info-card">
              <h3>Service Details</h3>

              <div className="info-item">
                <Clock size={20} color={service.color} />
                <div>
                  <label>Duration</label>
                  <p>{service.duration}</p>
                </div>
              </div>

              <div className="info-item">
                <MapPin size={20} color={service.color} />
                <div>
                  <label>Availability</label>
                  <p>{service.availability}</p>
                </div>
              </div>

              <div className="info-item">
                <DollarSign size={20} color={service.color} />
                <div>
                  <label>Pricing</label>
                  <p>{service.pricing}</p>
                </div>
              </div>

              <div className="info-item">
                <UsersIcon size={20} color={service.color} />
                <div>
                  <label>Recommended Frequency</label>
                  <p>{service.frequency}</p>
                </div>
              </div>
            </motion.div>

            {/* Trainers */}
            <motion.div variants={itemVariants} className="service-info-card">
              <h3>Our Coaches</h3>
              <div className="trainers-list">
                {service.trainers.map((trainer, idx) => (
                  <div key={idx} className="trainer-badge">
                    {trainer}
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Equipment */}
            <motion.div variants={itemVariants} className="service-info-card">
              <h3>Equipment</h3>
              <p>{service.equipment}</p>
            </motion.div>

            {/* Action Buttons */}
            <motion.div variants={itemVariants} className="service-actions">
              <button className="btn-primary" onClick={() => navigate('/booking')}>
                Book Now
              </button>
              <button className="btn-secondary" onClick={() => navigate('/faq')}>
                Get More Info
              </button>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}
