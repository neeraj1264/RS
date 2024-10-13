// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import SubmissionForm from './components/SubmissionForm';
import LoginForm from './components/LoginForm';
import Video from './components/Video';

function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<SubmissionForm />} />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/video" element={<Video />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
