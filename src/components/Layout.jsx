import Hero from './Hero'

// Layout no longer receives or passes any props.
// compare this to the prop-drilling branch - it was carrying theme just to hand it to Hero.
function Layout() {
  return (
    <>
      <Hero />
    </>
  )
}

export default Layout