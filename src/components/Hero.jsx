import { useContext } from 'react'
import { ThemeContext } from '../context/ThemeContext'

function Hero() {
  // same pattern as Navbar - useContext(ThemeContext) directly.
  // Hero gets theme without Layout knowing anything about it.
  const { theme } = useContext(ThemeContext)

  return (
    <div className={`hero-${theme}`}>
      <h1>Welcome</h1>
      <p>This page is running in {theme} mode.</p>
    </div>
  )
}

export default Hero