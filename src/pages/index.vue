<template>
  <g-layout>
    <div class="space-y-16">
      <hey :metadata="$page.metadata" />

      <articles :articles="$page.posts" />

      <pens :pens="$page.pens" />
    </div>
  </g-layout>
</template>

<script>
import hey from "~/components/molecules/hey";
import articles from "~/components/molecules/articles";
import pens from "~/components/molecules/pens";

export default {
  components: { hey, articles, pens },
  metaInfo() {
    return {
      title: "Front-End Web Developer!",
      meta: [
        {
          key: "description",
          name: "description",
          content: this.$page.metadata.siteName
        }
      ]
    };
  }
};
</script>

<page-query>
query Homepage {
  metadata {
    siteName
    siteDescription
  }

  posts: allPost(filter: { published: { eq: true } }) {
    edges {
      node {
        id
        title
        cover
        excerpt
        path
        external
        timeToRead
        date(format: "MMMM DD, YYYY")
      }
    }
  }

  pens: allCodePen(limit: 6) {
    edges {
      node {
        id
        title
        link
      }
    }
  }
}
</page-query>

