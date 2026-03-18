import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Mail, Phone, Award, Star } from 'lucide-react';
import { trainersData } from '../data/trainersData';
import './TrainerDetail.css';

export default function TrainerDetail({ darkMode, setDarkMode }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const [trainer, setTrainer] = useState(null);

  useEffect(() => {
    const foundTrainer = trainersData.find(t => t.id === parseInt(id));
    setTrainer(foundTrainer);
    window.scrollTo(0, 0);
  }, [id]);

  if (!trainer) {
    return (
      <div className="trainer-not-found">
        <h2>Trainer not found</h2>
        <button onClick={() => navigate('/#trainers')}>Back to Trainers</button>
      </div>
    );
  }

  return (
    <div className={darkMode ? 'dark-mode' : 'light-mode'}>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="trainer-detail"
      >
        {/* Header with back button */}
        <div className="trainer-detail-header">
          <button
            className="back-button"
            onClick={() => navigate('/#trainers')}
          >
            <ArrowLeft size={24} />
            Back to Trainers
          </button>
        </div>

        {/* Main content */}
        <div className="trainer-detail-container">
          {/* Left side - Image */}
          <motion.div
            className="trainer-detail-image"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <img src={trainer.image} alt={trainer.name} />
            <div className="trainer-detail-badge">
              <Star size={20} />
              {trainer.specialty}
            </div>
          </motion.div>

          {/* Right side - Details */}
          <motion.div
            className="trainer-detail-content"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {/* Name and title */}
            <div className="trainer-detail-header-info">
              <h1>{trainer.name}</h1>
              <p className="specialty-title">{trainer.specialty}</p>
              <p className="experience">
                <strong>Experience:</strong> {trainer.experience}
              </p>
            </div>

            {/* Contact info */}
            <div className="contact-info-section">
              <div className="contact-item">
                <Mail size={20} />
                <a href={`mailto:${trainer.email}`}>{trainer.email}</a>
              </div>
              <div className="contact-item">
                <Phone size={20} />
                <a href={`tel:${trainer.phone}`}>{trainer.phone}</a>
              </div>
            </div>

            {/* About section */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="about-section"
            >
              <h2>About</h2>
              <p>{trainer.about}</p>
            </motion.div>

            {/* Certifications */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="certifications-section"
            >
              <h2>
                <Award size={20} />
                Certifications
              </h2>
              <div className="certifications-list">
                {trainer.certifications.map((cert, index) => (
                  <span key={index} className="certification-badge">
                    {cert}
                  </span>
                ))}
              </div>
            </motion.div>

            {/* Specialties */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="specialties-section"
            >
              <h2>Specialties</h2>
              <div className="specialties-grid">
                {trainer.specialties.map((spec, index) => (
                  <div key={index} className="specialty-item">
                    <span className="specialty-dot">●</span>
                    {spec}
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Approach */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7 }}
              className="approach-section"
            >
              <h2>Training Approach</h2>
              <p>{trainer.approach}</p>
            </motion.div>

            {/* Achievements */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
              className="achievements-section"
            >
              <h2>Achievements</h2>
              <ul className="achievements-list">
                {trainer.achievements.map((achievement, index) => (
                  <li key={index}>
                    <span className="achievement-icon">✓</span>
                    {achievement}
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Action buttons */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.9 }}
              className="action-buttons"
            >
              <button className="btn btn-primary">Book Session with {trainer.name.split(' ')[0]}</button>
              <button className="btn btn-secondary" onClick={() => navigate('/#contact')}>
                Send Message
              </button>
            </motion.div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}
