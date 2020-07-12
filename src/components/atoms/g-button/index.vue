<template>
  <component
    class="inline-flex items-center h-8 px-6 font-medium text-gray-800 transition-colors duration-200 bg-white border rounded-sm cursor-pointer hover:bg-secondary-100 hover:border-secondary-200"
    :is="component"
    :to="to"
    :href="href"
  >
    <slot />
  </component>
</template>

<script>
export default {
  props: {
    to: [String, Object],
    href: String
  },
  computed: {
    component() {
      if (this.to) return "router-link";
      if (this.href) return "a";
      return "button";
    }
  }
};
</script>
