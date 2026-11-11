<script setup>
import { PrinterIcon } from "@heroicons/vue/24/outline/index.js";
import { cv, player } from "../data/profile.js";
import { useTab } from "../composables/useTab.js";

const { go } = useTab();
const print = () => window.print();
const bare = (url) => url.replace(/^https?:\/\/(www\.)?/, "").replace(/\/$/, "");
</script>

<template>
  <article class="cv enter mx-auto max-w-[980px] px-2 py-6 sm:px-4">
    <div class="no-print mb-8 flex flex-wrap gap-2">
      <button type="button" class="btn-ghost !text-sm" @click="go('overview')">
        Back to the scout report
      </button>
      <button type="button" class="btn-ghost !text-sm" @click="print">
        <printer-icon class="h-4 w-4" />Print or save as PDF
      </button>
    </div>

    <!-- header -->
    <header>
      <h1 class="font-display text-5xl font-bold uppercase leading-none sm:text-6xl">
        {{ player.name }}
      </h1>
      <p class="mt-2 font-display text-xl font-semibold uppercase tracking-[0.08em] text-elite">
        {{ player.role }}
      </p>
      <p class="mt-3 flex flex-wrap gap-x-5 gap-y-1 text-sm text-mist">
        <span>{{ player.base }}</span>
        <a :href="'mailto:' + player.email" class="text-chalk underline underline-offset-4">{{ player.email }}</a>
        <a :href="player.links.github" target="_blank" rel="noopener" class="text-chalk underline underline-offset-4">{{ bare(player.links.github) }}</a>
        <a :href="player.links.linkedin" target="_blank" rel="noopener" class="text-chalk underline underline-offset-4">LinkedIn</a>
        <a :href="player.links.blog" target="_blank" rel="noopener" class="text-chalk underline underline-offset-4">{{ bare(player.links.blog) }}</a>
      </p>
    </header>

    <!-- profile -->
    <section class="cv-section">
      <h2 class="cv-heading">Profile</h2>
      <div class="space-y-3 text-[15.5px] leading-relaxed">
        <p v-for="p in cv.profile" :key="p">{{ p }}</p>
      </div>
    </section>

    <!-- strengths -->
    <section class="cv-section">
      <h2 class="cv-heading">Core strengths</h2>
      <dl class="grid gap-x-8 gap-y-4 sm:grid-cols-2">
        <div v-for="s in cv.strengths" :key="s.title">
          <dt class="font-semibold">{{ s.title }}</dt>
          <dd class="mt-0.5 text-sm leading-relaxed text-mist">{{ s.text }}</dd>
        </div>
      </dl>
    </section>

    <!-- experience -->
    <section class="cv-section">
      <h2 class="cv-heading">Experience</h2>
      <div class="space-y-7">
        <div v-for="job in cv.experience" :key="job.org">
          <div class="flex flex-wrap items-baseline justify-between gap-x-4">
            <h3 class="text-lg font-semibold">
              {{ job.role }}<span class="text-mist">, {{ job.org }}</span>
            </h3>
            <p class="text-sm tabular-nums text-mist">
              {{ job.dates }}<template v-if="job.where"> &middot; {{ job.where }}</template>
            </p>
          </div>
          <ul class="mt-2 space-y-1.5 text-sm leading-relaxed text-mist">
            <li v-for="b in job.bullets" :key="b" class="flex gap-2.5">
              <span class="mt-[9px] h-px w-3 shrink-0 bg-elite" aria-hidden="true" />
              <span>{{ b }}</span>
            </li>
          </ul>
        </div>
        <p class="text-sm leading-relaxed text-mist">{{ cv.earlier }}</p>
      </div>
    </section>

    <!-- projects -->
    <section class="cv-section">
      <h2 class="cv-heading">Selected projects</h2>
      <div class="grid gap-x-10 gap-y-7 lg:grid-cols-2">
        <div v-for="p in cv.projects" :key="p.name">
          <h3 class="font-semibold">
            <a v-if="p.href" :href="p.href" target="_blank" rel="noopener" class="underline underline-offset-4">{{ p.name }}</a>
            <span v-else>{{ p.name }}</span>
            <span class="font-normal text-mist"> &middot; {{ p.note }}</span>
          </h3>
          <p class="mt-0.5 text-xs text-mist">{{ p.stack }}</p>
          <ul class="mt-2 space-y-1.5 text-sm leading-relaxed text-mist">
            <li v-for="b in p.bullets" :key="b" class="flex gap-2.5">
              <span class="mt-[9px] h-px w-3 shrink-0 bg-elite" aria-hidden="true" />
              <span>{{ b }}</span>
            </li>
          </ul>
        </div>
      </div>
    </section>

    <!-- skills -->
    <section class="cv-section">
      <h2 class="cv-heading">Skills</h2>
      <dl class="space-y-2 text-sm">
        <div v-for="s in cv.skills" :key="s.label" class="grid gap-x-6 sm:grid-cols-[150px_1fr]">
          <dt class="font-semibold">{{ s.label }}</dt>
          <dd class="leading-relaxed text-mist">{{ s.items }}</dd>
        </div>
      </dl>
    </section>

    <!-- education -->
    <section class="cv-section">
      <h2 class="cv-heading">Education</h2>
      <div class="space-y-5">
        <div v-for="e in cv.education" :key="e.title">
          <div class="flex flex-wrap items-baseline justify-between gap-x-4">
            <h3 class="font-semibold">
              {{ e.title }}<span class="text-elite">, {{ e.grade }}</span>
            </h3>
            <p class="text-sm text-mist">{{ e.where }} &middot; {{ e.dates }}</p>
          </div>
          <p v-for="l in e.lines" :key="l" class="mt-1.5 text-sm leading-relaxed text-mist">{{ l }}</p>
        </div>
      </div>
    </section>

    <!-- community -->
    <section class="cv-section">
      <h2 class="cv-heading">Open source and writing</h2>
      <ul class="space-y-1.5 text-sm leading-relaxed text-mist">
        <li v-for="c in cv.community" :key="c" class="flex gap-2.5">
          <span class="mt-[9px] h-px w-3 shrink-0 bg-elite" aria-hidden="true" />
          <span>{{ c }}</span>
        </li>
      </ul>
    </section>
  </article>
</template>
