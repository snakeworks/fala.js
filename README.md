# Fala.js

A single-file JavaScript UI library.

## Getting Started

Add `fala.js` to your HTML file:

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>My App</title>
</head>
<body>
    <script src="fala.js"></script>
    <script>
        function App() {
            return h1("Hello, Fala!");
        }

        Fala.createRoot(App);
    </script>
</body>
</html>
```

## API

### `Fala.createRoot(component)`

Mounts a component as the root of your app.

```js
function App() {
    return div(h1("My App"), p("Welcome!"));
}

Fala.createRoot(App);
```

### Element functions

All standard HTML tags are available as functions. Pass an optional props object and any number of children (elements or strings).

```js
// Just children
p("Hello, world!")

// Props + children
div({style: "color: red;"}, p("Red text"))

// Nested elements
ul(
    li("First"),
    li("Second"),
    li("Third")
)
```

### `remember(initialValue)`

Creates reactive state. Returns an object with `.get()` and `.set()` methods. Calling `.set()` triggers a re-render.

```js
function Counter() {
    const count = remember(0);

    return div(
        p(`Count: ${count.get()}`),
        button({onclick: () => count.set(count.get() + 1)}, "Increment")
    );
}
```

### `createRouter(routeMap)`

Sets up hash-based routing. Pass an object mapping paths to components. Displays a 404 page for unmatched routes.

```js
createRouter({
    "/": HomePage,
    "/about": AboutPage,
    "/contact": ContactPage,
});
```

### `Link(to, ...children)`

Helper element that creates a link that navigates between routes.

```js
Link("/about", "Go to About")
```

## Examples

See the `examples/` directory:

- **[counter.html](examples/counter.html)** - Basic counter with reactive state
- **[router.html](examples/router.html)** - Multi-page app with hash routing
