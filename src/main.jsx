import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { ThemeProvider } from './context/ThemeContext'
import App from './App'
import './index.css'

// Here is where we decide what ThemeProvider wraps.
// by wrapping App, every component in the tree has access to theme.
// App becomes the children inside ThemeProvider.
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ThemeProvider>
      <App />
    </ThemeProvider>
  </StrictMode>
)