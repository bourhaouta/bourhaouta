<template>
  <nav class="mb-4">
    <div class="container grid items-center h-32 grid-cols-3">
      <div>
        <g-link v-if="back" class="flex items-center" :to="back.path">
          <g-icon name="home" />
          <span>{{ back.title }}</span>
        </g-link>
      </div>

      <div class="flex justify-center">
        <g-link to="/">
          <g-image
            src="~/images/brand.svg"
            :alt="$static.metadata.siteName"
            immediate
          />
        </g-link>
      </div>

      <div></div>
    </div>
  </nav>
</template>

<script>
export default {
  props: {
    back: {
      type: Object,
      default: null
    }
  }
};
</script>

<static-query>
query {
  metadata {
    siteName
  }
}
</static-query>
