// Hero is the one that actually needs theme
// but it can't get it directly - it has to wait for Layout to pass it down

function Hero({ theme }) {
  return (
    <div className={`hero-${theme}`}>
      <h1>Welcome</h1>
      <p>This page is running in {theme} mode.</p>
    </div>
  )
}

export default Hero