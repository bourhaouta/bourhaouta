---
layout: default
published: true
title: Tailwind container the right way!
date: 2020-07-13
cover: https://i.imgur.com/mncFX27.png
tags: ["tutorial", "tailwind", "css"]
comments: false
---

The container is just a div you can style with CSS. You can give it a fixed width, paddings on the inline edges and center it with margins. and it comes by with Tailwind's default configuration.

---

The `container` is just a normal `div` you can style with CSS. You can give it a fixed width, horizontal padding and center it with margin to allow for more sophisticated CSS styling.

And it comes by with Tailwind's [default configuration](https://github.com/tailwindcss/tailwindcss/blob/master/stubs/defaultConfig.stub.js) as a component for fixing an element's width to the current breakpoint:

```javascript
// tailwind.config.js
module.exports = {
  theme: {
    container: {},
  },
};
```

But it comes with no more than the fixed width, which makes the containers neither centered nor having horizontal padding as we used to know with previous CSS frameworks. But since Tailwind is a utility-first CSS framework we have to do something like this:

```html
<div class="container px-4 mx-auto">
  <!-- ... -->
</div>
```

By using the previous example, you just had your container fixed in the center with some padding on each side. But what if you needed to change the `px-4` to `px-6` on your entire project, you will have to find every single container on your project and change manually.

## Customizing

The ideal way to avoid this issue is by customizing the built-in options of the `container` component:

```javascript
// tailwind.config.js
module.exports = {
  theme: {
    container: (theme) => ({
      // To center containers by default
      center: true,

      // To add horizontal padding by default
      padding: theme("spacing.4"),
    }),
  },
};
```

To specify a different padding amount for each breakpoint, use an object to provide a `default` value and any breakpoint-specific overrides:

```javascript
// tailwind.config.js
module.exports = {
  theme: {
    container: (theme) => ({
      padding: {
        default: theme("spacing.4"),
        sm: theme("spacing.5"),
        lg: theme("spacing.6"),
        xl: theme("spacing.8"),
      },
    }),
  },
};
```

You either use `theme` or pass specific values:

```javascript
// tailwind.config.js
module.exports = {
  theme: {
    container: {
      padding: {
        default: "1rem",
        sm: "2rem",
        lg: "4rem",
        xl: "5rem",
      },
    },
  },
};
```

## Using `addComponents`

For more flexibility with the container, you can just disable it by setting the `.container` property to `false` in the `corePlugins` section of your config file:

```javascript
// tailwind.config.js
module.exports = {
  corePlugins: {
    // ...
    container: false,
  },
};
```

And then create your custom component from scratch with the needed CSS, using `theme` function to get the theme values:

```javascript
// tailwind.config.js
module.exports = {
  plugins: [
    ({ addComponents, theme }) => {
      addComponents({
        ".container": {
          marginInline: "auto",
          paddingInline: theme("spacing.4"),
          maxWidth: theme("screens.sm"),

          // Breakpoints
          "@screen sm": {
            maxWidth: theme("screens.sm"),
          },
          "@screen md": {
            maxWidth: theme("screens.md"),
          },
        },
      });
    },
  ],
};
```

One more benefit you get out of this approach is setting a custom container `max-width`, as you can see in my [personal website](https://bourhaouta.com/) the `container` is always small.

## Using `@apply`

You can also use `@apply` inside your components and this is how you can do it:

```javascript
// tailwind.config.js
module.exports = {
  plugins: [
    ({ addComponents, theme }) => {
      addComponents({
        ".container": {
          "@apply px-4 mx-auto": {},
          maxWidth: theme("screens.sm"),
        },
      });
    },
  ],
};
```
