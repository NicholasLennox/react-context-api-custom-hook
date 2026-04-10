
function Navbar({ theme, toggleTheme }) {
  return (
    <nav className={`nav-${theme}`}>
      <span>My App</span>
      <button onClick={toggleTheme}>Toggle theme</button>
    </nav>
  )
}

export default Navbar