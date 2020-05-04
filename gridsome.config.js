// This is where project configuration and plugin options are located.
// Learn more: https://gridsome.org/docs/config

// Changes here require a server restart.
// To restart press CTRL + C in terminal and run `gridsome develop`

module.exports = {
  siteName: "Omar Bourhaouta",
  siteDescription: "Front-End Web Developer - Rabat",

  plugins: [
    {
      use: "@gridsome/source-filesystem",
      options: {
        path: "blog/**/*.md",
        typeName: "Post",
        remark: {
          plugins: ["@gridsome/remark-prismjs"],
          grayMatter: {
            excerpt: true,
          },
        },
      },
    },

    {
      use: "gridsome-plugin-tailwindcss",
    },

    {
      use: "@gridsome/plugin-google-analytics",
      options: {
        id: process.env.GOOGLE_ANALYTICS_ID,
      },
    },

    {
      use: "gridsome-source-rss",
      options: {
        feedUrl: process.env.CODEPEN_FEED,
        typeName: "CodePen",
        // Parser options, see: https://www.npmjs.com/package/rss-parser
        parser: {},
      },
    },
  ],
};
