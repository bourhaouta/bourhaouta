export const site = {
  name: "Omar Bourhaouta",
  title: "Front-End Web Developer",
  description:
    "Omar Bourhaouta is a front-end web developer based in Rabat, Morocco, writing mostly about CSS.",
  url: "https://www.bourhaouta.com",
  locale: "en_US",
  twitter: "@bourhaouta",
  socials: {
    twitter: "https://twitter.com/bourhaouta",
    github: "https://github.com/bourhaouta",
    codepen: "https://codepen.io/bourhaouta",
    linkedin: "https://www.linkedin.com/in/bourhaouta",
  },
};

export function absoluteUrl(path = "/"): string {
  return new URL(path, site.url).toString();
}

// Safe JSON for <script type="application/ld+json">
export function jsonLd(data: object): string {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}
