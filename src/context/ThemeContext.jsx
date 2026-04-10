import { createContext, useState } from 'react'

// createContext() creates the context object.
// we export it so components can reference it when calling useContext.
export const ThemeContext = createContext()

// ThemeProvider owns the state and makes it available to whatever we wrap inside it
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