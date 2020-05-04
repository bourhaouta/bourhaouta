const plugin = require("tailwindcss/plugin");

module.exports = plugin(function({ addComponents }) {
  addComponents({
    ".markdown-body": {
      "@apply text-base text-gray-900 leading-normal break-words": {},

      "*:not(:last-child)": {
        "@apply mt-0 mb-4": {},
      },

      li: {
        "&:not(:last-child)": {
          "@apply mb-1": {},
        },

        "& p:not(:last-child)": {
          "@apply mb-6": {},
        },
      },

      strong: {
        "@apply text-blue-600 font-semibold": {},

        a: {
          "@apply font-bold": {},
        },
      },

      "h1, h2, h3, h4, h5, h6": {
        "@apply font-semibold mb-4 mt-6": {},
      },

      h1: {
        "@apply leading-tight border-b text-4xl pb-2": {},
      },

      h2: {
        "@apply leading-tight border-b text-2xl pb-2": {},
      },

      h3: {
        "@apply leading-snug text-lg": {},
      },

      h4: {
        "@apply leading-none text-base": {},
      },

      h5: {
        "@apply leading-tight text-sm": {},
      },

      h6: {
        "@apply leading-tight text-sm text-gray-600": {},
      },

      blockquote: {
        "@apply text-base border-l-4 border-gray-300 pl-4 pr-4 text-gray-600": {},
      },

      code: {
        "@apply font-mono text-sm inline bg-gray-200 rounded px-2 py-1": {},
      },

      pre: {
        "@apply bg-gray-100 rounded p-4": {},

        code: {
          "@apply block bg-transparent p-0 overflow-visible rounded-none": {},
        },
      },

      "ul, ol": {
        "@apply text-base pl-8": {},
      },

      ul: {
        "@apply list-disc": {},
      },

      ol: {
        "@apply list-decimal": {},
      },

      kbd: {
        "@apply text-xs inline-block rounded border px-2 py-1 align-middle font-normal font-mono shadow": {},
      },

      table: {
        "@apply text-base border-gray-600": {},
      },

      "th, td": {
        "@apply border py-1 px-3": {},
      },
    },
  });
});
