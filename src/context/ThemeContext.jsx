import { createContext, useState, useContext, useEffect, useMemo, useCallback } from 'react'

const ThemeContext = createContext()

export function ThemeProvider({ children }) {

  // unrelated to theme - triggers a re-render to demonstrate the optimisation
  const [count, setCount] = useState(0)

  // lazy initialiser - reads localStorage once on mount
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('theme') || 'light'
  })

  // stable function reference - see README for why this matters
  const toggleTheme = useCallback(() => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light')
  }, [])

  // swap the above for this to see the problem useCallback solves:
  // const toggleTheme = () => {
  //   setTheme(prev => prev === 'light' ? 'dark' : 'light')
  // }

  // keeps localStorage in sync when theme changes
  useEffect(() => {
    localStorage.setItem('theme', theme)
  }, [theme])

  // only recreates the value object when theme actually changes - see README
  const value = useMemo(() => ({
    theme,
    toggleTheme
  }), [theme, toggleTheme])

  // swap the above for this to see the problem useMemo solves:
  // const value = {
  //   theme,
  //   toggleTheme
  // }

  return (
    <ThemeContext.Provider value={value}>
      {/* unrelated to theme - click this and watch the profiler */}
      <button onClick={() => setCount(c => c + 1)}>
        Provider re-render: {count}
      </button>
      {children}
    </ThemeContext.Provider>
  )
}

export function useTheme() {
  const context = useContext(ThemeContext)

  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider')
  }

  return context
}