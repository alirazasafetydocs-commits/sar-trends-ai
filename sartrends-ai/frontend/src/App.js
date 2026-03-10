import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import ResumeGenerator from './pages/ResumeGenerator';
import CoverLetterGenerator from './pages/CoverLetterGenerator';
import HSEDocuments from './pages/HSEDocuments';
import WebsiteBuilder from './pages/WebsiteBuilder';
import Documents from './pages/Documents';
import Payment from './pages/Payment';
import Profile from './pages/Profile';
import Navbar from './components/Navbar';

function PrivateRoute({ children }) {
  const { user, loading } = useAuth();
  
  if (loading) {
    return (
      <div className="min-h-screen bg-dark-900 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }
  
  return user ? children : <Navigate to="/login" />;
}

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen bg-dark-900">
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/" element={
              <PrivateRoute>
                <Navbar />
                <Dashboard />
              </PrivateRoute>
            } />
            <Route path="/resume" element={
              <PrivateRoute>
                <Navbar />
                <ResumeGenerator />
              </PrivateRoute>
            } />
            <Route path="/cover-letter" element={
              <PrivateRoute>
                <Navbar />
                <CoverLetterGenerator />
              </PrivateRoute>
            } />
            <Route path="/hse" element={
              <PrivateRoute>
                <Navbar />
                <HSEDocuments />
              </PrivateRoute>
            } />
            <Route path="/website" element={
              <PrivateRoute>
                <Navbar />
                <WebsiteBuilder />
              </PrivateRoute>
            } />
            <Route path="/documents" element={
              <PrivateRoute>
                <Navbar />
                <Documents />
              </PrivateRoute>
            } />
            <Route path="/payment" element={
              <PrivateRoute>
                <Navbar />
                <Payment />
              </PrivateRoute>
            } />
            <Route path="/profile" element={
              <PrivateRoute>
                <Navbar />
                <Profile />
              </PrivateRoute>
            } />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;

