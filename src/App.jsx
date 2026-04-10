import { useState } from 'react'
import Navbar from './components/Navbar'
import Layout from './components/Layout'

function App() {
  // theme lives here - App owns it
  const [theme, setTheme] = useState('light')

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light')
  }

  return (
    <>
      {/* Navbar receives theme and toggleTheme - it uses both */}
      <Navbar theme={theme} toggleTheme={toggleTheme} />

      {/* Layout receives theme - but only to pass it down to Hero */}
      <Layout theme={theme} />
    </>
  )
}

export default App