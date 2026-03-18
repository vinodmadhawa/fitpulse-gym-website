import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, ChevronDown } from 'lucide-react';
import './FAQ.css';

export default function FAQ() {
  const navigate = useNavigate();
  const [expandedIndex, setExpandedIndex] = useState(null);

  const faqs = [
    {
      category: 'Membership',
      questions: [
        {
          q: 'What are the membership options available?',
          a: 'We offer several membership plans: Basic ($29/month), Pro ($59/month), Premium ($99/month), and Elite ($149/month). Each plan includes access to our gym, classes, and additional features. Check our Membership section for detailed comparisons.'
        },
        {
          q: 'Can I cancel my membership anytime?',
          a: 'Yes! You can cancel your membership anytime with 30 days notice. No hidden fees or long-term contracts. We want you to be happy with your membership.'
        },
        {
          q: 'Is there a trial period or day pass?',
          a: 'Absolutely! We offer a 3-day free trial for new members and day passes for $15. You can experience our facility, classes, and trainers before committing to a membership.'
        },
        {
          q: 'Are family plans available?',
          a: 'Yes! Family memberships are available at discounted rates. Get 20% off when you add a second family member, 30% off for 3+ members. Our family plans are flexible and can be customized.'
        },
        {
          q: 'Do you offer student discounts?',
          a: 'Yes! Students get 25% off any membership with a valid student ID. We also offer young professional rates (ages 18-26) with 20% discount.'
        }
      ]
    },
    {
      category: 'Training & Coaching',
      questions: [
        {
          q: 'How do I book a personal training session?',
          a: 'Click on "Book Your Session" or visit our Booking page. Select your trainer, preferred date/time, and fitness goals. Our team will confirm your booking within 24 hours. You can also call us at +1 (234) 567-8901.'
        },
        {
          q: 'What is the trainer scheduling process?',
          a: 'We match you with a trainer based on your goals and experience. Sessions are flexible and can be scheduled as frequently as you like (1-5+ times per week). We accommodate busy schedules with early morning, evening, and weekend options.'
        },
        {
          q: 'Can I switch trainers?',
          a: 'Absolutely! If you want to try a different trainer after a session or two, just let us know. We want you to find the trainer that is the best fit for your style and goals.'
        },
        {
          q: 'What should I bring to my first training session?',
          a: 'Bring water, towel, and workout clothes. We provide all equipment. Arrive 10-15 minutes early for your first session so we can discuss your goals and any injuries or limitations.'
        },
        {
          q: 'Do trainers provide nutritional guidance?',
          a: 'Yes! All personal training programs include basic nutritional guidance. For comprehensive meal plans and detailed dietary advice, we offer specialized nutrition coaching programs.'
        }
      ]
    },
    {
      category: 'Classes & Facilities',
      questions: [
        {
          q: 'What classes do you offer?',
          a: 'We offer Yoga, Pilates, Zumba, Spin, CrossFit-style training, Boxing, Kickboxing, and HIIT classes. Most classes are offered multiple times throughout the week. Check our schedule for times and instructors.'
        },
        {
          q: 'Can beginners join the classes?',
          a: 'Yes! We have classes for all fitness levels. Our instructors modify exercises for beginners. We recommend informing the instructor about your experience level so they can provide proper guidance.'
        },
        {
          q: 'Are there childcare services available?',
          a: 'We offer supervised childcare for children ages 3-12 during select hours (weekdays 9 AM-12 PM). The service is included with Premium and Elite memberships, $5/hour for other members.'
        },
        {
          q: 'What equipment do you have?',
          a: 'We have a full range of equipment including free weights (dumbbells, kettlebells, bars), machines, cardio equipment (treadmills, bikes, rowers, ellipticals), functional training equipment, and more.'
        },
        {
          q: 'What are your facility hours?',
          a: 'Monday-Friday: 5 AM - 10 PM, Saturday-Sunday: 7 AM - 8 PM. Holiday hours may vary. Check our Contact section or call for specific holiday schedules.'
        }
      ]
    },
    {
      category: 'Health & Safety',
      questions: [
        {
          q: 'Do I need medical clearance to join?',
          a: 'For most people, no. However, if you have pre-existing health conditions or haven\'t exercised recently, consult with your doctor first. During orientation, we collect health information for your safety.'
        },
        {
          q: 'What are the COVID-19 safety protocols?',
          a: 'We follow CDC guidelines including equipment sanitization, proper ventilation, and flexible class sizes. We encourage all members to stay home if sick and offer remote training options if needed.'
        },
        {
          q: 'How often am I required to renew my evaluation?',
          a: 'We recommend fitness assessments every 3-6 months to track progress and adjust your program. These are complimentary for our members.'
        },
        {
          q: 'Do you offer injury prevention consultations?',
          a: 'Yes! Our trainers are experts in proper form and injury prevention. Any member can request an injury assessment or prevention consultation at no extra charge.'
        },
        {
          q: 'What if I get injured at the gym?',
          a: 'We have trained staff and first aid kits available. We\'ll provide basic first aid and recommend seeking medical attention if needed. Incident reports are filed and insurance claims can be processed.'
        }
      ]
    },
    {
      category: 'Payments & Account',
      questions: [
        {
          q: 'What payment methods do you accept?',
          a: 'We accept credit/debit cards (Visa, Mastercard, Amex), bank transfer, and cash. Monthly memberships are billed on your membership date each month.'
        },
        {
          q: 'Can I pause my membership?',
          a: 'Yes! You can pause your membership for up to 3 months per year at no cost (with Pro membership or higher). This is perfect if you\'re traveling or need a temporary break.'
        },
        {
          q: 'What happens if I forget to renew?',
          a: 'We send email and SMS reminders before your billing date. If payment fails, we\'ll notify you immediately. Your membership will be paused if not resolved within 5 days.'
        },
        {
          q: 'Is there a joining fee?',
          a: 'No joining fees! We occasionally offer promotions (like 50% off first month), but we never charge hidden setup fees. What you see is what you pay.'
        },
        {
          q: 'Can I customize my membership?',
          a: 'Absolutely! You can mix and match features. Start with a base membership and add personal training packages, class bundles, or nutrition coaching as needed.'
        }
      ]
    }
  ];

  const toggleExpand = (index) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  let totalIndex = 0;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="faq-page"
    >
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="faq-header"
      >
        <button 
          className="back-button"
          onClick={() => navigate('/')}
        >
          <ArrowLeft size={20} />
          <span>Back Home</span>
        </button>
      </motion.div>

      {/* Main Content */}
      <div className="faq-container">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="faq-hero"
        >
          <h1>Frequently Asked Questions</h1>
          <p>Find answers to common questions about our gym, membership, trainers, and more.</p>
        </motion.div>

        {/* FAQ Sections */}
        <div className="faq-sections">
          {faqs.map((section, sectionIndex) => (
            <motion.div
              key={sectionIndex}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: sectionIndex * 0.1 }}
              className="faq-section"
            >
              <h2 className="section-title">{section.category}</h2>

              <div className="questions-list">
                {section.questions.map((item, itemIndex) => {
                  const arrayIndex = totalIndex++;
                  return (
                    <motion.div
                      key={arrayIndex}
                      className="faq-item"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.3, delay: itemIndex * 0.05 }}
                    >
                      <button
                        className="faq-question"
                        onClick={() => toggleExpand(arrayIndex)}
                      >
                        <span>{item.q}</span>
                        <ChevronDown
                          size={20}
                          className={`chevron ${expandedIndex === arrayIndex ? 'open' : ''}`}
                        />
                      </button>

                      <AnimatePresence>
                        {expandedIndex === arrayIndex && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.3 }}
                            className="faq-answer"
                          >
                            <p>{item.a}</p>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Still Have Questions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="faq-cta"
        >
          <h2>Still have questions?</h2>
          <p>Can't find the answer you're looking for? Our support team is here to help!</p>
          <div className="cta-buttons">
            <button 
              className="btn-primary"
              onClick={() => navigate('/#contact')}
            >
              Contact Us
            </button>
            <button 
              className="btn-secondary"
              onClick={() => navigate('/booking')}
            >
              Book a Consultation
            </button>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}
