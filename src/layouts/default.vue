<template>
  <div class="flex flex-col min-h-screen text-xs text-secondary-500">
    <Navbar :back="back" />

    <main class="flex-1">
      <slot />
    </main>

    <Footer />
  </div>
</template>

<script>
import Navbar from "~/components/organisms/navbar";
import Footer from "~/components/organisms/footer";

export default {
  props: ["back"],
  components: { Navbar, Footer }
};
</script>
