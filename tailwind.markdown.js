const plugin = require("tailwindcss/plugin");

module.exports = plugin(function({ addComponents, theme }) {
  addComponents({
    ".markdown-body": {
      "@apply text-base text-gray-900 leading-loose break-words": {},

      li: {
        "&:not(:last-child)": {
          "@apply mb-1": {},
        },

        "& p:not(:last-child)": {
          "@apply mb-6": {},
        },
      },

      hr: {
        "@apply my-6": {},
      },

      a: {
        backgroundImage: `linear-gradient(transparent 0%, transparent calc(50% - 9px), ${theme(
          "colors.primary.100"
        )} calc(50% - 9px), ${theme("colors.primary.100")} 100%)`,
        backgroundSize: "100% 200%",
        transitionProperty: "background-position",

        "@apply duration-200": {},

        "&:hover": {
          backgroundPosition: `0% 100%`,
        },
      },

      strong: {
        "@apply text-blue-600 font-semibold": {},

        a: {
          "@apply font-bold": {},
        },
      },

      "h1, h2, h3, h4, h5, h6": {
        "@apply font-semibold mb-4 mt-10": {},
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
        "@apply font-mono text-xs inline bg-gray-200 rounded px-2 py-1": {},
      },

      "pre[class*='language-']": {
        "@apply rounded p-4 my-6": {},

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
