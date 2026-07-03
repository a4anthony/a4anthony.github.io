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
const failed = ref(false);
const sendEmail = (e) => {
  sending.value = true;
  failed.value = false;
  e.preventDefault();

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
        failed.value = true;
        console.error("FAILED...", error.text);
      }
    );
};
</script>

<template>
  <container title="Contact" eyebrow="/// open a channel">
    <div class="grid grid-cols-1 gap-12 lg:grid-cols-[1fr_1.2fr]">
      <div>
        <p class="max-w-md text-base leading-relaxed text-faded">
          Have a role, a project, or a question about something I've built?
          Send a message — it goes straight to my inbox.
        </p>
        <p class="mt-6 font-mono text-sm text-faded">
          Prefer email?
          <a
            href="mailto:tony@a4anthony.com"
            class="text-amber underline decoration-amber/40 underline-offset-4 hover:text-steam"
            >tony@a4anthony.com</a
          >
        </p>
      </div>

      <form ref="form" class="space-y-6" @submit.prevent="sendEmail">
        <div>
          <label for="name" class="form-label">Name</label>
          <div class="mt-2">
            <input
              type="text"
              v-model="name"
              name="name"
              id="name"
              class="form-input"
              placeholder="Ada Lovelace"
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
          <label for="message" class="form-label">Message</label>
          <div class="mt-2">
            <textarea
              name="message"
              v-model="message"
              id="message"
              class="form-input"
              rows="5"
              placeholder="What are you building?"
              required
            />
          </div>
        </div>

        <div class="relative">
          <button type="submit" class="btn relative" :disabled="sending">
            Send message <envelope-icon class="ml-2 h-5 w-5" />
            <arrow-path-icon v-if="sending" class="ml-2 h-5 w-5 animate-spin" />
          </button>

          <transition
            enter-active-class="transition duration-100 ease-out"
            enter-from-class="transform scale-95 opacity-0"
            enter-to-class="transform scale-100 opacity-100"
            leave-active-class="transition duration-75 ease-out"
            leave-from-class="transform scale-100 opacity-100"
            leave-to-class="transform scale-95 opacity-0"
          >
            <div v-if="sent" class="mt-4 flex items-center">
              <face-smile-icon class="h-5 w-5 text-live" />
              <span class="ml-2 font-mono text-sm text-live"
                >Message sent — talk soon.</span
              >
            </div>
          </transition>

          <p v-if="failed" class="mt-4 font-mono text-sm text-amber">
            The message didn't send. Email me directly instead:
            <a href="mailto:tony@a4anthony.com" class="underline underline-offset-4"
              >tony@a4anthony.com</a
            >
          </p>
        </div>
      </form>
    </div>
  </container>
</template>

<style scoped></style>
