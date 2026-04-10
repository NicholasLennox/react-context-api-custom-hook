import { createContext, useState, useContext } from 'react'

// private to this file - consumers use useTheme() instead
const ThemeContext = createContext()

// ThemeProvider owns the state and makes it available to whatever we wrap inside it
export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState('light')

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light')
  }

  // the object that components will receive when they call useTheme()
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

// a custom hook that wraps useContext - components only need to know about this
export function useTheme() {

  const context = useContext(ThemeContext)

  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider')
  }

  return context
}