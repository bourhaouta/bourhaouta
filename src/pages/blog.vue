<template>
  <g-layout :back="{ title: 'Homepage', path: '/' }">
    <articles :articles="$page.posts" />
  </g-layout>
</template>

<script>
import articles from "~/components/molecules/articles";

export default {
  components: { articles },

  metaInfo() {
    return {
      title: "Blog"
    };
  }
};
</script>

<page-query>
query Post {
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
}
</page-query>
