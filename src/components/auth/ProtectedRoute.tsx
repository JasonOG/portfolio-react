import React, { useState, useEffect } from 'react';
import DashboardLogin from './DashboardLogin';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    // Check if user is authenticated (from localStorage)
    const authStatus = localStorage.getItem('dashboard_auth');
    setIsAuthenticated(authStatus === 'authenticated');
    setIsLoading(false);
  }, []);

  if (isLoading) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ height: '70vh' }}>
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  // If not authenticated, show login
  if (!isAuthenticated) {
    return <DashboardLogin onAuthenticated={() => setIsAuthenticated(true)} />;
  }

  // If authenticated, render children (the dashboard)
  return <>{children}</>;
};

export default ProtectedRoute;