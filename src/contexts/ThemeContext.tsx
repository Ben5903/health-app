import React from 'react';


//  theme (light/dark) and color preset (preset1/preset2)
export const ThemeContext = React.createContext({
  theme: 'light',
  setTheme: (theme: string) => {},
  colorPreset: 'preset1',
  setColorPreset: (preset: string) => {},
});

export default ThemeContext;