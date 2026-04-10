# Context API and Custom Hooks - Theme Demo

This branch introduces the **Context API** - a feature built into React that lets you make state available to any component in the tree without passing it as props.

In the `main` branch, Layout had to carry theme just to hand it to Hero. It did not use theme itself - it was just in the way. 

Context API removes that wiring. Theme state moves out of App and into its own context file, and any component that needs it can read it directly.

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

`createContext()` returns an object. That object has a `Provider` property which is a component, and a reference you pass to `useContext()` to read the value. It does not hold any state itself - it is the shared object that connects the two sides. Both the Provider and any component that wants to read from it import this same object. That shared reference is what ties them together.

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

`ThemeContext.Provider` accepts a `value` prop. Whatever is in that object is what consuming components will receive. `children` is whatever we choose to wrap with `ThemeProvider` - it does not wrap anything automatically.

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

Two imports. Every time. In every component that needs theme. It works, but every component needs to know that theme lives in a context object called `ThemeContext`. That is an implementation detail leaking into every consumer.

Switch to the `custom-hook` branch to see how a single hook cleans that up.