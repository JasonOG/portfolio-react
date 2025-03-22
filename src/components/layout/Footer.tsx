import React from 'react';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
  return (
    <>
      <div className="footer-padding"></div>
      <div className="footer col-md-12" style={{ textAlign: 'center' }}>
        <a href="https://www.linkedin.com/in/jasonog/" target="_blank" rel="noopener noreferrer">
          <i className="icon fab fa-linkedin fa-2x"></i>
        </a>
        <a href="https://github.com/JasonOG" target="_blank" rel="noopener noreferrer">
          <i className="icon fab fa-github-square fa-2x"></i>
        </a>
        <Link to="/contact">
          <i className="icon fas fa-envelope fa-2x"></i>
        </Link>
        <p>© Copyright 2020 Jason O'Grady</p>
      </div>
    </>
  );
};

export default Footer;