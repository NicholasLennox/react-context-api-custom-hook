import Navbar from './components/Navbar'
import Layout from './components/Layout'

// App no longer owns or passes theme - ThemeProvider handles that.
// App is back to being purely structural.
function App() {
  return (
    <div>
      <Navbar />
      <Layout />
    </div>
  )
}

export default App