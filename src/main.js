// This is the main.js file. Import global CSS and scripts here.
// The Client API can be used here. Learn more: gridsome.org/docs/client-api

import "prismjs/themes/prism-okaidia.css";
import GHeading from "~/components/atoms/g-heading";
import GIcon from "~/components/atoms/g-icon";
import GLayout from "~/layouts/default";
import Ads from "vue-google-adsense";

export default (Vue, { router, head, isClient }) => {
  // Push Rubik font to head
  head.link.push({
    rel: "stylesheet",
    href:
      "https://fonts.googleapis.com/css?family=Rubik:300,400,500,700,900&display=swap",
  });

  head.meta.push({
    name: "keywords",
    content:
      "front-end web developer, HTML, CSS, JavaScript, UI, UX, Rabat, Morocco",
  });

  // Global components
  Vue.component("g-heading", GHeading);
  Vue.component("g-icon", GIcon);

  // Layouts
  Vue.component("g-layout", GLayout);

  // Test GA
  if (isClient) {
    Vue.use(Ads.AutoAdsense, {
      adClient: "ca-pub-9474866168322448",
      isNewAdsCode: true,
    });
  }
};
