import React, { useState } from 'react';
import { motion } from 'framer-motion';

interface DashboardLoginProps {
  onAuthenticated: () => void;
}

const DashboardLogin: React.FC<DashboardLoginProps> = ({ onAuthenticated }) => {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  // The correct password - in a real app, this would be handled securely on a server
  // For this implementation, we'll use a simple password
  const DASHBOARD_PASSWORD = 'researchadmin2025';

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (password === DASHBOARD_PASSWORD) {
      // Store authentication state in localStorage
      localStorage.setItem('dashboard_auth', 'authenticated');
      onAuthenticated();
    } else {
      setError('Invalid password. Please try again.');
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ type: 'tween', ease: 'anticipate', duration: 0.5 }}
    >
      <div className="container mt-5">
        <div className="row justify-content-center">
          <div className="col-md-6">
            <div className="card shadow">
              <div className="card-body p-4">
                <h2 className="text-center mb-4">Research Dashboard</h2>
                <p className="text-center text-muted mb-4">This area is restricted. Please enter the password to continue.</p>
                
                <form onSubmit={handleSubmit}>
                  {error && (
                    <div className="alert alert-danger" role="alert">
                      {error}
                    </div>
                  )}
                  
                  <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input
                      type="password"
                      className="form-control"
                      id="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Enter password"
                      required
                    />
                  </div>
                  
                  <div className="d-grid">
                    <button 
                      type="submit" 
                      className="btn btn-primary"
                    >
                      Access Dashboard
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default DashboardLogin;