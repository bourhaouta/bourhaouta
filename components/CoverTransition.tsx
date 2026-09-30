import { ViewTransition, type ReactNode } from "react";

// Morphs a post's cover from the article list into the post page (and back).
// Both sides must use the same name; `default="none"` stops unrelated crossfades.
export default function CoverTransition({ slug, children }: { slug: string; children: ReactNode }) {
  return (
    <ViewTransition name={`cover-${slug}`} share="morph" default="none">
      {children}
    </ViewTransition>
  );
}
