import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './components/Home';
import Profile from './components/Profile';
import SlidingLoginForm from './components/SlidingLoginForm';
import ForgotPassword from './components/ForgotPassword.jsx';
import LearningModule from './components/LearningModule.js';
import Contact from './components/Contact';  
import FAQ from './components/FAQ';  
import Example from './components/example.jsx';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Profile" element={<Profile />} />
        <Route path="/modules" element={<LearningModule />} />
        <Route path="/login" element={<SlidingLoginForm />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/faq" element={<FAQ />} />
        <Route path="/example" element={<Example />} />
      </Routes>
    </Router>
  );
}

export default App;
