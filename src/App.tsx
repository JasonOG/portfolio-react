import React, { Suspense, lazy, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';

// Styles
import 'bootstrap/dist/css/bootstrap.min.css';
import 'styles/global.css';
import 'styles/theme.css';

// Layout Components
import Navbar from 'components/layout/Navbar';
import Footer from 'components/layout/Footer';
import ScrollToTop from 'components/ui/ScrollToTop';
import LoadingSpinner from 'components/ui/LoadingSpinner';
import AnalyticsRouteTracker from 'components/analytics/AnalyticsRouteTracker';

// Analytics
import { initGA } from 'utils/analytics';

// Lazy load page components
const HomePage = lazy(() => import('pages/HomePage'));
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
      <Navbar />
      <ScrollToTop />
      <Suspense fallback={<LoadingSpinner />}>
        <AnimatePresence mode="wait">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/projects" element={<ProjectsPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/success" element={<SuccessPage />} />
            {/* Hidden route - not in navbar */}
            <Route path="/dashboard" element={<DashboardPage />} />
          </Routes>
        </AnimatePresence>
      </Suspense>
      <Footer />
    </Router>
  );
};

export default App;