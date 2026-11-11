<script setup>
import { ref } from "vue";
import emailjs from "@emailjs/browser";
import { ArrowPathIcon } from "@heroicons/vue/24/outline/index.js";
import { player } from "../data/profile.js";

const kinds = ["Full-time role", "Contract", "Freelance project", "Just saying hello"];

const name = ref("");
const email = ref("");
const kind = ref(kinds[0]);
const message = ref("");
const state = ref("idle"); // idle | sending | sent | failed

const submit = () => {
  state.value = "sending";
  emailjs
    .send(
      "service_i5r2s5d",
      "template_jizgfig",
      {
        from_name: name.value,
        reply_to: email.value,
        message: `[${kind.value}]\n\n${message.value}`,
      },
      "JeOgBLzqsNdjHGxxK"
    )
    .then(
      () => {
        state.value = "sent";
        name.value = "";
        email.value = "";
        message.value = "";
      },
      (error) => {
        state.value = "failed";
        console.error("Offer failed to send", error?.text);
      }
    );
};
</script>

<template>
  <div class="grid grid-cols-12 gap-3">
    <section class="card enter col-span-12 lg:col-span-7" style="--i: 0">
      <h2 class="card-title">Contract offer</h2>

      <div v-if="state === 'sent'" class="py-8">
        <p class="font-display text-4xl font-bold uppercase leading-none text-elite">Offer submitted</p>
        <p class="mt-3 text-mist">Anthony will reply by email.</p>
        <button type="button" class="btn-ghost mt-6" @click="state = 'idle'">Send another</button>
      </div>

      <form v-else class="space-y-5" @submit.prevent="submit">
        <div class="grid gap-5 sm:grid-cols-2">
          <div>
            <label for="offer-name" class="label">Your name</label>
            <input id="offer-name" v-model="name" type="text" class="field mt-1.5" placeholder="Ada Lovelace" required />
          </div>
          <div>
            <label for="offer-email" class="label">Email</label>
            <input id="offer-email" v-model="email" type="email" class="field mt-1.5" placeholder="you@company.com" required />
          </div>
        </div>

        <fieldset>
          <legend class="label">Type of offer</legend>
          <div class="mt-1.5 flex flex-wrap gap-2">
            <label
              v-for="k in kinds"
              :key="k"
              class="cursor-pointer rounded-sm border px-3 py-1.5 text-sm transition-colors"
              :class="kind === k ? 'border-elite bg-elite/10 text-elite' : 'border-line text-mist hover:text-chalk'"
            >
              <input v-model="kind" type="radio" name="kind" :value="k" class="sr-only" />
              {{ k }}
            </label>
          </div>
        </fieldset>

        <div>
          <label for="offer-message" class="label">Terms</label>
          <textarea
            id="offer-message"
            v-model="message"
            rows="6"
            class="field mt-1.5"
            placeholder="The role, the team, and what you are building"
            required
          />
        </div>

        <div class="flex flex-wrap items-center gap-4">
          <button type="submit" class="btn" :disabled="state === 'sending'">
            Submit offer
            <arrow-path-icon v-if="state === 'sending'" class="h-4 w-4 animate-spin" />
          </button>
          <p v-if="state === 'failed'" class="text-sm text-loss">
            The offer didn't send. Email {{ player.email }} instead.
          </p>
        </div>
      </form>
    </section>

    <section class="card enter col-span-12 lg:col-span-5" style="--i: 1">
      <h2 class="card-title">Negotiation notes</h2>
      <dl class="space-y-3 text-sm">
        <div>
          <dt class="label">Agent</dt>
          <dd class="mt-0.5">None. You deal with Anthony directly.</dd>
        </div>
        <div>
          <dt class="label">Direct line</dt>
          <dd class="mt-0.5">
            <a :href="'mailto:' + player.email" class="text-elite underline underline-offset-4">{{ player.email }}</a>
          </dd>
        </div>
        <div>
          <dt class="label">Based</dt>
          <dd class="mt-0.5">{{ player.base }}</dd>
        </div>
        <div>
          <dt class="label">Interested in</dt>
          <dd class="mt-0.5">Full-stack, backend, platform and AI engineering roles.</dd>
        </div>
        <div>
          <dt class="label">Also found on</dt>
          <dd class="mt-0.5 flex flex-wrap gap-x-4">
            <a :href="player.links.linkedin" target="_blank" rel="noopener" class="hover:text-elite">LinkedIn</a>
            <a :href="player.links.github" target="_blank" rel="noopener" class="hover:text-elite">GitHub</a>
            <a :href="player.links.blog" target="_blank" rel="noopener" class="hover:text-elite">Blog</a>
          </dd>
        </div>
      </dl>
    </section>
  </div>
</template>
