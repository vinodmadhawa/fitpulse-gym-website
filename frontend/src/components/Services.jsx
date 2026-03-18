import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { servicesData } from '../data/servicesData';
import './Services.css';

export default function Services() {
  const navigate = useNavigate();

  const handleServiceClick = (serviceId) => {
    navigate(`/service/${serviceId}`);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1
      }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 }
    }
  };

  return (
    <section className="services" id="services">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="section-header"
        >
          <h2>Our Services</h2>
          <p>What We Offer</p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="services-grid"
        >
          {servicesData.map((service) => {
            const IconComponent = service.icon;
            return (
              <motion.div
                key={service.id}
                variants={cardVariants}
                className="service-card"
                whileHover={{ y: -10, transition: { duration: 0.3 } }}
                onClick={() => handleServiceClick(service.id)}
                style={{ cursor: 'pointer' }}
              >
                <div className="service-icon">
                  <IconComponent size={40} color={service.color} />
                </div>
                <h3>{service.title}</h3>
                <p>{service.description}</p>
                <div className="service-overlay">
                  <span>View Details</span>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
