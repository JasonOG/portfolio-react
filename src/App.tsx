// src/App.tsx (TEMPORARY MODIFICATION - All imports at top)
import React, { Suspense, lazy, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';

// Layout Components
// import Navbar from 'components/layout/Navbar'; // Temporarily disabled
// import Footer from 'components/layout/Footer'; // Temporarily disabled
import ScrollToTop from 'components/ui/ScrollToTop';
import LoadingSpinner from 'components/ui/LoadingSpinner';
import AnalyticsRouteTracker from 'components/analytics/AnalyticsRouteTracker';

// Analytics
import { initGA } from 'utils/analytics';

// Styles
import 'bootstrap/dist/css/bootstrap.min.css';
import 'styles/global.css';
import 'styles/theme.css';

// Lazy load page components (ALL AT THE TOP LIKE ESLINT DEMANDS)
const HomePage = lazy(() => import('pages/HomePage')); // Keep original for easy restore
const Temp404Page = lazy(() => import('pages/Temp404Page')); // Your new chaos page
const AboutPage = lazy(() => import('pages/AboutPage'));
const ProjectsPage = lazy(() => import('pages/ProjectsPage'));
const ContactPage = lazy(() => import('pages/ContactPage'));
const SuccessPage = lazy(() => import('pages/SuccessPage'));
const DashboardPage = lazy(() => import('pages/DashboardPage'));

const App: React.FC = () => {
  // Initialize Google Analytics
  useEffect(() => {
    initGA();
  }, []);

  return (
    <Router>
      <AnalyticsRouteTracker />
      {/* TEMPORARILY HIDE NAVBAR FOR FULL CHAOS EFFECT */}
      {/* <Navbar /> */}
      <ScrollToTop />
      <Suspense fallback={<LoadingSpinner />}>
        <AnimatePresence mode="wait">
          <Routes>
            {/* TEMPORARY: Replace HomePage with Temp404Page */}
            <Route path="/" element={<Temp404Page />} />
            
            {/* Keep all other routes normal (in case people bookmark them) */}
            <Route path="/about" element={<AboutPage />} />
            <Route path="/projects" element={<ProjectsPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/success" element={<SuccessPage />} />
            <Route path="/dashboard" element={<DashboardPage />} />
            
            {/* Emergency escape route - your original homepage */}
            <Route path="/real-home" element={<HomePage />} />
          </Routes>
        </AnimatePresence>
      </Suspense>
      {/* TEMPORARILY HIDE FOOTER TOO */}
      {/* <Footer /> */}
    </Router>
  );
};

export default App;
