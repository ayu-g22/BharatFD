import React, { useEffect, useState } from 'react';

function HomePage() {
  const [faqs, setFaqs] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5000/api/faqs')
      .then(response => response.json())
      .then(data => setFaqs(data))
      .catch(error => console.error('Error fetching FAQs:', error));
  }, []);

  return (
    <div className="container">
      <h1 className="title">FAQs</h1>
      <ul className="faq-list">
        {faqs.length > 0 ? (
          faqs.map(faq => (
            <li key={faq._id} className="faq-item">
              <h2 className="faq-question">{faq.question}</h2>
              <p className="faq-answer">{faq.answer}</p>
            </li>
          ))
        ) : (
          <p>No FAQs available</p>
        )}
      </ul>
    </div>
  );
}

export default HomePage;
