# Context API and Custom Hooks - Theme Demo

This app demonstrates a single, focused problem:

*What happens when multiple components need the same piece of state, and that state lives far away from where it is used.*

We use theme - light and dark mode - as a simple but understandable example.

## Branch structure

Each branch builds on the last. Work through them in order.

- `main` - prop drilling. Theme is passed manually through the component tree.
- `context-api` - the same result, using Context API instead of props.
- `custom-hook` - a useTheme hook that wraps the context consumption.
- `extra-features` - persisting the theme choice across page refreshes.

## What this branch shows

Same app. Same result. No prop drilling.

In the `main` branch, Layout had to carry theme just to hand it to Hero. It did not use theme itself - it was just in the way.

This branch removes that wiring. Theme state moves out of App and into its own context file. Any component that needs theme reads it directly. Layout is no longer involved.

```
App
  ├── Navbar  (reads theme directly)
  └── Layout  (no props at all)
        └── Hero  (reads theme directly)
```

## How it works

There are three moving parts: creating the context, providing the value, and reading it.

**1. Creating the context**

```js
export const ThemeContext = createContext()
```

This creates the context object. It does not hold any data yet. Think of it as a named reference - both the Provider and any component that wants to read from it will import this same object. That shared reference is what connects them.

**2. Providing the value**

In `ThemeContext.jsx`, `ThemeProvider` owns the state and wraps its children in `ThemeContext.Provider`:

```jsx
export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState('light')

  const value = { theme, toggleTheme }

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  )
}
```

`ThemeContext.Provider` is a component that accepts a `value` prop. Whatever is in that object is what consuming components will receive. `children` is whatever we choose to wrap with `ThemeProvider` - it does not wrap anything automatically.

In `main.jsx` we make that choice explicit:

```jsx
<ThemeProvider>
  <App />
</ThemeProvider>
```

`App` becomes `children`. Because we wrap at the root, every component in the tree has access to theme. If we had only wrapped `Layout`, only `Layout` and its children would have access.

**3. Reading the value**

```js
import { useContext } from 'react'
import { ThemeContext } from '../context/ThemeContext'

const { theme, toggleTheme } = useContext(ThemeContext)
```

Any component inside the Provider can do this. React walks up the tree, finds the nearest `ThemeContext.Provider`, and returns its `value`. No props needed, no middlemen.

## What changed in each file

- `ThemeContext.jsx` - new file. owns the state, provides the value.
- `main.jsx` - wraps App in ThemeProvider.
- `App.jsx` - no longer owns or passes theme.
- `Layout.jsx` - no props. no involvement.
- `Navbar.jsx` - reads from context directly.
- `Hero.jsx` - reads from context directly.

## The remaining friction

Look at Navbar and Hero. They both do the exact same thing to get theme:

```js
import { useContext } from 'react'
import { ThemeContext } from '../context/ThemeContext'

const { theme } = useContext(ThemeContext)
```

Two imports. Every time. In every component that needs theme. It works, but it leaks the implementation detail - every consumer needs to know that theme lives in a context, and which one.

Switch to the `custom-hook` branch to see how a single hook cleans that up.