import ReactGA from 'react-ga4';

// Replace with your Google Analytics measurement ID
const TRACKING_ID = 'G-XXXXXXXXXX';

/**
 * Initialize Google Analytics
 */
export const initGA = (): void => {
  if (process.env.NODE_ENV === 'production') {
    ReactGA.initialize(TRACKING_ID);
  } else {
    console.log('GA initialized in development mode - tracking disabled');
  }
};

/**
 * Track a page view
 * @param path - The path of the page
 * @param title - The title of the page
 */
export const trackPageView = (path: string, title?: string): void => {
  if (!path) return;
  
  const pageView = {
    page_path: path,
    page_title: title || document.title
  };
  
  if (process.env.NODE_ENV === 'production') {
    ReactGA.send(pageView);
  } else {
    console.log('Page tracked:', pageView);
  }
};

/**
 * Track an event
 * @param category - The category of the event
 * @param action - The action of the event
 * @param label - Optional label for the event
 * @param value - Optional value for the event
 */
export const trackEvent = (
  category: string,
  action: string,
  label?: string,
  value?: number
): void => {
  if (process.env.NODE_ENV === 'production') {
    ReactGA.event({
      category,
      action,
      label,
      value
    });
  } else {
    console.log('Event tracked:', { category, action, label, value });
  }
};