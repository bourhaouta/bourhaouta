"use client";

import { useRef, type PointerEvent } from "react";
import Icon, { type IconName } from "./Icon";

// Same idea as ShadowFrame, at icon size: a red copy of the icon sits behind it on
// hover, moves away from the pointer, and the icon sinks onto it when pressed.
const REST = 2;
const SHADOW_RANGE = 2;
const ICON_RANGE = 1;

type Props = {
  icon: IconName;
  label: string;
  url: string;
};

export default function SocialIconLink({ icon, label, url }: Props) {
  const ref = useRef<HTMLAnchorElement>(null);
  const external = !url.startsWith("mailto:");

  function move(event: PointerEvent<HTMLAnchorElement>) {
    const el = ref.current;
    if (!el || event.pointerType !== "mouse") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const box = el.getBoundingClientRect();
    const x = ((event.clientX - box.left) / box.width) * 2 - 1;
    const y = ((event.clientY - box.top) / box.height) * 2 - 1;

    el.style.setProperty("--sx", `${REST - x * SHADOW_RANGE}px`);
    el.style.setProperty("--sy", `${REST - y * SHADOW_RANGE}px`);
    el.style.setProperty("--ix", `${x * ICON_RANGE}px`);
    el.style.setProperty("--iy", `${y * ICON_RANGE}px`);
  }

  function reset() {
    const el = ref.current;
    if (!el) return;
    for (const name of ["--sx", "--sy", "--ix", "--iy"]) el.style.removeProperty(name);
  }

  return (
    <a
      ref={ref}
      className="icon-shadow relative inline-flex h-8 w-8 items-center justify-center rounded"
      href={url}
      target={external ? "_blank" : undefined}
      rel={external ? "noopener noreferrer" : undefined}
      aria-label={label}
      title={label}
      onPointerMove={move}
      onPointerLeave={reset}
    >
      <span className="icon-shadow-back" aria-hidden>
        <Icon name={icon} size={18} />
      </span>
      <span className="icon-shadow-front">
        <Icon name={icon} size={18} />
      </span>
    </a>
  );
}
