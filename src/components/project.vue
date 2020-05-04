<template>
  <article class="relative flex items-center justify-center h-48">
    <g-image
      class="absolute object-cover object-top w-full h-full"
      :src="cover.file.url"
      :alt="title"
    />
    <g-image class="relative w-1/2" :src="logo.file.url" :alt="title" />
  </article>
</template>

<script>
export default {
  props: ["title", "logo", "cover"],
};
</script>

<style scoped>
article {
  box-shadow: 5px 5px 0 0 theme("colors.secondary.100"),
    0 0 0 1px theme("colors.secondary.100");
}
</style>
