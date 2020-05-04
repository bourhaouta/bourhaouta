<template>
  <g-layout :back="{ title: 'All articles', path: '/blog' }">
    <div class="container">
      <h1 class="mb-6 font-serif text-4xl font-bold text-center">
        {{ $page.post.title }}
      </h1>
    </div>

    <div
      v-if="$page.post.cover"
      class="max-w-screen-lg mx-auto rounded-sm ratio"
    >
      <g-image :src="$page.post.cover" :alt="$page.post.title" />
    </div>

    <div class="container my-10">
      <div class="markdown-body" v-html="$page.post.content" />
    </div>
  </g-layout>
</template>

<script>
export default {
  metaInfo() {
    return {
      title: this.$page.post.title,
      meta: [{}]
    };
  }
};
</script>

<page-query>
query Post($path: String!) {
  post: post(path: $path) {
    id
    path
    title
    cover
    content
    timeToRead
  }
}
</page-query>
