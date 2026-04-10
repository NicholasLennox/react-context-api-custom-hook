# Context API and Custom Hooks - Theme Demo

This branch adds **persistence** - the *theme* choice now survives a page refresh.

In the `custom-hook` branch, theme resets to `'light'` every time the page refreshes. `useState('light')` always starts from the same place. This branch fixes that by reading from and writing to `localStorage`.

Both changes happen inside `ThemeContext.jsx`. Nothing else in the tree is touched - the hook still works the same way, the provider still wraps the same way. Persistence was added to the entire app by editing one file, because each piece of the system has one job and owns its own implementation.

## What changed

**Reading from localStorage on load**

```js
const [theme, setTheme] = useState(() => {
  return localStorage.getItem('theme') || 'light'
})
```

Normally `useState('light')` evaluates its argument on every render - React just throws the result away after the first one. 

For a primitive like `'light'` that cost is nothing. 

For something like `localStorage.getItem()` it is a real browser operation running on every render for no reason. 

The lazy initialiser - passing a function instead - tells React to only call it once on mount and never again.

**Writing to localStorage on change**

```js
useEffect(() => {
  localStorage.setItem('theme', theme)
}, [theme])
```

`useEffect` with `[theme]` as the dependency runs after every render where theme has changed. `localStorage` lives outside React, so `useEffect` is the right place to write to it.

## Try it

Open the browser devtools and go to Application - Storage - Local Storage.

Toggle the theme and watch the value update in real time. Then refresh the page.

The app loads with the value from localStorage instead of defaulting to `'light'`.

## What comes next

This is the end of the branch sequence. The full pattern is now in place - context owns and provides the state, the custom hook gives components a clean interface to it, and localStorage keeps the choice alive across sessions.

From here the natural next step is applying the same pattern to something from your own project - any piece of state that multiple components need is a candidate.