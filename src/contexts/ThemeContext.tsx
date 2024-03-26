import React from 'react';


export const ThemeContext = React.createContext({
  theme: 'light',
  setTheme: (theme: string) => {},
  colorPreset: 'preset1',
  setColorPreset: (preset: string) => {},
});

export default ThemeContext;