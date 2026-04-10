import { useContext } from 'react'
import { ThemeContext } from '../context/ThemeContext'

function Hero() {
    // reads theme from ThemeContext - no props, no involvement from Layout
    const { theme } = useContext(ThemeContext)

    return (
        <div className={`hero-${theme}`}>
            <h1>Welcome</h1>
            <p>This page is running in {theme} mode.</p>
        </div>
    )
}

export default Hero