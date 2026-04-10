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

Theme state lives in App. 

Two components need it: Navbar and Hero.

The problem is that Hero is not a direct child of App. Layout sits between them. Layout has no use for theme - it is a structural component, the kind of place you would normally compose a sidebar, a footer, or a main content area. But because Hero needs theme, Layout has to receive it and pass it down.

This is prop drilling. State is carried through components that do not own it and do not use it, simply because a component further down the tree needs it.

```
App (owns theme state)
  ├── Navbar  (receives theme + toggleTheme, uses both)
  └── Layout  (receives theme, does not use it, passes it to Hero)
        └── Hero  (receives theme, finally uses it)
```

It works. The toggle works, the styles update, everything behaves correctly.

The question is not whether it works. The question is whether this scales.

## The cost

Right now there is one piece of state and three components. The wiring is manageable.

Add more components. Add more shared state. Add more levels to the tree. Every new consumer means finding every component between it and the state owner and adding another prop to the chain. Components that have nothing to do with theme become responsible for carrying it anyway.

The code does not break. It just becomes harder to follow, harder to change, and harder to reason about. Layout's job is layout - not theme delivery.

## What comes next

Switch to the `context-api` branch to see the same result without the wiring.