export const site = {
  name: "Omar Bourhaouta",
  title: "Software Engineer",
  description:
    "Omar Bourhaouta is a software engineer based in Rabat, Morocco, building product-focused web apps end to end.",
  url: "https://www.bourhaouta.com",
  locale: "en_US",
  twitter: "@bourhaouta",
  // Forwards to Gmail through ImprovMX
  email: "contact@bourhaouta.com",
  // Shown under the intro with a green dot, and as a "Now" block above the
  // experience; set to undefined to hide both
  status: "Open to new opportunities" as string | undefined,
  availability: "Looking for a frontend-focused product role. Full-time or freelance, remote from Rabat, Morocco.",
  socials: {
    twitter: "https://twitter.com/bourhaouta",
    github: "https://github.com/bourhaouta",
    codepen: "https://codepen.io/bourhaouta",
    linkedin: "https://www.linkedin.com/in/bourhaouta",
    cssTricks: "https://css-tricks.com/author/omarbourhaouta/",
  },
};

export function absoluteUrl(path = "/"): string {
  return new URL(path, site.url).toString();
}

// Safe JSON for <script type="application/ld+json">
export function jsonLd(data: object): string {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}
