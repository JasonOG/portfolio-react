import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { trackPageView } from 'utils/analytics';

/**
 * Hook to track page views
 * This hook will track page views when the user navigates between pages
 */
const useAnalytics = (): void => {
  const location = useLocation();

  useEffect(() => {
    // Track page view whenever the location changes
    trackPageView(location.pathname);
  }, [location]);
};

export default useAnalytics;