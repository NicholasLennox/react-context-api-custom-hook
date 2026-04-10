import Hero from './Hero'

// Layout is a structural component - in a real app this is where
// you would compose things like a sidebar, a footer, or a main content area.
// It does not care about theme, but its children do.
// So it ends up carrying theme just to pass it down - that is the problem.

function Layout({ theme }) {
  return (
    <>
      <Hero theme={theme} />
    </>
  )
}

export default Layout