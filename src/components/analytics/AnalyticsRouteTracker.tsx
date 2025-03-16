import React from 'react';
import useAnalytics from 'hooks/useAnalytics';

/**
 * Component to track route changes for analytics
 * Simply include this component once in your app, and it will track all page views
 */
const AnalyticsRouteTracker: React.FC = () => {
  useAnalytics();
  return null; // This component doesn't render anything
};

export default AnalyticsRouteTracker;