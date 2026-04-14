import { useTheme } from '../context/ThemeContext'

function Navbar() {
  // one import, one call - useTheme handles the rest internally
  const { theme, toggleTheme } = useTheme()

  return (
    <nav className={`nav-${theme}`}>
      <span>My App</span>
      <button onClick={toggleTheme}>Toggle theme</button>
    </nav>
  )
}

// Track
Navbar.whyDidYouRender = true

export default Navbar