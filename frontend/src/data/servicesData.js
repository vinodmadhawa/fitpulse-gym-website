import { Dumbbell, Zap, Heart, Users } from 'lucide-react';

export const servicesData = [
  {
    id: 1,
    title: 'Personal Training',
    subtitle: 'One-on-One Expert Coaching',
    icon: Dumbbell,
    color: '#D4A017',
    description: 'Get customized workout plans tailored to your fitness goals with our certified trainers.',
    fullDescription: 'Our personal training program is designed to help you achieve your fitness goals faster and more effectively. Whether you\'re a beginner looking to start your fitness journey or an advanced athlete seeking to break through plateaus, our certified trainers will create a personalized plan just for you.',
    features: [
      'Custom workout plans designed for your goals',
      'One-on-one coaching and form correction',
      'Flexible scheduling to fit your lifestyle',
      'Progress tracking and adjustments',
      'Nutritional guidance included',
      'Accountability and motivation support'
    ],
    benefits: [
      'Achieve results 40% faster than solo training',
      'Prevent injuries with proper form guidance',
      'Stay motivated with professional support',
      'Customize workouts to your preferences and needs',
      'Get expert advice on nutrition and recovery'
    ],
    duration: '30, 45, or 60 minute sessions',
    availability: 'Monday - Sunday, 6 AM - 9 PM',
    pricing: 'Starting at $50 per session',
    trainers: ['Alex Johnson', 'Mia Chen', 'Jake Martinez'],
    frequency: 'Flexible - 1 to 5 times per week',
    equipment: 'All gym equipment available',
    contact: 'Contact our coaches to start your journey'
  },
  {
    id: 2,
    title: 'Strength Training',
    subtitle: 'Build Muscle & Power',
    icon: Zap,
    color: '#D4A017',
    description: 'Build muscle and increase your strength with our advanced equipment and expert guidance.',
    fullDescription: 'Transform your body with our comprehensive strength training program. Using progressive overload techniques and scientific training principles, you\'ll build lean muscle, increase bone density, and boost your metabolism. Our state-of-the-art equipment and expert coaches ensure proper form and maximum results.',
    features: [
      'Periodized training programs',
      'Advanced strength protocols (5x5, 3x3, AMRAP)',
      'Olympic lifting coaching available',
      'Accessory work for balanced development',
      'Performance metrics tracking',
      'Recovery and mobility work included'
    ],
    benefits: [
      'Increase muscle mass by 10-15 lbs in 12 weeks',
      'Boost metabolism and burn more calories',
      'Improve bone density and joint health',
      'Functional strength for daily activities',
      'Build confidence and body positivity'
    ],
    duration: 'Group classes: 60 minutes | Personal: 45-60 minutes',
    availability: 'Monday - Friday, 5 AM - 9 PM | Weekend, 7 AM - 6 PM',
    pricing: 'Group classes: $15/class | Personal training: $60/session',
    trainers: ['Alex Johnson', 'Jake Martinez'],
    frequency: '3-5 times per week recommended',
    equipment: 'Barbells, dumbbells, kettlebells, cables, machines',
    contact: 'Join our strength community today'
  },
  {
    id: 3,
    title: 'Cardio Programs',
    subtitle: 'Improve Heart Health & Endurance',
    icon: Heart,
    color: '#D4A017',
    description: 'Improve your cardiovascular health with various cardio workouts and training programs.',
    fullDescription: 'Elevate your cardiovascular fitness with our expertly designed cardio programs. From HIIT (High Intensity Interval Training) to steady-state cardio and endurance conditioning, we offer diverse workouts to improve your heart health, increase stamina, and burn calories. All fitness levels welcome.',
    features: [
      'HIIT (High Intensity Interval Training)',
      'Steady-state cardio options',
      'Functional cardio circuits',
      'Endurance training programs',
      'Indoor cycling classes',
      'Treadmill and rowing machine training'
    ],
    benefits: [
      'Lower resting heart rate and blood pressure',
      'Improve aerobic capacity and endurance',
      'Burn 300-600 calories per session',
      'Reduce risk of heart disease',
      'Boost mood and mental clarity',
      'Increase energy levels throughout the day'
    ],
    duration: '30 or 45 minute classes',
    availability: 'Daily, 6 AM - 8 PM with multiple time slots',
    pricing: 'Group classes: $12/class or $99/month unlimited',
    trainers: ['Mia Chen', 'Jake Martinez'],
    frequency: '3-5 times per week recommended',
    equipment: 'Treadmills, rowing machines, assault bikes, jump ropes, Step Mills',
    contact: 'Start your cardio journey with us'
  },
  {
    id: 4,
    title: 'Group Classes',
    subtitle: 'Fitness in a Community',
    icon: Users,
    color: '#D4A017',
    description: 'Join our energetic group fitness classes and workout with a supportive community.',
    fullDescription: 'Experience the power of community fitness with our dynamic group classes. From yoga and Pilates to Zumba and CrossFit-style workouts, our diverse class offerings cater to every fitness level and preference. Train alongside like-minded individuals and stay motivated by the energy of the group.',
    features: [
      'Yoga & Flexibility classes',
      'Pilates for core strength',
      'Zumba fitness and dance cardio',
      'CrossFit-style functional training',
      'Spin cycling classes',
      'Boxing and kickboxing bootcamp'
    ],
    benefits: [
      'Stay motivated with group energy',
      'Make friends with fitness-minded people',
      'Instructor guidance for all fitness levels',
      'Affordable group rates',
      'Variety prevents boredom',
      'Strong sense of community and support'
    ],
    duration: '45 or 60 minute classes',
    availability: 'Multiple classes daily throughout the week',
    pricing: 'Drop-in: $15 | Unlimited monthly: $89 | 10 classes: $120',
    trainers: ['Alex Johnson', 'Mia Chen', 'Jake Martinez'],
    frequency: 'Mix and match classes throughout the week',
    equipment: 'Yoga mats, dumbbells, resistance bands, boxes, rowers',
    contact: 'Check our schedule and join a class'
  }
];
