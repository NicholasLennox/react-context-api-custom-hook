# Context API and Custom Hooks - Theme Demo

This branch introduces **custom hooks** - a pattern for wrapping and reusing hook logic under a meaningful name.

In the `context-api` branch, every component that needed theme had to do this:

```js
import { useContext } from 'react'
import { ThemeContext } from '../context/ThemeContext'

const { theme } = useContext(ThemeContext)
```

Every component needs to know that theme lives in a context object called `ThemeContext`. That is an implementation detail leaking into every consumer. This branch wraps that into a single hook:

```js
import { useTheme } from '../context/ThemeContext'

const { theme } = useTheme()
```

The component no longer knows or cares how theme is stored - that is the hook's concern. This is separation of concerns in practice. If the implementation ever changes, only the hook needs updating. Every component calling `useTheme()` is unaffected.

## What is a custom hook

A custom hook is a function that starts with `use` and calls at least one other hook inside it.

```js
export function useTheme() {
  const context = useContext(ThemeContext)

  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider')
  }

  return context
}
```

`useTheme` calls `useContext` and returns the result. The `use` prefix tells React to treat it as a hook and enforce the rules of hooks on it.

The rules of hooks are:

- Only call hooks at the top level of a function - not inside loops, conditions, or nested functions.
- Only call hooks inside React function components or other custom hooks.

The guard clause ensures that if someone calls `useTheme()` outside of a `ThemeProvider`, they get a clear error immediately rather than a cryptic `undefined` somewhere down the line.

## What changed

Two things changed from the `context-api` branch.

`ThemeContext.jsx` gains the `useTheme` function and stops exporting `ThemeContext` directly - it becomes a private implementation detail inside the file. Nothing outside needs to reference it anymore.

Navbar and Hero each lose one import and swap `useContext(ThemeContext)` for `useTheme()`.

Everything else is identical.

## What comes next

The core pattern is now complete - context owns the state, the provider decides the scope, and the hook gives components a clean way to access it. Switch to the `extra-features` branch to see how we can extend it to persist the theme choice across page refreshes using `localStorage` and `useEffect`.