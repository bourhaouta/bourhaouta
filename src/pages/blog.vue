<template>
  <g-layout :back="{ title: 'Homepage', path: '/' }">
    <div class="container">
      <g-heading caption="Articles">Mostly talking about CSS</g-heading>

      <ul class="grid grid-cols-2 gap-6">
        <li
          v-for="({ node }, rest) in $page.posts.edges"
          :class="!rest && 'col-span-2'"
          :key="node.id"
        >
          <article
            :class="!rest ? 'grid-cols-2' : 'grid-cols-3'"
            class="relative grid items-start gap-6 article"
          >
            e
            <div
              class="absolute inset-0 mb-4 ml-3 -mt-3 -mr-3 transition-opacity duration-300 bg-opacity-25 rounded-sm opacity-0 bg-primary-200 -z-1 background"
            />
            <g-link
              :class="!rest ? 'ratio' : 'ratio-full'"
              :to="node.external || node.path"
              class="bg-gray-100 rounded-sm"
            >
              <g-image :alt="node.title" :src="node.cover"> </g-image
            ></g-link>

            <div :class="{ 'col-span-2': rest }" class="flex flex-col h-full">
              <h2 :class="!rest ? 'text-xl' : 'text-sm'" class="mb-2 -mt-1">
                <g-link
                  class="block hover:text-primary-800"
                  :to="node.external || node.path"
                >
                  {{ node.title }}
                </g-link>
              </h2>

              <p
                v-if="!rest"
                v-html="node.excerpt"
                class="mb-2 font text-secondary-400"
              />

              <div
                class="flex items-start justify-between mt-auto text-2xs center text-secondary-400"
              >
                <div class="flex items-start space-x-1">
                  <time v-text="node.date" />
                  <span>&middot;</span>
                  <p>{{ node.timeToRead }} mins read</p>
                </div>
                <g-link
                  v-if="node.external"
                  :to="node.external"
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
        </li>
      </ul>

      <ul class="">
        <li v-for="({ node }, rest) in $page.posts.edges" :key="node.id">
          <article class="relative grid items-start gap-6 article">
            <h2>
              <g-link
                class="block hover:text-primary-800"
                :to="node.external || node.path"
              >
                {{ node.title }}
              </g-link>
            </h2>

            <div
              class="flex items-start justify-between mt-auto text-2xs center text-secondary-400"
            >
              <div class="flex items-start space-x-1">
                <time v-text="node.date" />
                <span>&middot;</span>
                <p>{{ node.timeToRead }} mins read</p>
              </div>
              <g-link
                v-if="node.external"
                :to="node.external"
                class="flex items-center pr-2 bg-gray-200 rounded-full"
              >
                <g-image
                  class="object-cover object-center w-4 h-4 mr-1 rounded-full"
                  src="https://res.cloudinary.com/css-tricks/image/upload/f_auto,q_auto/v1544564316/Avatar_qr6vy9.png"
                />
                CSS-Tricks
              </g-link>
            </div>
          </article>
        </li>
      </ul>
    </div>
  </g-layout>
</template>

<script>
export default {
  metaInfo() {
    return {
      title: "About us"
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
