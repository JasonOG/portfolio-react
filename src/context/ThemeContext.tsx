import React, { createContext, useState, useEffect, useContext } from 'react';

// Define the theme types
type Theme = 'light' | 'dark';

// Define the context type
interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
}

// Create the context with a default value
const ThemeContext = createContext<ThemeContextType>({
  theme: 'light',
  toggleTheme: () => {},
});

// Custom hook to use the theme context
export const useTheme = () => useContext(ThemeContext);

interface ThemeProviderProps {
  children: React.ReactNode;
}

// Theme provider component
export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  // Check if user has a theme preference in localStorage or prefer-color-scheme
  const getInitialTheme = (): Theme => {
    // Check if we're in the browser environment
    if (typeof window !== 'undefined') {
      // Check localStorage first
      const storedTheme = localStorage.getItem('theme') as Theme | null;
      if (storedTheme) {
        return storedTheme;
      }
      
      // Check user's system preference
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      return prefersDark ? 'dark' : 'light';
    }
    
    // Default to light theme if not in browser
    return 'light';
  };

  const [theme, setTheme] = useState<Theme>(getInitialTheme);

  // Update the html class and localStorage when theme changes
  useEffect(() => {
    const root = window.document.documentElement;
    
    // Remove the previous theme class
    root.classList.remove('light-theme', 'dark-theme');
    // Add the new theme class
    root.classList.add(`${theme}-theme`);
    
    // Store the theme preference in localStorage
    localStorage.setItem('theme', theme);
  }, [theme]);

  // Toggle between light and dark themes
  const toggleTheme = () => {
    setTheme(prevTheme => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};