import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { NavItem } from 'types';

const Navbar: React.FC = () => {
  const location = useLocation();
  const [activeLink, setActiveLink] = useState('/');
  const [isNavCollapsed, setIsNavCollapsed] = useState(true);

  // Update active link when location changes and close mobile menu
  useEffect(() => {
    setActiveLink(location.pathname);
    setIsNavCollapsed(true); // Close the menu when location changes
  }, [location]);

  const handleNavCollapse = () => setIsNavCollapsed(!isNavCollapsed);

  const navItems: NavItem[] = [
    { id: 'home', title: 'Home', path: '/' },
    { id: 'about', title: 'About Me', path: '/about' },
    { id: 'projects', title: 'Projects', path: '/projects' },
    { id: 'contact', title: 'Contact Me', path: '/contact' }
  ];

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light shadow p-3 mb-5">
      <div className="container-fluid">
        {/* Make logo and name clickable links to home */}
        <Link to="/" className="navbar-brand d-flex align-items-center">
          <img src="/images/brain4.svg" alt="Brain Logo" width="60" height="60" className="d-inline-block align-middle me-2" />
          <span className="navbar-link">Jason O'Grady</span>
        </Link>
        
        <button 
          className="navbar-toggler" 
          type="button" 
          data-bs-toggle="collapse" 
          data-bs-target="#navbarTogglerDemo03" 
          aria-controls="navbarTogglerDemo03" 
          aria-expanded={!isNavCollapsed ? true : false} 
          aria-label="Toggle navigation"
          onClick={handleNavCollapse}
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        
        <div className={`${isNavCollapsed ? 'collapse' : ''} navbar-collapse`} id="navbarTogglerDemo03">
          <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
            {navItems.map((item) => (
              <li key={item.id} id={item.id} className="nav-item">
                <Link 
                  className={`nav-link ${activeLink === item.path ? 'active' : ''}`} 
                  aria-current={activeLink === item.path ? 'page' : undefined} 
                  to={item.path}
                  onClick={() => setIsNavCollapsed(true)} // Close menu when link is clicked
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