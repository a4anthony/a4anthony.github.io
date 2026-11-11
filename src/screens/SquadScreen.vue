<script setup>
import { computed, onMounted, ref } from "vue";
import { ArrowTopRightOnSquareIcon } from "@heroicons/vue/24/outline/index.js";
import CountUp from "../components/CountUp.vue";
import StatusBadge from "../components/StatusBadge.vue";
import { positionNames, squad } from "../data/profile.js";
import { usePings } from "../composables/useLive.js";

const { pings, run } = usePings();

const starters = computed(() => squad.filter((p) => !p.bench));
const bench = computed(() => squad.filter((p) => p.bench));
const selectedId = ref("seamward");
const selected = computed(() => squad.find((p) => p.id === selectedId.value));

// players start on the centre spot, then run to their positions
const reduce =
  typeof window !== "undefined" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const kickoff = ref(!reduce);

onMounted(() => {
  run(squad.filter((p) => p.ping));
  if (!reduce) setTimeout(() => (kickoff.value = false), 60);
});

const tokenClass = (p) =>
  p.id === selectedId.value
    ? "border-elite bg-elite text-[#0f2417] scale-110"
    : "border-chalk/70 bg-ground text-chalk group-hover:border-elite";
</script>

<template>
  <div class="grid grid-cols-12 gap-3">
    <!-- tactics board -->
    <section class="card enter col-span-12 lg:col-span-4 lg:row-span-2" style="--i: 0">
      <div class="flex items-baseline justify-between">
        <h2 class="card-title">Tactics</h2>
        <p class="mb-3 font-display text-sm font-semibold uppercase tracking-[0.12em] text-mist">4-3-3 &middot; products up front</p>
      </div>
      <div
        class="relative mx-auto aspect-[3/4] w-full max-w-[460px] overflow-hidden rounded-sm"
        :class="{ kickoff }"
      >
        <svg viewBox="0 0 300 400" class="absolute inset-0 h-full w-full" aria-hidden="true">
          <rect
            v-for="s in 8"
            :key="s"
            x="0"
            :y="(s - 1) * 50"
            width="300"
            height="50"
            :fill="s % 2 ? '#241F46' : '#2A2450'"
          />
          <g fill="none" stroke="rgba(241,238,252,0.28)">
            <rect x="8" y="8" width="284" height="384" />
            <line x1="8" y1="200" x2="292" y2="200" />
            <circle cx="150" cy="200" r="34" />
            <rect x="80" y="8" width="140" height="52" />
            <rect x="80" y="340" width="140" height="52" />
            <rect x="118" y="8" width="64" height="20" />
            <rect x="118" y="372" width="64" height="20" />
          </g>
        </svg>
        <button
          v-for="(p, i) in starters"
          :key="p.id"
          type="button"
          class="token group absolute flex w-[92px] -translate-x-1/2 -translate-y-1/2 flex-col items-center"
          :style="{ left: p.x + '%', top: p.y + '%', '--i': i }"
          :aria-pressed="p.id === selectedId"
          :title="positionNames[p.pos]"
          @click="selectedId = p.id"
          @mouseenter="selectedId = p.id"
        >
          <span
            class="grid h-9 w-9 place-items-center rounded-full border-2 font-display text-base font-bold transition-all duration-200"
            :class="tokenClass(p)"
          >
            {{ p.no }}
          </span>
          <span
            class="mt-1 rounded-sm bg-ground/85 px-1.5 py-px text-center text-[11px] font-medium leading-tight"
          >
            {{ p.short }}<span v-if="p.captain" class="ml-1 text-good">(C)</span>
          </span>
        </button>
      </div>
      <div class="mt-3 flex flex-wrap items-center gap-2">
        <span class="label">Bench</span>
        <button
          v-for="p in bench"
          :key="p.id"
          type="button"
          class="chip transition-colors hover:border-elite hover:text-chalk"
          :class="{ '!border-elite !text-chalk': p.id === selectedId }"
          @click="selectedId = p.id"
        >
          {{ p.no }} &middot; {{ p.name }}
        </button>
      </div>
    </section>

    <!-- selected player -->
    <section class="card enter col-span-12 lg:col-span-8" style="--i: 1">
      <transition name="swap" mode="out-in">
        <div :key="selected.id">
          <div class="flex flex-wrap items-start justify-between gap-3">
            <div class="flex items-center gap-4">
              <span
                class="grid h-14 w-14 shrink-0 place-items-center rounded-full border-2 border-elite font-display text-2xl font-bold"
              >
                {{ selected.no }}
              </span>
              <div>
                <h2 class="font-display text-3xl font-bold uppercase leading-none sm:text-4xl">
                  {{ selected.name }}
                </h2>
                <p class="mt-1 text-sm text-mist">
                  {{ selected.type }} &middot; {{ positionNames[selected.pos] }}
                </p>
              </div>
            </div>
            <status-badge :status="selected.status" />
          </div>

          <p class="mt-4 max-w-[62ch] text-[15px] leading-relaxed">{{ selected.desc }}</p>

          <dl class="mt-4 grid gap-x-8 gap-y-3 sm:grid-cols-2">
            <div>
              <dt class="label">Key fact</dt>
              <dd class="mt-0.5 text-sm">{{ selected.stat }}</dd>
            </div>
            <div v-if="selected.ping">
              <dt class="label">Response time, measured now</dt>
              <dd class="mt-0.5 text-sm">
                <span v-if="pings[selected.id]?.state === 'up'" class="font-display text-xl font-bold text-elite">
                  <count-up :to="pings[selected.id].ms" :from="0" :duration="500" /> ms
                </span>
                <span v-else-if="pings[selected.id]?.state === 'down'" class="text-loss">No response</span>
                <span v-else class="text-mist">Checking</span>
              </dd>
            </div>
          </dl>

          <div class="mt-4 flex flex-wrap gap-1.5">
            <span v-for="t in selected.stack" :key="t" class="chip">{{ t }}</span>
          </div>

          <a
            v-if="selected.href"
            :href="selected.href"
            target="_blank"
            rel="noopener"
            class="btn mt-5"
          >
            {{ selected.linkLabel }}
            <arrow-top-right-on-square-icon class="h-4 w-4" />
          </a>
        </div>
      </transition>
    </section>

    <!-- squad list -->
    <section class="card enter col-span-12 lg:col-span-8" style="--i: 2">
      <h2 class="card-title">Squad list</h2>
      <div class="overflow-x-auto">
        <table class="w-full min-w-[680px] text-left text-sm">
          <thead>
            <tr class="label">
              <th class="pb-2 pr-3 font-semibold">No</th>
              <th class="pb-2 pr-3 font-semibold">Project</th>
              <th class="pb-2 pr-3 font-semibold">Pos</th>
              <th class="pb-2 pr-3 font-semibold">Type</th>
              <th class="pb-2 pr-3 font-semibold">Status</th>
              <th class="pb-2 pr-3 font-semibold">Stack</th>
              <th class="pb-2 text-right font-semibold">Response</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="p in squad"
              :key="p.id"
              class="cursor-pointer border-t border-line transition-colors"
              :class="p.id === selectedId ? 'bg-raised' : 'hover:bg-raised/60'"
              @click="selectedId = p.id"
            >
              <td class="py-2 pl-1.5 pr-3 font-display text-base font-bold tabular-nums">{{ p.no }}</td>
              <td class="py-2 pr-3 font-semibold">
                <button type="button" class="text-left" @click.stop="selectedId = p.id">
                  {{ p.name }}<span v-if="p.captain" class="ml-1 text-good">(C)</span>
                </button>
              </td>
              <td class="py-2 pr-3 font-display font-semibold uppercase tracking-wider text-mist" :title="positionNames[p.pos]">{{ p.pos }}</td>
              <td class="py-2 pr-3 text-mist">{{ p.type }}</td>
              <td class="py-2 pr-3"><status-badge :status="p.status" /></td>
              <td class="py-2 pr-3 text-mist">{{ p.stack.slice(0, 3).join(", ") }}</td>
              <td class="py-2 pr-1.5 text-right font-display text-base font-bold tabular-nums">
                <span v-if="!p.ping" class="font-sans text-sm font-normal text-mist/60">&ndash;</span>
                <span v-else-if="pings[p.id]?.state === 'up'" class="text-elite">{{ pings[p.id].ms }} ms</span>
                <span v-else-if="pings[p.id]?.state === 'down'" class="font-sans text-xs font-normal text-loss">No response</span>
                <span v-else class="font-sans text-xs font-normal text-mist">Checking</span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>
  </div>
</template>
