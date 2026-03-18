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
        </Routes>
      </div>
    </Router>
  );
}

export default App;
