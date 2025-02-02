import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import All from './components/All';
import CreateFAQ from './components/Admin';
import './styles.css';  // Import the CSS file

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<CreateFAQ />} />
        <Route path="/all" element={<All />} />
      </Routes>
    </Router>
  );
}

export default App;
