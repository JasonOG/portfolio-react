import React from 'react';
import { motion } from 'framer-motion';
import ResearchPapersDashboard from 'components/dashboard/ResearchPapersDashboard';
import SEO from 'components/seo/SEO';
import ProtectedRoute from 'components/auth/ProtectedRoute';

// Animation variants
const pageVariants = {
  initial: { opacity: 0, y: 20 },
  in: { opacity: 1, y: 0 },
  out: { opacity: 0, y: -20 }
};

const pageTransition = {
  type: 'tween',
  ease: 'anticipate',
  duration: 0.5
};

const DashboardPage: React.FC = () => {
  return (
    <motion.div
      initial="initial"
      animate="in"
      exit="out"
      variants={pageVariants}
      transition={pageTransition}
    >
      <SEO 
        title="Jason O'Grady | Honours Thesis Research Dashboard"
        description="Private research dashboard for managing academic papers"
        canonicalUrl="/dashboard"
      />
      <section>
        <div className="container-fluid">
          <ProtectedRoute>
            <ResearchPapersDashboard />
          </ProtectedRoute>
        </div>
      </section>
    </motion.div>
  );
};

export default DashboardPage;