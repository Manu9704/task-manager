import React, { createContext, useEffect, useMemo, useState } from 'react';
import { ThemeProvider, createTheme, CssBaseline } from '@mui/material';
import '@fontsource/poppins/400.css';
import '@fontsource/poppins/600.css';
import '@fontsource/inter/300.css';

export const ThemeContext = createContext();

export const ThemeProviderWrapper = ({ children }) => {
  
  const [mode, setMode] = useState(() => localStorage.getItem('theme') || 'light');

  useEffect(() => {
    localStorage.setItem('theme', mode);
  }, [mode]);

  const toggle = () => setMode(m => (m === 'light' ? 'dark' : 'light'));

   const theme = useMemo(() => createTheme({
    palette: {
      mode,
      primary: { main: mode === 'dark' ? '#7dd3fc' : '#0b66ff' },
      secondary: { main: mode === 'dark' ? '#9bffdd' : '#00c48c' },
      background: {
        default: mode === 'dark' ? '#071022' : '#f7fbff',
        paper: mode === 'dark' ? '#081427' : '#ffffff'
      },
      text: { primary: mode === 'dark' ? '#e6f3ff' : '#07203a' }
    },
    typography: {
      fontFamily: ['Poppins','Inter','Roboto','sans-serif'].join(','),
      h5: { fontWeight: 600 },
      body1: { fontSize: 15, lineHeight: 1.6 },
    },
    shape: { borderRadius: 14 },
    shadows: [
      'none',
      '0 6px 18px rgba(8,12,24,0.08)',
      '0 10px 30px rgba(8,12,24,0.10)',
      '0 18px 40px rgba(8,12,24,0.14)',
    ]
  }), [mode]);

  return (
    <ThemeContext.Provider value={{ mode, toggle }}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </ThemeContext.Provider>
  );
};
