import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import LandingPage from './pages/LandingPage';
import AIChatbotPage from './pages/AIChatbotPage';
import AdminDashboardPage from './pages/AdminDashboardPage';

function App() {
  return (
    <Router>
      <div className="bg-iron-dark min-h-screen text-iron-light font-sans selection:bg-iron-gold selection:text-iron-dark">
        <Navbar />
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/career-companion" element={<AIChatbotPage />} />
          <Route path="/admin" element={<AdminDashboardPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
