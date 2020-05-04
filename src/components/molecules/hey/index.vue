<template>
  <header>
    <div class="container relative flex items-center">
      <h1 class="relative z-10 mt-2 mb-4 text-lg font-light">
        <small class="block mb-1 text-2xl font-medium">Hey There,</small>
        I am
        <strong
          class="font-normal text-primary-600"
          v-text="metadata.siteName"
        />, a Frontend developer
        <br />
        based in
        <a
          class="hover:underline"
          href="https://www.google.com/maps/place/Rabat/data=!4m2!3m1!1s0xda76b871f50c5c1:0x7ac946ed7408076b?sa=X&ved=2ahUKEwiMj_DwrJjpAhVEr3EKHYyYBngQ8gEwAHoECAsQAQ"
          rel="noopener noreferrer"
          target="_blank"
        >
          Rabat, Morocco</a
        >.
      </h1>
      <g-image
        class="absolute top-0 bottom-0 right-0 object-cover w-1/2 h-full mr-4 rounded-sm opacity-75"
        src="~/images/rabat.png"
        :alt="metadata.siteName"
      />
    </div>
  </header>
</template>

<script>
export default {
  props: {
    metadata: {
      type: Object,
      required: true
    }
  }
};
</script>

