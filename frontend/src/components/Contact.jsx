import React from 'react';
import '../styles/Contact.css'; 

function Contact() {
  return (
    <div className="contact">
      <h1>Contact Us</h1>
      <p>Have questions or need assistance? Reach out to us!</p>
      <form>
        <label>Name:</label>
        <input type="text" name="name" required />
        <br />
        <label>Email:</label>
        <input type="email" name="email" required />
        <br />
        <label>Message:</label>
        <textarea name="message" required />
        <br />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default Contact;
