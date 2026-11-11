<script setup>
import { computed, onMounted, ref } from "vue";
import { ArrowTopRightOnSquareIcon } from "@heroicons/vue/24/outline/index.js";
import CountUp from "../components/CountUp.vue";
import RadarChart from "../components/RadarChart.vue";
import {
  attributeGroups,
  honours,
  player,
  radarAxes,
  roles,
  scoutReport,
  squad,
  traits,
} from "../data/profile.js";
import { timeAgo, useForm, usePings } from "../composables/useLive.js";
import { useTab } from "../composables/useTab.js";

const { go } = useTab();
const { form, formState, load } = useForm();
const { pings, run } = usePings();

const selected = ref(attributeGroups[0].items[0]);

// each radar axis lists the attributes it is built from, with their scores
const scoreOf = Object.fromEntries(
  attributeGroups.flatMap((g) => g.items.map((a) => [a.name, a.value]))
);
const radar = radarAxes.map((axis) => ({
  ...axis,
  parts: axis.from.map((name) => ({ name, value: scoreOf[name] })),
}));

// role fit: the average of the attributes each role leans on
const roleFit = roles.map((role) => ({
  ...role,
  score:
    role.from.reduce((sum, name) => sum + scoreOf[name], 0) / role.from.length,
}));
const activeRole = ref(null);

const tierOf = (v) => (v >= 17 ? "expert" : v >= 14 ? "strong" : "solid");
const tierText = { expert: "text-elite", strong: "text-good", solid: "text-fair" };
const tierBar = { expert: "bg-elite", strong: "bg-good", solid: "bg-fair" };
const tierName = { expert: "Expert", strong: "Strong", solid: "Solid" };

const fitness = computed(() => squad.filter((p) => p.ping));
const formClass = { W: "bg-elite text-[#0f2417]", L: "bg-loss text-[#2b0f0a]", D: "bg-raised text-chalk" };
const formWord = { W: "Deployed", L: "Failed", D: "Cancelled" };

const positions = [
  { label: "Backend", x: 160, y: 100, r: 10, fill: "#7CF29A" },
  { label: "Frontend", x: 250, y: 100, r: 8, fill: "#B9F7C6" },
  { label: "DevOps", x: 66, y: 100, r: 8, fill: "#B9F7C6" },
  { label: "Data", x: 118, y: 152, r: 8, fill: "#B9F7C6" },
  { label: "AI agents", x: 208, y: 52, r: 8, fill: "#F4D35E" },
];

onMounted(() => {
  load();
  run(fitness.value);
});
</script>

<template>
  <div class="grid grid-cols-12 gap-3">
    <!-- attributes -->
    <section class="card enter col-span-12 flex flex-col lg:col-span-7" style="--i: 0">
      <div class="flex flex-wrap items-baseline justify-between gap-x-4">
        <h2 class="card-title">Attributes</h2>
        <p class="mb-3 flex gap-3 text-xs text-mist">
          <span><b class="text-elite">17+</b> Expert</span>
          <span><b class="text-good">14+</b> Strong</span>
          <span><b class="text-fair">11+</b> Solid</span>
        </p>
      </div>
      <!-- rows stretch, so the card fills whatever height the row gives it -->
      <div class="grid flex-1 gap-x-6 gap-y-4 sm:grid-cols-3">
        <div v-for="(group, gi) in attributeGroups" :key="group.name" class="flex flex-col">
          <h3 class="label">{{ group.name }}</h3>
          <ul class="mt-1.5 flex flex-1 flex-col">
            <li v-for="(a, i) in group.items" :key="a.name" class="flex flex-1">
              <button
                type="button"
                class="relative flex min-h-[33px] w-full items-center justify-between gap-3 overflow-hidden border-b border-line px-1.5 py-[5px] text-left text-sm transition-colors"
                :class="[
                  selected === a ? 'bg-raised' : 'hover:bg-raised/60',
                  activeRole?.from.includes(a.name) ? 'ring-1 ring-inset ring-elite/70' : '',
                ]"
                :aria-pressed="selected === a"
                @click="selected = a"
                @mouseenter="selected = a"
              >
                <span
                  class="bar-fill absolute inset-y-0 left-0 opacity-[0.13]"
                  :class="tierBar[tierOf(a.value)]"
                  :style="{ width: a.value * 5 + '%', animationDelay: (gi * 8 + i) * 30 + 'ms' }"
                  aria-hidden="true"
                />
                <span class="relative">{{ a.name }}</span>
                <count-up
                  class="relative font-display text-lg font-bold leading-none"
                  :class="tierText[tierOf(a.value)]"
                  :to="a.value"
                  :delay="(gi * 8 + i) * 30"
                />
              </button>
            </li>
          </ul>
        </div>
      </div>

      <!-- evidence for the selected attribute -->
      <div class="mt-4 min-h-[84px] rounded-sm bg-ground/60 p-3">
        <transition name="swap" mode="out-in">
          <div :key="selected.name" class="flex items-start gap-4">
            <div
              class="w-12 shrink-0 text-center font-display text-5xl font-bold leading-none"
              :class="tierText[tierOf(selected.value)]"
            >
              {{ selected.value }}
            </div>
            <div class="min-w-0">
              <p class="font-display text-base font-semibold uppercase tracking-[0.1em]">
                {{ selected.name }}
                <span class="ml-1 text-mist">{{ tierName[tierOf(selected.value)] }}</span>
              </p>
              <p class="mt-0.5 text-sm text-mist">{{ selected.evidence }}</p>
            </div>
          </div>
        </transition>
      </div>
      <!-- best roles: hover one to see which attributes it is built from -->
      <div class="mt-4" @mouseleave="activeRole = null">
        <h3 class="label">
          Best roles
          <span class="ml-1 font-sans text-xs font-normal normal-case tracking-normal">
            the average of the attributes each role leans on
          </span>
        </h3>
        <ul class="mt-2 grid grid-cols-2 gap-x-5 gap-y-3 md:grid-cols-3 xl:grid-cols-5">
          <li v-for="(role, i) in roleFit" :key="role.name">
            <button
              type="button"
              class="block w-full rounded-sm px-1.5 py-1 text-left transition-colors"
              :class="activeRole === role ? 'bg-raised' : 'hover:bg-raised/60'"
              @mouseenter="activeRole = role"
              @focus="activeRole = role"
              @blur="activeRole = null"
            >
              <span class="flex items-baseline justify-between gap-2">
                <span class="truncate text-sm">{{ role.name }}</span>
                <count-up
                  class="font-display text-lg font-bold leading-none"
                  :class="tierText[tierOf(role.score)]"
                  :to="Math.round(role.score * 10)"
                  :from="0"
                  :delay="500 + i * 90"
                  :format="(n) => (n / 10).toFixed(1)"
                />
              </span>
              <span class="mt-1.5 block h-1.5 overflow-hidden rounded-sm bg-ground">
                <span
                  class="bar-fill block h-full rounded-sm"
                  :class="tierBar[tierOf(role.score)]"
                  :style="{ width: role.score * 5 + '%', animationDelay: 500 + i * 90 + 'ms' }"
                />
              </span>
            </button>
          </li>
        </ul>
      </div>

      <p class="mt-3 text-xs text-mist">
        Scores are self-assessed out of 20. Select any attribute to see the evidence behind it.
      </p>
    </section>

    <!-- radar -->
    <section class="card enter col-span-12 flex flex-col lg:col-span-5" style="--i: 1">
      <h2 class="card-title">Profile</h2>
      <radar-chart :axes="radar" class="flex-1" />
    </section>

    <!-- positions -->
    <section class="card enter col-span-12 sm:col-span-6 lg:col-span-4" style="--i: 2">
      <h2 class="card-title">Positions</h2>
      <svg
        viewBox="0 0 320 200"
        class="block h-auto w-full"
        role="img"
        aria-label="Natural in backend. Accomplished in frontend, data and DevOps. Competent in AI agents."
      >
        <rect
          v-for="s in 8"
          :key="s"
          :x="(s - 1) * 40"
          y="0"
          width="40"
          height="200"
          :fill="s % 2 ? '#241F46' : '#2A2450'"
        />
        <g fill="none" stroke="rgba(241,238,252,0.3)">
          <rect x="6" y="6" width="308" height="188" />
          <line x1="160" y1="6" x2="160" y2="194" />
          <circle cx="160" cy="100" r="26" />
          <rect x="6" y="55" width="44" height="90" />
          <rect x="270" y="55" width="44" height="90" />
        </g>
        <g
          fill="rgba(241,238,252,0.6)"
          font-family="Barlow Condensed, Arial, sans-serif"
          font-size="9"
          letter-spacing="1.6"
          text-anchor="middle"
        >
          <text x="56" y="22">INFRA</text>
          <text x="160" y="22">BACKEND</text>
          <text x="262" y="22">FRONTEND</text>
        </g>
        <g v-for="(p, i) in positions" :key="p.label">
          <circle class="pop" :style="{ '--i': i }" :cx="p.x" :cy="p.y" :r="p.r" :fill="p.fill" />
          <text
            :x="p.x"
            :y="p.y + p.r + 13"
            text-anchor="middle"
            fill="#F1EEFC"
            font-family="Barlow, Arial, sans-serif"
            font-size="9.5"
          >
            {{ p.label }}
          </text>
        </g>
      </svg>
      <p class="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-xs text-mist">
        <span><i class="mr-1.5 inline-block h-2 w-2 rounded-full bg-elite" />Natural</span>
        <span><i class="mr-1.5 inline-block h-2 w-2 rounded-full bg-[#B9F7C6]" />Accomplished</span>
        <span><i class="mr-1.5 inline-block h-2 w-2 rounded-full bg-good" />Competent</span>
      </p>
    </section>

    <!-- scout report -->
    <section class="card enter col-span-12 sm:col-span-6 lg:col-span-4" style="--i: 3">
      <h2 class="card-title">Scout report</h2>
      <ul class="space-y-1.5 text-sm">
        <li v-for="pro in scoutReport.pros" :key="pro" class="flex gap-2">
          <span class="font-display font-bold text-elite" aria-hidden="true">+</span>
          <span>{{ pro }}</span>
        </li>
        <li v-for="con in scoutReport.cons" :key="con" class="flex gap-2">
          <span class="font-display font-bold text-good" aria-hidden="true">&minus;</span>
          <span>{{ con }}</span>
        </li>
      </ul>
      <p
        class="mt-3 border-t border-line pt-3 font-display text-base font-semibold uppercase tracking-[0.08em]"
      >
        Recommendation: <span class="text-elite">{{ scoutReport.verdict }}</span>
      </p>
    </section>

    <!-- form and fitness: live data -->
    <section class="card enter col-span-12 sm:col-span-6 lg:col-span-4" style="--i: 4">
      <h2 class="card-title">
        Form
        <span class="ml-2 text-xs font-medium normal-case tracking-normal text-mist">live from GitHub</span>
      </h2>
      <div v-if="formState === 'ready'" class="flex items-center gap-1.5">
        <a
          v-for="(r, i) in form"
          :key="r.url"
          :href="r.url"
          target="_blank"
          rel="noopener"
          class="flip-in grid h-8 w-8 place-items-center rounded-sm font-display text-lg font-bold"
          :class="formClass[r.result]"
          :style="{ '--i': i }"
          :title="formWord[r.result] + ' ' + timeAgo(r.at)"
        >
          {{ r.result }}
        </a>
        <span class="ml-2 text-xs text-mist">
          Last five deploys of this site. Latest {{ timeAgo(form[0].at) }}.
        </span>
      </div>
      <p v-else-if="formState === 'error'" class="text-sm text-mist">
        GitHub did not answer just now. Deploy history is on
        <a class="underline" href="https://github.com/a4anthony/a4anthony.github.io/actions" target="_blank" rel="noopener">the Actions page</a>.
      </p>
      <p v-else class="text-sm text-mist">Checking the last five deploys.</p>

      <h3 class="label mt-5">
        Match fitness
        <span class="ml-1 text-xs font-medium normal-case tracking-normal">response time from your browser</span>
      </h3>
      <ul class="mt-1.5 text-sm">
        <li
          v-for="p in fitness"
          :key="p.id"
          class="flex items-center justify-between gap-3 border-b border-line py-1"
        >
          <a :href="p.href" target="_blank" rel="noopener" class="truncate hover:text-elite">{{ p.name }}</a>
          <span v-if="pings[p.id]?.state === 'up'" class="font-display text-base font-bold tabular-nums text-elite">
            <count-up :to="pings[p.id].ms" :from="0" :duration="500" /> <span class="text-xs font-medium text-mist">ms</span>
          </span>
          <span v-else-if="pings[p.id]?.state === 'down'" class="text-xs text-loss">No response</span>
          <span v-else class="text-xs text-mist">Checking</span>
        </li>
      </ul>
    </section>

    <!-- traits -->
    <section class="card enter col-span-12 sm:col-span-6 lg:col-span-4" style="--i: 5">
      <h2 class="card-title">Player traits</h2>
      <ul class="space-y-1.5 text-sm">
        <li v-for="t in traits" :key="t" class="flex items-center gap-2.5">
          <span class="h-1.5 w-1.5 rotate-45 bg-elite" aria-hidden="true" />
          {{ t }}
        </li>
      </ul>
    </section>

    <!-- honours -->
    <section class="card enter col-span-12 sm:col-span-6 lg:col-span-4" style="--i: 6">
      <h2 class="card-title">Honours</h2>
      <ul class="text-sm">
        <li
          v-for="h in honours"
          :key="h.title"
          class="flex gap-3 border-b border-line py-1.5 last:border-0"
        >
          <span class="w-10 shrink-0 font-display font-semibold uppercase tracking-wider text-good">{{ h.tag }}</span>
          <span class="min-w-0">
            {{ h.title }}
            <span class="block text-xs text-mist">{{ h.detail }}</span>
          </span>
        </li>
      </ul>
    </section>

    <!-- media -->
    <section class="card enter col-span-12 lg:col-span-4" style="--i: 7">
      <h2 class="card-title">Media and next steps</h2>
      <p class="text-sm text-mist">{{ player.summary }}</p>
      <div class="mt-4 flex flex-wrap gap-2">
        <button type="button" class="btn" @click="go('offer')">Make an offer</button>
        <button type="button" class="btn-ghost" @click="go('squad')">See the squad</button>
      </div>
      <p class="mt-4 flex flex-wrap gap-x-5 gap-y-1 text-sm">
        <a :href="player.links.blog" target="_blank" rel="noopener" class="inline-flex items-center gap-1 hover:text-elite">
          Blog <arrow-top-right-on-square-icon class="h-3.5 w-3.5" />
        </a>
        <a :href="player.links.github" target="_blank" rel="noopener" class="inline-flex items-center gap-1 hover:text-elite">
          GitHub <arrow-top-right-on-square-icon class="h-3.5 w-3.5" />
        </a>
        <a :href="player.links.linkedin" target="_blank" rel="noopener" class="inline-flex items-center gap-1 hover:text-elite">
          LinkedIn <arrow-top-right-on-square-icon class="h-3.5 w-3.5" />
        </a>
      </p>
    </section>
  </div>
</template>
