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

In the `context-api` branch, every component that needed theme had to do this:

```js
import { useContext } from 'react'
import { ThemeContext } from '../context/ThemeContext'

const { theme } = useContext(ThemeContext)
```

Two imports. Every time. In every component. Every component needs to know that theme lives in a context object called `ThemeContext`. That is an implementation detail leaking into every consumer.

This branch wraps that into a single hook:

```js
import { useTheme } from '../context/ThemeContext'

const { theme } = useTheme()
```

One import. One call. The component no longer knows or cares how theme is stored.

## What is a custom hook

A custom hook is a function that starts with `use` and calls at least one other hook inside it. That is the entire definition.

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

The guard clause ensures that if someone calls `useTheme()` outside of a `ThemeProvider`, they get a clear error immediately rather than a cryptic undefined somewhere down the line.

A component that calls `useTheme()` does not need to know about `ThemeContext`, `useContext`, or where theme lives. It just asks for what it needs.

## What changed

The goal is that components stop caring about how theme works and just ask for what they need. Two things changed to get there.

`ThemeContext.jsx` gains the `useTheme` function and stops exporting `ThemeContext` directly - it becomes a private implementation detail inside the file. Nothing outside needs to reference it anymore.

Navbar and Hero each lose one import and swap `useContext(ThemeContext)` for `useTheme()`.

Everything else is identical.

## What comes next

The core pattern is now complete - context owns the state, the provider decides the scope, and the hook gives components a clean way to access it. Switch to the `extra-features` branch to see how we can extend it to persist the theme choice across page refreshes using `localStorage` and `useEffect`.