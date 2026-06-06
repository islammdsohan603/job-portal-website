'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import { HeroUIProvider } from '@heroui/react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ThemeContext = createContext({
  theme: 'dark',
  toggleTheme: () => {},
});

function applyTheme(nextTheme) {
  document.documentElement.setAttribute('data-theme', nextTheme);
  document.documentElement.classList.toggle('dark', nextTheme === 'dark');
}

function saveTheme(nextTheme) {
  localStorage.setItem('theme', nextTheme);
  document.cookie = `theme=${nextTheme}; path=/; max-age=31536000; samesite=lax`;
}

export function useTheme() {
  return useContext(ThemeContext);
}

export default function Providers({ children, initialTheme = 'dark' }) {
  const [theme, setTheme] = useState(() => {
    if (typeof window === 'undefined') {
      return initialTheme;
    }

    return localStorage.getItem('theme') || initialTheme;
  });

  useEffect(() => {
    applyTheme(theme);
    saveTheme(theme);
  }, [theme]);

  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
    applyTheme(newTheme);
    saveTheme(newTheme);
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <HeroUIProvider>
        {children}
        <ToastContainer theme={theme} position="top-right" />
      </HeroUIProvider>
    </ThemeContext.Provider>
  );
}
