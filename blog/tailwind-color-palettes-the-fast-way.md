---
layout: default
published: true
title: Tailwind color palettes the fast way!
date: 2026-09-30
cover: /images/blog/tailwind-shades-cover.webp
tags: ["showdev", "tailwindcss", "vscode", "css"]
comments: false
---

You have one brand color and you need the full Tailwind palette, from 50 to 950. No need to ask the AI for it, one shortcut in your editor does it.

---

When I start a new project, the first thing I do is set up the theme colors. Lately it's tempting to just ask the AI: "give me a Tailwind palette from `#db4d53`". Then you wait for it to think, you spend tokens, and you get shades that are guessed. Sometimes your own color isn't even in there.

So I made [Tailwind CSS Shades](https://marketplace.visualstudio.com/items?itemName=bourhaouta.tailwindshades), a small VS Code extension that does it instantly. No AI, no tokens, no waiting.

![Put the cursor on #db4d53, press Ctrl+K Ctrl+G, name it brand, and a Tailwind v4 palette is written](https://raw.githubusercontent.com/bourhaouta/vscode-tailwindshades/main/media/demo.gif)

## How to use it

1. Put the cursor on a color: `#db4d53`, `rgb(…)`, `hsl(…)`, `oklch(…)` or a color name.
2. Press `Ctrl+K Ctrl+G` (`Cmd+K Cmd+G` on macOS).
3. Name it, like `brand`.

And you get your theme:

```css
@theme {
  --color-brand-50: oklch(97.1% 0.012 16.784);
  --color-brand-100: oklch(91.4% 0.03 17.121);
  /* ... */
  --color-brand-900: oklch(38.1% 0.131 25.127);
  --color-brand-950: oklch(25.8% 0.085 25.446);
}
```

It reads your Tailwind version from the project, so on v3 you get a `tailwind.config.js` object with hex colors instead. It works with v4, v3, v2 and v1.

## The shades look like Tailwind's

It doesn't just mix your color with white and black. It finds the closest Tailwind color to yours and copies how that color changes from light to dark, in OKLCH. And your color stays exactly as it is, at the shade where it fits best.

## Get it

- [VS Code Marketplace](https://marketplace.visualstudio.com/items?itemName=bourhaouta.tailwindshades)
- [Open VSX](https://open-vsx.org/extension/bourhaouta/tailwindshades) for Cursor, Windsurf and VSCodium
- [Source on GitHub](https://github.com/bourhaouta/vscode-tailwindshades)
