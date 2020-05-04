<template>
  <section class="py-10 bg-black">
    <div class="container">
      <div>
        <g-heading class="mb-6 " caption="Pens" isLight noMargin>
          My picked pens on
          <a
            class="hover:underline"
            href="https://codepen.io/bourhaouta"
            target="_blank"
            rel="noopener noreferrer"
          >
            CodePen
          </a>
        </g-heading>

        <ul class="grid grid-cols-3 gap-6">
          <li
            v-for="({ node }, index) in pens.edges"
            :key="node.id"
            class="relative"
          >
            <div
              class="absolute inset-0 mt-3 ml-3 -mr-2 bg-gray-100 bg-opacity-25 rounded-lg"
            />

            <g-link :href="node.link" :title="node.title" class="ratio">
              <g-image
                class="bg-gray-100 rounded"
                :src="`${node.link}/image/large.png`"
                :alt="node.title"
              />
            </g-link>

            <h3 class="my-2 ml-6 font-bold text-white truncate">
              <g-link :href="node.link" :title="node.title">
                {{ node.title }}
              </g-link>
            </h3>
          </li>
        </ul>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  props: {
    pens: Object
  }
};
</script>

<style scoped>
</style>
