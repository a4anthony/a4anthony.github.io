<script setup>
import Container from "./Container.vue";
import emailjs from "@emailjs/browser";

import {
  EnvelopeIcon,
  FaceSmileIcon,
  ArrowPathIcon,
} from "@heroicons/vue/24/outline/index.js";
import { ref } from "vue";

const name = ref("");
const email = ref("");
const message = ref("");
const form = ref(null);
const sending = ref(false);
const sent = ref(false);
const sendEmail = (e) => {
  sending.value = true;
  e.preventDefault();
  // name.value = "John Doe";
  // email.value = "john@email.com";
  // message.value = "Hello World";

  emailjs
    .send(
      "service_i5r2s5d",
      "template_jizgfig",
      {
        from_name: name.value,
        reply_to: email.value,
        message: message.value,
      },
      "JeOgBLzqsNdjHGxxK"
    )
    .then(
      (result) => {
        sending.value = false;
        sent.value = true;
        name.value = "";
        email.value = "";
        message.value = "";
        console.log("SUCCESS!", result.text);
      },
      (error) => {
        sending.value = false;
        sent.value = false;
        console.log("FAILED...", error.text);
      }
    );
};
</script>

<template>
  <container title="Contact">
    <!--<button type="button" @click="sendEmail">SFJDJSJDGD</button>-->
    <form ref="form" class="max-w-2xl space-y-8" @submit.prevent="sendEmail">
      <div>
        <label for="name" class="form-label">Name</label>
        <div class="mt-2">
          <input
            type="text"
            v-model="name"
            name="name"
            id="email"
            class="form-input"
            placeholder="John Doe"
            required
          />
        </div>
      </div>
      <div>
        <label for="email" class="form-label">Email</label>
        <div class="mt-2">
          <input
            type="email"
            v-model="email"
            name="email"
            id="email"
            class="form-input"
            placeholder="you@example.com"
            required
          />
        </div>
      </div>
      <div>
        <label for="email" class="form-label">Message</label>
        <textarea
          name="message"
          v-model="message"
          id="message"
          class="form-input"
          rows="5"
          placeholder="Enter your message here"
          required
        />
      </div>

      <div class="relative">
        <button type="submit" class="btn relative" :disabled="sending">
          Send Message <envelope-icon class="h-5 w-5 ml-2" />
          <arrow-path-icon v-if="sending" class="h-5 w-5 ml-2 animate-spin" />

          <transition
            :show="sent"
            enter-active-class="transition duration-100 ease-out"
            enter-from-class="transform scale-95 opacity-0"
            enter-to-class="transform scale-100 opacity-100"
            leave-active-class="transition duration-75 ease-out"
            leave-from-class="transform scale-100 opacity-100"
            leave-to-class="transform scale-95 opacity-0"
          >
            <div
              v-if="sent"
              class="space-y-4 absolute v-align left-full ml-4 w-full"
            >
              <div class="flex items-center">
                <face-smile-icon class="h-5 w-5 text-green-500" />
                <span class="ml-2 text-green-500">Message sent!</span>
              </div>
            </div>
          </transition>
        </button>

        <span class="block mt-4 text-sm text-zinc-300">
          You can also send a mail directly to
          <a
            href="mailto:tony@a4anthony.com"
            class="text-blue-300 animate hover:text-blue-400 underline"
            >tony@a4anthony.com</a
          >
        </span>
      </div>
    </form>
  </container>
</template>

<style scoped></style>
