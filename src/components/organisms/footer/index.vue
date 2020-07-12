<template>
  <footer class="relative mt-20">
    <g-image class="absolute bottom-0 -z-1" src="~/images/sky.png" alt="sky" />

    <div class="container sm:px-20">
      <g-heading caption="Contact" class="items-center">
        Get in touch
      </g-heading>

      <form
        name="contact"
        class="grid grid-cols-1 gap-4 mb-10 sm:grid-cols-2"
        method="POST"
        data-netlify
        data-netlify-recaptcha
        data-netlify-honeypot="bot-field"
      >
        <input type="hidden" name="form-name" value="contact" />

        <div class="">
          <label
            for="name"
            class="block mb-1 font-medium tracking-wide cursor-pointer"
          >
            Full name
          </label>
          <input
            id="name"
            class="block w-full h-10 px-4 leading-tight text-gray-700 transition-colors duration-200 border rounded-sm appearance-none focus:outline-none focus:border-secondary-200"
            type="text"
            placeholder="John Doe"
          />
        </div>

        <div class="">
          <label
            for="email"
            class="block mb-1 font-medium tracking-wide cursor-pointer"
          >
            Email address
          </label>

          <input
            id="email"
            class="block w-full h-10 px-4 leading-tight text-gray-700 transition-colors duration-200 border rounded-sm appearance-none focus:outline-none focus:border-secondary-200"
            type="email"
            name="email"
            placeholder="john.doe@mail.com"
          />
        </div>

        <div class="sm:col-span-2">
          <label
            for="message"
            class="block mb-1 font-medium tracking-wide cursor-pointer"
          >
            Message
          </label>

          <textarea
            id="message"
            class="block w-full h-20 px-4 py-3 leading-tight text-gray-700 transition-colors duration-200 border rounded-sm appearance-none focus:outline-none focus:border-secondary-200"
            name="message"
            placeholder="Your message"
          />
        </div>

        <div class="flex justify-end sm:col-span-2">
          <g-button type="submit">
            <span class="mr-2">Send</span>
            <g-icon name="send" />
          </g-button>
        </div>
      </form>
    </div>
  </footer>
</template>

<script>
import GButton from "@/components/atoms/g-button";

export default {
  components: { GButton }
};
</script>
