import { createContext, useState } from 'react'

// createContext() creates the context object.
// we export it so components can reference it when calling useContext.
export const ThemeContext = createContext()

// ThemeProvider is a regular React component.
// it owns the theme state and exposes it through ThemeContext.Provider.
// the Provider accepts a value prop - whatever is in value
// is what components will receive when they call useContext(ThemeContext).
// children is whatever we choose to wrap with this component.
export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState('light')

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light')
  }

  // the object that components will receive when they call useContext(ThemeContext)
  const value = {
    theme,
    toggleTheme
  }

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  )
}