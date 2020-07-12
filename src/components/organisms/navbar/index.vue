<template>
  <nav class="mb-4">
    <div class="container grid items-center h-32 grid-cols-3">
      <div>
        <g-link
          v-if="back"
          class="inline-flex items-center justify-center w-8 h-8 rounded hover:bg-gray-200"
          :to="back.path"
        >
          <g-icon name="back" />
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
