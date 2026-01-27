import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Squad from './pages/Squad';
import Matches from './pages/Matches';
import News from './pages/News';

function AppContent() {
  const location = useLocation();

  return (
    <div className="app flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow pt-20">
        <AnimatePresence mode='wait'>
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<Home />} />
            <Route path="/squad" element={<Squad />} />
            <Route path="/matches" element={<Matches />} />
            <Route path="/news" element={<News />} />
          </Routes>
        </AnimatePresence>
      </main>
      <Footer />
    </div>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;
