<template>
  <div class="flex flex-col text-xl font-medium" :class="{ 'mb-4': !noMargin }">
    <span
      class="-mb-4 text-4xl font-light leading-none tracking-widest select-none"
      :class="isLight ? 'text-white text-opacity-50' : 'text-secondary-100'"
    >
      {{ caption }}
    </span>

    <h2 :class="{ 'text-white': isLight }">
      <slot />
    </h2>
  </div>
</template>

<script>
export default {
  props: {
    caption: String,
    noMargin: Boolean,
    isLight: Boolean
  }
};
</script>
