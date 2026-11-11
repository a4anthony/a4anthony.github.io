<script setup>
import { ref } from "vue";
import { ChevronDownIcon } from "@heroicons/vue/24/outline/index.js";
import CountUp from "../components/CountUp.vue";
import {
  career,
  careerTotals,
  domains,
  qualifications,
  techBreadth,
} from "../data/profile.js";

const open = ref(career[0].club);
const maxRepos = Math.max(...techBreadth.map((t) => t.repos));
const maxDomain = Math.max(...domains.map((d) => d.repos));
const fmt = (n) => n.toLocaleString("en-GB");
</script>

<template>
  <div class="grid grid-cols-12 gap-3">
    <!-- totals -->
    <section
      class="enter col-span-12 grid grid-cols-2 gap-px overflow-hidden rounded border border-line bg-line sm:grid-cols-5"
      style="--i: 0"
    >
      <div v-for="(t, i) in careerTotals" :key="t.label" class="bg-panel p-4">
        <p class="label">{{ t.label }}</p>
        <p class="mt-1 font-display text-4xl font-bold leading-none text-chalk">
          <span v-if="t.approx" class="text-2xl text-mist">~</span
          ><count-up :to="t.value" :from="0" :duration="1200" :delay="i * 90" :format="fmt" />
        </p>
      </div>
    </section>

    <!-- history -->
    <section class="card enter col-span-12 lg:col-span-8" style="--i: 1">
      <h2 class="card-title">Career history</h2>
      <div class="overflow-x-auto">
        <div class="min-w-[560px]">
          <div class="label grid grid-cols-[88px_1fr_1fr_84px_84px_24px] gap-3 pb-2">
            <span>Seasons</span><span>Club</span><span>Role</span>
            <span class="text-right">Commits</span><span class="text-right">Pull reqs</span><span />
          </div>
          <div v-for="row in career" :key="row.club" class="border-t border-line">
            <button
              type="button"
              class="grid w-full grid-cols-[88px_1fr_1fr_84px_84px_24px] items-center gap-3 py-2.5 text-left text-sm transition-colors hover:bg-raised/60"
              :aria-expanded="open === row.club"
              @click="open = open === row.club ? '' : row.club"
            >
              <span class="tabular-nums text-mist">{{ row.seasons }}</span>
              <span class="font-semibold">{{ row.club }}</span>
              <span class="text-mist">{{ row.role }}</span>
              <span class="text-right font-display text-base font-bold tabular-nums">{{ row.commits }}</span>
              <span class="text-right font-display text-base font-bold tabular-nums">{{ row.prs }}</span>
              <chevron-down-icon
                class="h-4 w-4 text-mist transition-transform duration-200"
                :class="{ 'rotate-180': open === row.club }"
              />
            </button>
            <ul v-if="open === row.club" class="space-y-1.5 pb-4 pl-[100px] pr-6 text-sm text-mist">
              <li v-for="n in row.notes" :key="n" class="enter flex gap-2">
                <span class="mt-2 h-px w-3 shrink-0 bg-elite" aria-hidden="true" />{{ n }}
              </li>
            </ul>
          </div>
        </div>
      </div>
      <p class="mt-3 text-xs text-mist">
        Commits and pull requests authored on each club's main repositories, from a GitHub scan in
        June 2026. Seamward figures are from its own repository.
      </p>
    </section>

    <!-- qualifications -->
    <section class="card enter col-span-12 lg:col-span-4" style="--i: 2">
      <h2 class="card-title">Qualifications</h2>
      <div v-for="q in qualifications" :key="q.title" class="border-b border-line py-3 first:pt-0 last:border-0 last:pb-0">
        <p class="font-semibold">{{ q.title }}</p>
        <p class="mt-0.5 text-sm">
          <span class="font-display font-semibold uppercase tracking-wider text-elite">{{ q.grade }}</span>
          <span class="text-mist"> &middot; {{ q.where }}, {{ q.year }}</span>
        </p>
        <p class="mt-1.5 text-sm text-mist">{{ q.detail }}</p>
      </div>
    </section>

    <!-- breadth -->
    <section class="card enter col-span-12 lg:col-span-7" style="--i: 3">
      <h2 class="card-title">Technology by repository</h2>
      <ul class="space-y-1.5">
        <li
          v-for="(t, i) in techBreadth"
          :key="t.name"
          class="grid grid-cols-[92px_1fr_36px] items-center gap-3 text-sm"
        >
          <span class="truncate text-mist">{{ t.name }}</span>
          <span class="h-3 overflow-hidden rounded-sm bg-ground">
            <span
              class="bar-fill block h-full rounded-sm bg-elite"
              :style="{ width: (t.repos / maxRepos) * 100 + '%', animationDelay: i * 60 + 'ms' }"
            />
          </span>
          <span class="text-right font-display text-base font-bold tabular-nums">{{ t.repos }}</span>
        </li>
      </ul>
      <p class="mt-3 text-xs text-mist">
        Repositories each technology appears in, out of 255. It shows breadth, not equal depth in each.
      </p>
    </section>

    <!-- product domains -->
    <section class="card enter col-span-12 lg:col-span-5" style="--i: 4">
      <h2 class="card-title">Product domains</h2>
      <ul class="space-y-2.5">
        <li v-for="(d, i) in domains" :key="d.name" class="text-sm">
          <div class="flex items-baseline justify-between gap-3">
            <span>{{ d.name }}</span>
            <span class="font-display text-base font-bold tabular-nums">{{ d.repos }}</span>
          </div>
          <span class="mt-1 block h-1.5 overflow-hidden rounded-sm bg-ground">
            <span
              class="bar-fill block h-full rounded-sm bg-good"
              :style="{ width: (d.repos / maxDomain) * 100 + '%', animationDelay: i * 70 + 'ms' }"
            />
          </span>
        </li>
      </ul>
      <p class="mt-3 text-xs text-mist">Repositories by the kind of product they belong to, from the same scan.</p>
    </section>
  </div>
</template>
