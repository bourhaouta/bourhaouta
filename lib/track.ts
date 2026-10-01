// Sends a Google Analytics event. Does nothing when GA isn't loaded (not the
// production deploy, or blocked by the browser).
// Vercel's custom events need the Pro plan, so clicks only go to GA.

type Params = Record<string, string>;

declare global {
  interface Window {
    gtag?: (command: "event", name: string, params?: Params) => void;
  }
}

export function trackEvent(name: string, params?: Params) {
  window.gtag?.("event", name, params);
}
