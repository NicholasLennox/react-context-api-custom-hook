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

In the `custom-hook` branch, theme resets to `'light'` every time the page refreshes. `useState('light')` always starts from the same place.

This branch fixes that. When theme changes it gets saved to localStorage. When the app loads it checks localStorage first before falling back to `'light'`.

Both changes happen inside `ThemeContext.jsx`. Nothing else in the tree is touched - the hook still works the same way, the provider still wraps the same way.

This is a good example of what **separation of concerns** looks like in practice. Each piece of the system has one job, and you can change how it does that job without touching anything else. That is a direct result of the decisions made in the earlier branches - moving state out of App, hiding the context behind a hook, keeping consumers ignorant of the implementation.

## What changed

**Reading from localStorage on load**

```js
const [theme, setTheme] = useState(() => {
  return localStorage.getItem('theme') || 'light'
})
```

Normally `useState('light')` evaluates its argument on every render - React just throws the result away after the first one. For a primitive like `'light'` that cost is nothing. For something like `localStorage.getItem()` it is a real browser operation happening on every render for no reason. The lazy initialiser - passing a function instead - tells React to only call it once on mount and never again.

**Writing to localStorage on change**

```js
useEffect(() => {
  localStorage.setItem('theme', theme)
}, [theme])
```

`useEffect` with `[theme]` as the dependency runs once after every render where theme has changed. Recall, localStorage lives outside React, so we use `useEffect` to write to it.

## Try it

Open the browser devtools and go to Application - Storage - Local Storage. 

Toggle the theme and watch the value update in real time. Then refresh the page. 

The app loads with the value from localStorage instead of defaulting to `'light'`.

## What comes next

This is the end of the branch sequence. The full pattern is now in place - context owns and provides the state, the custom hook gives components a clean interface to it, and localStorage keeps the choice alive across sessions.

From here the natural next step is applying the same pattern to something from your own project - any piece of state that multiple components need is a candidate.