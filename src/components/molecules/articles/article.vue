<template>
  <article class="relative grid items-start grid-cols-2 gap-6 article">
    <div
      class="absolute inset-0 mb-4 ml-3 -mt-3 -mr-3 transition-opacity duration-300 bg-opacity-25 rounded-sm opacity-0 bg-primary-200 -z-1 background"
    />

    <g-link
      :to="article.external || article.path"
      class="bg-gray-100 rounded-sm ratio"
    >
      <g-image :alt="article.title" :src="article.cover"> </g-image
    ></g-link>

    <div class="flex flex-col h-full">
      <h2 class="mb-2 -mt-1 text-xl">
        <g-link
          class="block hover:text-primary-800"
          :to="article.external || article.path"
        >
          {{ article.title }}
        </g-link>
      </h2>

      <p v-html="article.excerpt" class="mb-2 font text-secondary-400" />

      <div
        class="flex items-start justify-between mt-auto text-2xs center text-secondary-400"
      >
        <div class="flex items-start space-x-1">
          <time v-text="article.date" />
          <span>&middot;</span>
          <p>{{ article.timeToRead }} mins read</p>
        </div>
        <g-link
          v-if="article.external"
          :to="article.external"
          class="flex items-center pr-2 bg-gray-200 rounded-full"
        >
          <g-image
            class="object-cover object-center w-4 h-4 mr-1 rounded-full"
            src="https://res.cloudinary.com/css-tricks/image/upload/f_auto,q_auto/v1544564316/Avatar_qr6vy9.png"
          />
          CSS-Tricks
        </g-link>
      </div>
    </div>
  </article>
</template>

<script>
export default {
  props: {
    article: {
      type: Object,
      required: true
    }
  }
};
</script>

<style scoped>
.article:hover > .background {
  opacity: 1;
}
</style>
