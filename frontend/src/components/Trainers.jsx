import { motion } from 'framer-motion';
import './Trainers.css';

export default function Trainers() {
  const trainers = [
    {
      id: 1,
      name: 'Alex',
      specialty: 'Strength Coach',
      image: 'https://pbs.twimg.com/profile_images/1975230895196913665/xedik9oN.jpg'
    },
    {
      id: 2,
      name: 'Mia',
      specialty: 'Yoga Instructor',
      image: 'https://demo.yolotheme.com/jhana/wp-content/uploads/2020/10/trainer-12.jpg'
    },
    {
      id: 3,
      name: 'Jake',
      specialty: 'Cardio Specialist',
      image: 'https://cdn.hexahealth.com/Image/webp/480x480/1724907819477-716516224.webp'
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
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.5 }
    }
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
          {trainers.map((trainer) => (
            <motion.div
              key={trainer.id}
              variants={cardVariants}
              className="trainer-card"
              whileHover={{ y: -10 }}
            >
              <div className="trainer-image">
                <img 
                  src={trainer.image} 
                  alt={trainer.name}
                  loading="lazy"
                />
                <div className="trainer-overlay">
                  <p>Expert Trainer</p>
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
