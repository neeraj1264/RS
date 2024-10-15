// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import SubmissionForm from './components/SubmissionForm';
import LoginForm from './components/LoginForm';
import Video from './components/Video';
import ProtectedRoute from './components/ProtectedRoute';
import "./App.css"

function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<SubmissionForm />} />
          <Route path="/login" element={<LoginForm />} />
          <Route
          path="/video"
          element={
            <ProtectedRoute>
              <Video />
            </ProtectedRoute>
          }
        />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
