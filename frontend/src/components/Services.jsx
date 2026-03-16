import { motion } from 'framer-motion';
import { Dumbbell, Zap, Heart, Users } from 'lucide-react';
import './Services.css';

export default function Services() {
  const services = [
    {
      id: 1,
      title: 'Personal Training',
      description: 'Get customized workout plans tailored to your fitness goals with our certified trainers.',
      icon: Dumbbell,
      color: '#ff6b35'
    },
    {
      id: 2,
      title: 'Strength Training',
      description: 'Build muscle and increase your strength with our advanced equipment and expert guidance.',
      icon: Zap,
      color: '#ff6b35'
    },
    {
      id: 3,
      title: 'Cardio Programs',
      description: 'Improve your cardiovascular health with various cardio workouts and training programs.',
      icon: Heart,
      color: '#ff6b35'
    },
    {
      id: 4,
      title: 'Group Classes',
      description: 'Join our energetic group fitness classes and workout with a supportive community.',
      icon: Users,
      color: '#ff6b35'
    }
  ];

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
          {services.map((service) => {
            const IconComponent = service.icon;
            return (
              <motion.div
                key={service.id}
                variants={cardVariants}
                className="service-card"
                whileHover={{ y: -10, transition: { duration: 0.3 } }}
              >
                <div className="service-icon">
                  <IconComponent size={40} color={service.color} />
                </div>
                <h3>{service.title}</h3>
                <p>{service.description}</p>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
