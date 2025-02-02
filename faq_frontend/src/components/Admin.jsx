import React, { useState } from 'react';

function CreateFAQ() {
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent the default form submit behavior

    const newFAQ = { question, answer };

    fetch('http://localhost:5000/api/faqs', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newFAQ),
    })
      .then(response => response.json())
      .then(data => {
        // Reset the form fields after successful submission
        setQuestion('');
        setAnswer('');
        alert('FAQ created successfully!');
      })
      .catch(error => {
        console.error('Error creating FAQ:', error);
        alert('Failed to create FAQ. Please try again.');
      });
  };

  return (
    <div className="container">
      <h1 className="title">Create a New FAQ</h1>
      <form onSubmit={handleSubmit} className="faq-form">
        <div className="form-group">
          <label htmlFor="question" className="label">Question</label>
          <input
            type="text"
            id="question"
            className="input"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="answer" className="label">Answer</label>
          <textarea
            id="answer"
            className="textarea"
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
            required
          ></textarea>
        </div>
        <button type="submit" className="button">Submit</button>
      </form>
    </div>
  );
}

export default CreateFAQ;
