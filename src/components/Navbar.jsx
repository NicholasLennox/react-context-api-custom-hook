import { useContext } from 'react'
import { ThemeContext } from '../context/ThemeContext'

function Navbar() {
  // useContext(ThemeContext) reads the value from the nearest ThemeProvider above it.
  // no props needed - we reach up the tree directly.
  const { theme, toggleTheme } = useContext(ThemeContext)

  return (
    <nav className={`nav-${theme}`}>
      <span>My App</span>
      <button onClick={toggleTheme}>Toggle theme</button>
    </nav>
  )
}

export default Navbar