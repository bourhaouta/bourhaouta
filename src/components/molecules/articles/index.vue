<template>
  <section>
    <div class="container">
      <g-heading caption="Articles" :back="{ title: 'Homepage', path: '/blog' }"
        >Mostly talking about CSS</g-heading
      >

      <ul class="grid gap-10">
        <li v-for="{ node } in articles.edges" :key="node.id">
          <g-article :article="node" />
        </li>
      </ul>

      <slot name="footer" />
    </div>
  </section>
</template>

<script>
import GArticle from "@/components/atoms/g-article";

export default {
  components: { GArticle },
  props: {
    articles: {
      type: Object,
      required: true
    }
  }
};
</script>

