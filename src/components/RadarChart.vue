<script setup>
import { computed, onBeforeUnmount, onMounted, ref } from "vue";

const props = defineProps({
  // [{ label, value, parts: [{ name, value }] }]
  axes: { type: Array, required: true },
});

const C = 110;
const SCALE = 4.4; // 20 points = 88 units

const point = (i, r) => {
  const a = ((-90 + (i * 360) / props.axes.length) * Math.PI) / 180;
  return [C + Math.cos(a) * r, C + Math.sin(a) * r];
};
const ring = (v) =>
  props.axes.map((_, i) => point(i, v * SCALE).join(",")).join(" ");

const shape = computed(() =>
  props.axes.map((a, i) => point(i, a.value * SCALE).join(",")).join(" ")
);
const spokes = computed(() =>
  props.axes.map((a, i) => {
    const [x, y] = point(i, 88);
    const [lx, ly] = point(i, 104);
    const [vx, vy] = point(i, a.value * SCALE);
    return {
      ...a,
      x,
      y,
      lx,
      ly: ly + 4,
      vx,
      vy,
      anchor: lx < 100 ? "end" : lx > 120 ? "start" : "middle",
    };
  })
);

// One axis is always in focus. It moves round on its own until the visitor
// points at one, and resumes when they leave.
const active = ref(0);
const current = computed(() => props.axes[active.value]);
let timer;
const reduce =
  typeof window !== "undefined" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

const start = () => {
  if (reduce) return;
  clearInterval(timer);
  timer = setInterval(() => {
    active.value = (active.value + 1) % props.axes.length;
  }, 2600);
};
const focus = (i) => {
  clearInterval(timer);
  active.value = i;
};

onMounted(() => {
  if (!reduce) timer = setTimeout(start, 2200);
});
onBeforeUnmount(() => {
  clearInterval(timer);
  clearTimeout(timer);
});
</script>

<template>
  <div class="flex flex-col" @mouseleave="start">
    <!-- the chart sits in the middle of any spare height; the breakdown stays at the bottom -->
    <div class="flex flex-1 items-center">
    <svg
      viewBox="-76 -12 372 248"
      class="mx-auto block h-auto w-full max-w-[620px]"
      role="img"
      :aria-label="
        'Strengths out of 20: ' +
        axes.map((a) => a.label + ' ' + a.value).join(', ')
      "
    >
      <!-- grid: rings then spokes draw themselves -->
      <polygon
        v-for="(v, i) in [5, 10, 15, 20]"
        :key="v"
        class="radar-line"
        :style="{ '--i': i }"
        :points="ring(v)"
        pathLength="1"
        fill="none"
        stroke="rgba(241,238,252,0.14)"
      />
      <line
        v-for="(s, i) in spokes"
        :key="'spoke-' + s.label"
        class="radar-line"
        :style="{ '--i': 4 + i }"
        :x1="C"
        :y1="C"
        :x2="s.x"
        :y2="s.y"
        pathLength="1"
        stroke="rgba(241,238,252,0.14)"
      />

      <!-- scan -->
      <g class="radar-sweep" aria-hidden="true">
        <path d="M110 110 L110 22 A88 88 0 0 0 60.8 37.05 Z" fill="rgba(124,242,154,0.16)" />
        <line x1="110" y1="110" x2="110" y2="22" stroke="#7CF29A" stroke-width="1.5" />
      </g>

      <!-- the focused axis -->
      <line
        :x1="C"
        :y1="C"
        :x2="spokes[active].x"
        :y2="spokes[active].y"
        stroke="#7CF29A"
        stroke-opacity="0.55"
        stroke-width="1.5"
        style="transition: all 0.35s ease"
      />

      <g class="radar-shape">
        <polygon
          :points="shape"
          fill="rgba(124,242,154,0.2)"
          stroke="#7CF29A"
          stroke-width="1.6"
          stroke-linejoin="round"
        />
        <circle
          v-for="(s, i) in spokes"
          :key="'dot-' + s.label"
          class="radar-vertex"
          :cx="s.vx"
          :cy="s.vy"
          :r="i === active ? 5.5 : 3"
          :fill="i === active ? '#F1EEFC' : '#7CF29A'"
          stroke="#7CF29A"
          stroke-width="1.5"
        />
      </g>

      <g
        v-for="(s, i) in spokes"
        :key="'label-' + s.label"
        class="cursor-pointer"
        @mouseenter="focus(i)"
        @click="focus(i)"
      >
        <circle :cx="s.lx" :cy="s.ly - 4" r="26" fill="transparent" />
        <text
          :x="s.lx"
          :y="s.ly"
          :text-anchor="s.anchor"
          :fill="i === active ? '#F1EEFC' : '#A8A2C8'"
          font-family="Barlow Condensed, Arial, sans-serif"
          font-size="12"
          letter-spacing="1"
          style="transition: fill 0.25s ease"
        >
          {{ s.label.toUpperCase() }}
          <tspan :fill="i === active ? '#7CF29A' : '#F1EEFC'" font-weight="700" dx="3">{{ s.value }}</tspan>
        </text>
      </g>
    </svg>
    </div>

    <!-- what the focused score is made of -->
    <div class="mt-3 min-h-[92px] rounded-sm bg-ground/60 p-3">
      <transition name="swap" mode="out-in">
        <div :key="current.label" class="flex items-start gap-4">
          <div class="w-12 shrink-0 text-center font-display text-5xl font-bold leading-none text-elite">
            {{ current.value }}
          </div>
          <div class="min-w-0">
            <p class="font-display text-base font-semibold uppercase tracking-[0.1em]">
              {{ current.label }}
              <span class="ml-1 text-mist">built from</span>
            </p>
            <p class="mt-1.5 flex flex-wrap gap-1.5">
              <span v-for="p in current.parts" :key="p.name" class="chip">
                {{ p.name }}
                <b class="ml-1.5 font-display text-sm text-chalk">{{ p.value }}</b>
              </span>
            </p>
          </div>
        </div>
      </transition>
    </div>
  </div>
</template>
