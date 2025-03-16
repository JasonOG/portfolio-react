import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { NavItem } from 'types';

const Navbar: React.FC = () => {
  const location = useLocation();
  const [activeLink, setActiveLink] = useState('/');

  useEffect(() => {
    setActiveLink(location.pathname);
  }, [location]);

  const navItems: NavItem[] = [
    { id: 'home', title: 'Home', path: '/' },
    { id: 'about', title: 'About Me', path: '/about' },
    { id: 'projects', title: 'Projects', path: '/projects' },
    { id: 'contact', title: 'Contact Me', path: '/contact' }
  ];

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light shadow p-3 mb-5">
      <div className="container-fluid">
        <img src="/images/brain4.svg" alt="" width="60" height="24" className="d-inline-block align-right" />
        <span className="navbar-link">Jason O'Grady</span>
        <button 
          className="navbar-toggler" 
          type="button" 
          data-bs-toggle="collapse" 
          data-bs-target="#navbarTogglerDemo03" 
          aria-controls="navbarTogglerDemo02" 
          aria-expanded="false" 
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarTogglerDemo03">
          <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
            {navItems.map((item) => (
              <li key={item.id} id={item.id} className="nav-item">
                <Link 
                  className={`nav-link ${activeLink === item.path ? 'active' : ''}`} 
                  aria-current={activeLink === item.path ? 'page' : undefined} 
                  to={item.path}
                >
                  {item.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;