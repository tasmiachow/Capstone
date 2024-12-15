import React from 'react';
import '../styles/Contact.css'; 
import ContactImage from '../contact.jpeg'; // Ensure the image is in your assets folder

function Contact() {
  return (
    <div className="contact-container">
      {/* left img section */}
      <div className="contact-image">
        <img src={ContactImage} alt="Contact" />
      </div>

      {/* right contact form section */}
      <div className="contact-form-container">
        <h1>Contact Us</h1>
        <form>
          <label className='namebox'>Name</label>
          <input className='namebox' type="text" name="name" required />

          <label className='emailbox' >Email</label>
          <input className='emailbox' type="email" name="email" required />

          <label >Message</label>
          <textarea className='msgbox' name="message" rows="5" required />

          <button type="submit">Submit</button>
        </form>
      </div>
    </div>
  );
}

export default Contact;
