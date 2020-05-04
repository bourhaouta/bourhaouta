<template>
  <section>
    <div class="container">
      <g-heading caption="Articles">Mostly talking about CSS</g-heading>

      <ul class="grid gap-6">
        <li v-for="{ node } in articles.edges" :key="node.id">
          <g-article :article="node" />
        </li>
      </ul>
    </div>
  </section>
</template>


<script>
import GArticle from "./article";

export default {
  components: { GArticle },
  props: {
    articles: Object
  }
};
</script>

