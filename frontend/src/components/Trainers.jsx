import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { trainersData } from '../data/trainersData';
import './Trainers.css';

export default function Trainers() {
  const navigate = useNavigate();

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
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.5 }
    }
  };

  const handleTrainerClick = (trainerId) => {
    navigate(`/trainer/${trainerId}`);
  };

  return (
    <section className="trainers" id="trainers">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="section-header"
        >
          <h2>Meet Our Trainers</h2>
          <p>Our Fitness Experts</p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="trainers-grid"
        >
          {trainersData.map((trainer) => (
            <motion.div
              key={trainer.id}
              variants={cardVariants}
              className="trainer-card"
              whileHover={{ y: -10 }}
              onClick={() => handleTrainerClick(trainer.id)}
              style={{ cursor: 'pointer' }}
            >
              <div className="trainer-image">
                <img 
                  src={trainer.image} 
                  alt={trainer.name}
                  loading="lazy"
                />
                <div className="trainer-overlay">
                  <p>View Profile</p>
                </div>
              </div>
              <div className="trainer-info">
                <h3>{trainer.name}</h3>
                <p>{trainer.specialty}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
