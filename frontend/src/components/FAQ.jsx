import React, { useState } from 'react';
import '../styles/FAQ.css';  // Ensure this path correctly points to the styles folder

function FAQ() {
  const [openIndex, setOpenIndex] = useState(null);

  const faqs = [
    {
      question: 'Q: What is this app about?',
      answer: 'A: Our mission is to empower individuals through accessible and engaging American Sign Language (ASL) education. We strive to create an inclusive community where learners of all ages can develop their signing skills, foster cultural understanding, and promote effective communication. By providing innovative learning tools, interactive resources, and real-time feedback, we aim to enhance the ASL learning experience through Machine Learning, ensuring that every learner feels confident and supported on their journey to fluency.'
    },
    {
      question: 'Q: How can I reset my password?',
      answer: 'A: Click on the "Forgot Password" link on the login page to reset your password.'
    },
    {
      question: 'Q: Who can I contact for support?',
      answer: 'A: Please visit our Contact page to reach out to our support team.'
    },
    {
      question: 'Q: How do I earn badges?',
      answer: 'A: Earn badges by completing various levels and tasks within the app. Each achievement brings you one step closer to mastering ASL.'
    },
    {
      question: 'Q: How can I climb the leaderboard?',
      answer: 'A: Climb the leaderboard by consistently completing levels and replaying them to improve your skills and scores. The more you practice, the higher you rank!'
    },
    {
      question: 'Q: How do I complete each level?',
      answer: 'A: Complete each level by accurately following the hand movements displayed on the screen. Precision and practice are key to your success.'
    }
  ];

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="faq">
      <h1>Frequently Asked Questions</h1>
      {faqs.map((faq, index) => (
        <div
          key={index}
          className={`faq-item ${openIndex === index ? 'open' : ''}`}
          onClick={() => toggleFAQ(index)}
        >
          <div className="faq-question">
            <h3>{faq.question}</h3>
            <span className={`toggle-sign ${openIndex === index ? 'open' : ''}`}>{openIndex === index ? '-' : '+'}</span>
          </div>
          {openIndex === index && (
            <div className="faq-answer">
              <p>{faq.answer}</p>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

export default FAQ;
