import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  const isAuthenticated = localStorage.getItem('isLoggedIn'); // Check login status

  if (!isAuthenticated) {
    // If the user is not authenticated, redirect to the home page
    return <Navigate to="/" />;
  }

  // If the user is authenticated, render the child component (i.e., the video page)
  return children;
};

export default ProtectedRoute;
