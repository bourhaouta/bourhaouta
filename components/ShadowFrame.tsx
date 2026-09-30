"use client";

import { useRef, type CSSProperties, type PointerEvent, type ReactNode } from "react";

// Resting offset of the shadow card, and how far things move with the pointer.
// REST > SHADOW_RANGE keeps the shadow visible (2px to 12px) wherever the pointer is.
const REST = 7;
const SHADOW_RANGE = 5;
const IMAGE_RANGE = 3;

type Props = {
  children: ReactNode;
  // Optional brand color: the shadow uses a soft tint of it, and the full color on hover
  brand?: string;
  // Resting shadow color in dark mode, when the tint looks muddy on the dark page
  brandRestDark?: string;
  className?: string;
};

/**
 * Content with an offset "shadow card" behind it. On hover the shadow moves away
 * from the pointer and the content leans toward it; when pressed the content sinks
 * onto the shadow like a button. Only CSS variables change, so no React re-renders.
 * Styles live in app/globals.css (.shadow-frame).
 */
export default function ShadowFrame({ children, brand, brandRestDark, className = "" }: Props) {
  const ref = useRef<HTMLDivElement>(null);

  function move(event: PointerEvent<HTMLDivElement>) {
    const el = ref.current;
    if (!el || event.pointerType !== "mouse") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const box = el.getBoundingClientRect();
    // -1 (left/top) to 1 (right/bottom)
    const x = ((event.clientX - box.left) / box.width) * 2 - 1;
    const y = ((event.clientY - box.top) / box.height) * 2 - 1;

    el.style.setProperty("--sx", `${REST - x * SHADOW_RANGE}px`);
    el.style.setProperty("--sy", `${REST - y * SHADOW_RANGE}px`);
    el.style.setProperty("--ix", `${x * IMAGE_RANGE}px`);
    el.style.setProperty("--iy", `${y * IMAGE_RANGE}px`);
  }

  function reset() {
    const el = ref.current;
    if (!el) return;
    for (const name of ["--sx", "--sy", "--ix", "--iy"]) el.style.removeProperty(name);
  }

  return (
    <div
      ref={ref}
      className={`shadow-frame ${brand ? "shadow-frame-brand" : ""} ${className}`}
      style={
        brand
          ? ({ "--brand": brand, ...(brandRestDark && { "--brand-rest-dark": brandRestDark }) } as CSSProperties)
          : undefined
      }
      onPointerMove={move}
      onPointerLeave={reset}
    >
      <div className="shadow-frame-shadow" aria-hidden />
      <div className="shadow-frame-content">{children}</div>
    </div>
  );
}
