import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

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

const SuccessPage: React.FC = () => {
  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <motion.div
      initial="initial"
      animate="in"
      exit="out"
      variants={pageVariants}
      transition={pageTransition}
    >
      <section id="Success">
        <div>
          <div className="col-md-12" style={{ textAlign: 'center' }}>
            <h1>Success!</h1>
            <h4>Thanks for getting in touch.</h4>
            <p className="p2">I'll be getting back to you very soon.</p>
            <Link to="/">
              <button type="button" className="shadow btn btn-primary rounded-pill btn-lg">
                <i className="fas fa-home"></i> Back to Home
              </button>
            </Link>
          </div>
        </div>
      </section>
    </motion.div>
  );
};

export default SuccessPage;