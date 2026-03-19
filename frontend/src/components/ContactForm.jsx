import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { Send, CheckCircle, AlertCircle } from 'lucide-react';
import { submitContact } from '../services/api';
import './ContactForm.css';

export default function ContactForm() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: '',
      email: '',
      message: ''
    }
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    try {
      const response = await submitContact(data);
      setSubmitStatus({
        type: 'success',
        message: 'Thank you! Your message has been sent successfully. We\'ll get back to you soon!'
      });
      reset();
      
      // Navigate to contact section to show the success message
      const contactSection = document.querySelector('#contact');
      contactSection?.scrollIntoView({ behavior: 'smooth' });
      
      // Auto clear the success message after 5 seconds
      setTimeout(() => setSubmitStatus(null), 5000);
    } catch (error) {
      setSubmitStatus({
        type: 'error',
        message: error.message || 'Failed to send message. Please try again later.'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="contact" id="contact">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="section-header"
        >
          <h2>Get In Touch</h2>
          <p>Contact Us Today</p>
        </motion.div>

        <motion.form
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="contact-form"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="form-group">
            <input
              type="text"
              placeholder="Your Name"
              {...register('name', {
                required: 'Name is required',
                minLength: {
                  value: 2,
                  message: 'Name must be at least 2 characters'
                }
              })}
              className={errors.name ? 'error' : ''}
            />
            {errors.name && (
              <span className="error-message">{errors.name.message}</span>
            )}
          </div>

          <div className="form-group">
            <input
              type="email"
              placeholder="Your Email"
              {...register('email', {
                required: 'Email is required',
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: 'Please enter a valid email'
                }
              })}
              className={errors.email ? 'error' : ''}
            />
            {errors.email && (
              <span className="error-message">{errors.email.message}</span>
            )}
          </div>

          <div className="form-group">
            <textarea
              placeholder="Your Message"
              rows="5"
              {...register('message', {
                required: 'Message is required',
                minLength: {
                  value: 10,
                  message: 'Message must be at least 10 characters'
                }
              })}
              className={errors.message ? 'error' : ''}
            />
            {errors.message && (
              <span className="error-message">{errors.message.message}</span>
            )}
          </div>

          {submitStatus && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className={`status-message ${submitStatus.type}`}
            >
              {submitStatus.type === 'success' ? (
                <CheckCircle size={20} />
              ) : (
                <AlertCircle size={20} />
              )}
              <span>{submitStatus.message}</span>
            </motion.div>
          )}

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            disabled={isSubmitting}
            className="btn btn-submit"
            type="submit"
          >
            {isSubmitting ? 'Sending...' : (
              <>
                Send Message <Send size={20} />
              </>
            )}
          </motion.button>
        </motion.form>
      </div>
    </section>
  );
}
