import React, { useState } from 'react';
import { addDoc, collection } from 'firebase/firestore';
import { db } from '../firebase';
import '../styles/Contact.css'; 
import ContactImage from '../contact.jpeg'; 
import Footer from './Footer';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addDoc(collection(db, 'contactMessages'), formData);
      alert('Message sent successfully!');
      setFormData({ name: '', email: '', message: '' });
    } catch (error) {
      console.error('Error sending message: ', error);
      alert('Failed to send message. Please check your Firebase rules and permissions.');
    }
  };
  

  return (
    <>
    <div className="contact-container">
      {/* left img section */}
      <div className="contact-image">
        <img src={ContactImage} alt="Contact" />
      </div>

      {/* right contact form section */}
      <div className="contact-form-container">
        <h1>Contact Us</h1>
        <form onSubmit={handleSubmit}>
          <label className='namebox'>Name</label>
          <input
            className='namebox'
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />

          <label className='emailbox'>Email</label>
          <input
            className='emailbox'
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />

          <label>Message</label>
          <textarea
            className='msgbox'
            name="message"
            rows="5"
            value={formData.message}
            onChange={handleChange}
            required
          />

          <button type="submit">Submit</button>
        </form>
      </div>
    </div>
    <Footer/>
    </>
  );
};

export default Contact;
