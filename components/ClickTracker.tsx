"use client";

import { useEffect } from "react";
import { trackEvent } from "@/lib/track";

/**
 * One listener for the whole site: a click on an element with `data-event="name"`
 * sends that event, with its `data-event-*` attributes as parameters
 * (`data-event-project="Shooot"` → `{ project: "Shooot" }`).
 * Server components can be tracked this way without an onClick.
 */
export default function ClickTracker() {
  useEffect(() => {
    function onClick(event: MouseEvent) {
      const el = (event.target as Element | null)?.closest<HTMLElement>("[data-event]");
      if (!el) return;

      const { event: name, ...data } = el.dataset;
      const params: Record<string, string> = {};
      for (const [key, value] of Object.entries(data)) {
        if (key.startsWith("event") && value !== undefined) {
          const param = key.slice("event".length);
          params[param.charAt(0).toLowerCase() + param.slice(1)] = value;
        }
      }
      if (name) trackEvent(name, params);
    }

    document.addEventListener("click", onClick, { capture: true });
    return () => document.removeEventListener("click", onClick, { capture: true });
  }, []);

  return null;
}
