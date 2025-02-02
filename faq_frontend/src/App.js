import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './components/HomePage';
import CreateFAQ from './components/Admin';
import './styles.css';  // Import the CSS file

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<HomePage />} />
        <Route path="/create" element={<CreateFAQ />} />
      </Routes>
    </Router>
  );
}

export default App;
