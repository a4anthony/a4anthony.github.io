<script setup>
import { computed, onBeforeUnmount, onMounted, ref } from "vue";
import {
  ArrowPathIcon,
  ArrowTopRightOnSquareIcon,
  DocumentTextIcon,
} from "@heroicons/vue/24/outline/index.js";
import IntroSequence from "../components/IntroSequence.vue";
import OverviewScreen from "../screens/OverviewScreen.vue";
import SquadScreen from "../screens/SquadScreen.vue";
import CareerScreen from "../screens/CareerScreen.vue";
import OfferScreen from "../screens/OfferScreen.vue";
import PlainCv from "../screens/PlainCv.vue";
import { player, ticker } from "../data/profile.js";
import { useTab } from "../composables/useTab.js";

const { tab, go } = useTab();

const nav = [
  { id: "overview", label: "Overview", hint: "profile" },
  { id: "squad", label: "Squad", hint: "projects" },
  { id: "career", label: "Career", hint: "experience" },
  { id: "offer", label: "Make an offer", hint: "contact" },
];

const screens = {
  overview: OverviewScreen,
  squad: SquadScreen,
  career: CareerScreen,
  offer: OfferScreen,
  cv: PlainCv,
};
const screen = computed(() => screens[tab.value]);
const crumb = computed(
  () => nav.find((n) => n.id === tab.value)?.label ?? "Plain CV"
);

// intro: once per session, never under reduced motion
const reduce =
  typeof window !== "undefined" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const seen = () => {
  try {
    return sessionStorage.getItem("scout-intro") === "1";
  } catch (e) {
    return false;
  }
};
const showIntro = ref(!reduce && !seen());
const revealed = ref(!showIntro.value);
const runKey = ref(0);

const onReveal = () => {
  revealed.value = true;
  try {
    sessionStorage.setItem("scout-intro", "1");
  } catch (e) {
    /* ignore */
  }
};
const replay = () => {
  if (reduce) return;
  revealed.value = false;
  showIntro.value = true;
  runKey.value++;
  window.scrollTo({ top: 0 });
};

// portrait: shown only if the file actually loads
const hasPhoto = ref(false);
if (typeof window !== "undefined" && player.photo) {
  const probe = new Image();
  probe.onload = () => (hasPhoto.value = probe.naturalWidth > 1);
  probe.src = player.photo;
}

// the date in the top bar, as a manager would see it
const today = ref("");
let clock;
const setToday = () => {
  today.value = new Date().toLocaleDateString("en-GB", {
    weekday: "short",
    day: "numeric",
    month: "short",
    year: "numeric",
  });
};
onMounted(() => {
  setToday();
  clock = setInterval(setToday, 60000);
});
onBeforeUnmount(() => clearInterval(clock));
</script>

<template>
  <div class="min-h-screen">
    <intro-sequence
      v-if="showIntro"
      :key="runKey"
      @reveal="onReveal"
      @done="showIntro = false"
    />

    <!-- top bar -->
    <header class="sticky top-0 z-30 border-b border-line bg-panel/95 backdrop-blur">
      <div class="flex h-12 items-center justify-between gap-3 px-3 sm:px-4">
        <p class="flex min-w-0 items-center gap-3 text-sm text-mist">
          <a
            href="#overview"
            class="grid h-9 w-9 shrink-0 place-items-center overflow-hidden rounded-full border-2 border-elite bg-raised font-display text-sm font-bold text-chalk"
            aria-label="Anthony Akro, overview"
          >
            <img v-if="hasPhoto" :src="player.photo" alt="" class="avatar-img h-full w-full object-cover object-top" />
            <template v-else>{{ player.initials }}</template>
          </a>
          <span class="truncate">
            <span class="hidden md:inline">Scouting &rsaquo; Shortlist &rsaquo; </span>
            <b class="font-semibold text-chalk">{{ player.name }}</b>
            <span class="hidden sm:inline"> &rsaquo; {{ crumb }}</span>
          </span>
        </p>
        <div class="flex shrink-0 items-center gap-4">
          <span class="hidden font-display text-sm font-semibold uppercase tracking-[0.1em] text-mist lg:inline">{{ today }}</span>
          <a
            :href="player.links.blog"
            target="_blank"
            rel="noopener"
            class="hidden items-center gap-1 font-display text-sm font-semibold uppercase tracking-[0.1em] text-mist hover:text-chalk md:inline-flex"
          >
            Blog <arrow-top-right-on-square-icon class="h-3.5 w-3.5" />
          </a>
          <button
            v-if="!reduce"
            type="button"
            class="hidden items-center gap-1.5 font-display text-sm font-semibold uppercase tracking-[0.1em] text-mist hover:text-chalk md:inline-flex"
            @click="replay"
          >
            <arrow-path-icon class="h-4 w-4" />Replay intro
          </button>
          <button
            type="button"
            class="inline-flex items-center gap-1.5 font-display text-sm font-semibold uppercase tracking-[0.1em] text-mist hover:text-chalk"
            @click="go(tab === 'cv' ? 'overview' : 'cv')"
          >
            <document-text-icon class="h-4 w-4" />
            {{ tab === "cv" ? "Scout report" : "Plain CV" }}
          </button>
          <button type="button" class="btn !px-4 !py-1 !text-sm" @click="go('offer')">
            Make an offer
          </button>
        </div>
      </div>
      <!-- deadline-day ticker -->
      <div class="ticker flex overflow-hidden bg-good text-[#1d1a05]" aria-hidden="true">
        <div v-for="copy in 2" :key="copy" class="ticker-track flex shrink-0">
          <span
            v-for="item in ticker"
            :key="item"
            class="whitespace-nowrap px-6 py-1 font-display text-sm font-bold uppercase tracking-[0.1em] after:ml-12 after:opacity-50 after:content-['\2022']"
          >
            {{ item }}
          </span>
        </div>
      </div>
    </header>

    <main class="mx-auto max-w-[1760px] px-2 pb-10 pt-2 sm:px-3 sm:pt-3">
      <template v-if="tab !== 'cv'">
        <!-- player header -->
        <section
          class="relative overflow-hidden rounded-t border border-b-0 border-line bg-panel px-4 py-5 sm:px-6"
        >
          <svg
            class="pointer-events-none absolute -right-16 top-1/2 h-[340px] w-[340px] -translate-y-1/2 opacity-[0.08]"
            viewBox="0 0 340 340"
            aria-hidden="true"
          >
            <circle cx="170" cy="170" r="120" fill="none" stroke="#F1EEFC" stroke-width="3" />
            <circle cx="170" cy="170" r="5" fill="#F1EEFC" />
            <line x1="170" y1="0" x2="170" y2="340" stroke="#F1EEFC" stroke-width="3" />
          </svg>

          <div class="relative flex flex-wrap items-center gap-x-12 gap-y-5">
            <div class="flex min-w-0 items-center gap-4">
              <span
                v-if="hasPhoto"
                class="block h-24 w-24 shrink-0 overflow-hidden rounded-full border-2 border-elite bg-raised sm:h-28 sm:w-28"
              >
                <img
                  :src="player.photo"
                  :alt="'Portrait of ' + player.name"
                  class="avatar-img h-full w-full object-cover object-top"
                />
              </span>
              <div
                v-else
                class="grid h-16 w-16 shrink-0 place-items-center rounded-full border-2 border-elite bg-raised font-display text-3xl font-bold"
              >
                {{ player.initials }}
              </div>
              <div class="min-w-0">
                <h1 class="font-display text-4xl font-bold uppercase leading-none sm:text-5xl">
                  {{ player.name }}
                </h1>
                <p class="mt-1.5 text-mist">{{ player.role }} &middot; {{ player.base }}</p>
                <p class="mt-1.5 flex flex-wrap items-center gap-x-5 gap-y-1 text-sm">
                  <span class="flex items-center gap-1.5" :aria-label="'Current ability ' + player.ability + ' out of 5'">
                    <span class="label">Ability</span>
                    <span aria-hidden="true">
                      <span v-for="s in 5" :key="s" :class="s <= player.ability ? 'text-good' : 'text-mist/30'">&#9733;</span>
                    </span>
                  </span>
                  <span class="flex items-center gap-1.5" :aria-label="'Potential ' + player.potential + ' out of 5'">
                    <span class="label">Potential</span>
                    <span aria-hidden="true">
                      <span v-for="s in 5" :key="s" :class="s <= player.potential ? 'text-good' : 'text-mist/30'">&#9733;</span>
                    </span>
                  </span>
                </p>
              </div>
            </div>

            <dl class="grid min-w-0 flex-1 basis-[420px] grid-cols-2 gap-x-6 gap-y-3 sm:grid-cols-3 2xl:grid-cols-6">
              <div v-for="f in player.facts" :key="f.label" class="min-w-0">
                <dt class="label">{{ f.label }}</dt>
                <dd class="mt-0.5 font-semibold leading-snug" :class="{ 'text-elite': f.highlight }">
                  <span
                    v-if="f.highlight"
                    class="dot-pulse mr-1.5 inline-block h-2 w-2 rounded-full bg-elite align-middle"
                    aria-hidden="true"
                  />{{ f.value }}
                </dd>
              </div>
            </dl>
          </div>
        </section>

        <!-- screens: sits under the header and stays in reach while scrolling -->
        <nav
          class="no-scrollbar sticky top-[77px] z-20 mb-2 flex overflow-x-auto rounded-b border border-line bg-panel px-2 sm:mb-3 sm:px-4"
          aria-label="Screens"
        >
          <button
            v-for="n in nav"
            :key="n.id"
            type="button"
            class="relative shrink-0 whitespace-nowrap px-3 py-2.5 font-display text-[15px] font-semibold uppercase tracking-[0.1em] transition-colors sm:px-4"
            :class="tab === n.id ? 'text-chalk' : 'text-mist hover:text-chalk'"
            :aria-current="tab === n.id ? 'page' : undefined"
            @click="go(n.id)"
          >
            {{ n.label }}
            <span class="ml-1 hidden font-sans text-xs font-normal normal-case tracking-normal text-mist sm:inline">{{ n.hint }}</span>
            <span
              class="absolute inset-x-3 bottom-0 h-[3px] origin-left bg-elite transition-transform duration-300 sm:inset-x-4"
              :class="tab === n.id ? 'scale-x-100' : 'scale-x-0'"
              aria-hidden="true"
            />
          </button>
        </nav>
      </template>

      <transition name="screen" mode="out-in">
        <component :is="screen" v-if="revealed" :key="tab + runKey" />
      </transition>

      <footer class="mt-8 flex flex-wrap items-center justify-between gap-3 px-1 text-xs text-mist">
        <span>&copy; {{ new Date().getFullYear() }} Anthony Akro. Built with Vue, styled as a scout report.</span>
        <span class="flex flex-wrap gap-4">
          <a :href="player.links.github" target="_blank" rel="noopener" class="hover:text-chalk">GitHub</a>
          <a :href="player.links.linkedin" target="_blank" rel="noopener" class="hover:text-chalk">LinkedIn</a>
          <a :href="player.links.blog" target="_blank" rel="noopener" class="hover:text-chalk">Blog</a>
          <a :href="'mailto:' + player.email" class="text-elite hover:text-chalk">{{ player.email }}</a>
        </span>
      </footer>
    </main>
  </div>
</template>
