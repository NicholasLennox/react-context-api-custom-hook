import { useTheme } from '../context/ThemeContext'

function Hero() {
  // one import, one call - no knowledge of ThemeContext needed
  const { theme } = useTheme()

  return (
    <div className={`hero-${theme}`}>
      <h1>Welcome</h1>
      <p>This page is running in {theme} mode.</p>
    </div>
  )
}

export default Hero