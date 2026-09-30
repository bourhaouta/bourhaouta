import { yearsOfExperience } from "./experience";

// From the resume. Jobs live in lib/experience.ts. The phone number is left out
// on purpose: this page is public.
export const resume = {
  summary: `Software engineer with ${yearsOfExperience} years of experience building product-focused web apps, including 5+ years at Metafy owning projects across checkout, subscriptions, coaching, and frontend infrastructure. Strong in TypeScript, Svelte/SvelteKit, React, and GraphQL, with backend experience in Ruby on Rails/GraphQL to ship features end to end.`,

  skills: [
    { group: "Frontend", items: ["TypeScript", "JavaScript", "Svelte/SvelteKit", "React", "Next.js", "Vue/Nuxt"] },
    { group: "Backend & APIs", items: ["Node.js", "GraphQL", "REST APIs", "Apollo"] },
    {
      group: "UI & Architecture",
      items: ["Tailwind CSS", "Storybook", "Design Systems", "Responsive UI", "Accessibility"],
    },
    { group: "Engineering", items: ["Git", "Vite", "CI/CD", "Vitest", "Playwright", "Jest"] },
    { group: "AI Development", items: ["Codex", "Claude Code", "Copilot"] },
  ],

  education: {
    degree: "Bachelor's degree in Computer Science",
    school: "EST Berrechid",
    year: "2017",
  },

  languages: ["English", "Arabic", "French"],
};
