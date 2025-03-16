import React from 'react';
import { motion } from 'framer-motion';
import ContactForm from 'components/forms/ContactForm';

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

const ContactPage: React.FC = () => {
  return (
    <motion.div
      initial="initial"
      animate="in"
      exit="out"
      variants={pageVariants}
      transition={pageTransition}
    >
      <section id="Contact Me">
        <div>
          <div className="col-md-12" style={{ textAlign: 'center' }}>
            <h1>Contact Me.</h1>
            <h4>I'd love to hear from you.</h4>
            <p className="p2">
              If you'd like to reach out professionally or you just have some questions about technology in general, 
              I would be delighted to help you!
            </p>
          </div>

          <div className="container mt-5">
            <ContactForm />
          </div>
        </div>
      </section>
    </motion.div>
  );
};

export default ContactPage;