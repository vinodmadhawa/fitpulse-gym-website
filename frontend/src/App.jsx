import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import Services from './components/Services';
import Trainers from './components/Trainers';
import Membership from './components/Membership';
import ContactForm from './components/ContactForm';
import Footer from './components/Footer';
import TrainerDetail from './components/TrainerDetail';
import ServiceDetail from './components/ServiceDetail';
import Booking from './components/Booking';
import FAQ from './components/FAQ';
import MembershipDetail from './components/MembershipDetail';
import MembershipCheckout from './components/MembershipCheckout';
import MembershipConfirmation from './components/MembershipConfirmation';
import './styles/global.css';

function HomePage({ darkMode, setDarkMode }) {
  return (
    <>
      <Hero />
      <About />
      <Services />
      <Trainers />
      <Membership />
      <ContactForm />
      <Footer />
    </>
  );
}

function App() {
  const [darkMode, setDarkMode] = useState(true);

  useEffect(() => {
    // Load dark mode preference from localStorage
    const savedMode = localStorage.getItem('darkMode');
    if (savedMode !== null) {
      setDarkMode(JSON.parse(savedMode));
    }
  }, []);

  useEffect(() => {
    // Update document class and save preference
    if (darkMode) {
      document.documentElement.classList.remove('light-mode');
      document.body.classList.remove('light-mode');
    } else {
      document.documentElement.classList.add('light-mode');
      document.body.classList.add('light-mode');
    }
    localStorage.setItem('darkMode', JSON.stringify(darkMode));
  }, [darkMode]);

  return (
    <Router>
      <div className={darkMode ? 'dark-mode' : 'light-mode'}>
        <Header darkMode={darkMode} setDarkMode={setDarkMode} />
        <Routes>
          <Route path="/" element={<HomePage darkMode={darkMode} setDarkMode={setDarkMode} />} />
          <Route path="/trainer/:id" element={<TrainerDetail darkMode={darkMode} setDarkMode={setDarkMode} />} />
          <Route path="/service/:id" element={<ServiceDetail darkMode={darkMode} setDarkMode={setDarkMode} />} />
          <Route path="/booking" element={<Booking darkMode={darkMode} setDarkMode={setDarkMode} />} />
          <Route path="/faq" element={<FAQ darkMode={darkMode} setDarkMode={setDarkMode} />} />
          <Route path="/membership/confirmation/:planName" element={<MembershipConfirmation darkMode={darkMode} setDarkMode={setDarkMode} />} />
          <Route path="/membership/:planName/checkout" element={<MembershipCheckout darkMode={darkMode} setDarkMode={setDarkMode} />} />
          <Route path="/membership/:planName" element={<MembershipDetail darkMode={darkMode} setDarkMode={setDarkMode} />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
