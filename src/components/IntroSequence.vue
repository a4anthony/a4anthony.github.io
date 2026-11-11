<script setup>
import { onBeforeUnmount, onMounted, ref } from "vue";
import CountUp from "./CountUp.vue";

// A scout report being compiled. `reveal` fires as the curtain starts to lift
// (so the screen behind can begin its own animations), `done` when it is gone.
const emit = defineEmits(["reveal", "done"]);

const lines = [
  ["Assignment", "Full-stack software engineer"],
  ["Region", "Manchester, UK"],
  ["Sources", "255 repositories, 7 seasons"],
];

const leaving = ref(false);
let timers = [];

const finish = () => {
  if (leaving.value) return;
  leaving.value = true;
  emit("reveal");
  timers.push(setTimeout(() => emit("done"), 650));
};

const onKey = (e) => {
  if (["Escape", "Enter", " "].includes(e.key)) finish();
};

onMounted(() => {
  timers.push(setTimeout(finish, 2500));
  window.addEventListener("keydown", onKey);
});
onBeforeUnmount(() => {
  timers.forEach(clearTimeout);
  window.removeEventListener("keydown", onKey);
});
</script>

<template>
  <div
    class="intro fixed inset-0 z-[100] grid grid-cols-1 place-items-center overflow-hidden bg-ground px-6"
    :class="{ leaving }"
    role="status"
    aria-label="Compiling scout report"
    @click="finish"
  >
    <svg class="pointer-events-none absolute inset-0 h-full w-full opacity-[0.07]" aria-hidden="true">
      <circle cx="50%" cy="50%" r="180" fill="none" stroke="#F1EEFC" stroke-width="2" />
      <line x1="0" y1="50%" x2="100%" y2="50%" stroke="#F1EEFC" stroke-width="2" />
    </svg>

    <!-- min-w-0 and overflow-hidden: nothing inside may ever widen the panel past the screen -->
    <div class="relative w-full min-w-0 max-w-[540px] overflow-hidden">
      <p class="label !text-elite">Scouting report</p>
      <dl class="mt-4 space-y-1">
        <div
          v-for="(line, i) in lines"
          :key="line[0]"
          class="intro-line flex justify-between gap-4 border-b border-line py-1 font-display text-[15px] uppercase tracking-[0.06em] sm:gap-6 sm:text-lg sm:tracking-[0.1em]"
          :style="{ animationDelay: i * 220 + 'ms' }"
        >
          <dt class="shrink-0 text-mist">{{ line[0] }}</dt>
          <dd class="text-right">{{ line[1] }}</dd>
        </div>
      </dl>

      <div class="mt-6 h-1 overflow-hidden bg-line">
        <div class="intro-bar h-full bg-elite" />
      </div>
      <p class="label mt-2 flex justify-between">
        <span>Compiling report</span>
        <span><count-up :to="100" :from="0" :duration="1400" :delay="200" />%</span>
      </p>

      <!-- sized to the screen so the name always fits on one line -->
      <p
        class="intro-name mt-8 whitespace-nowrap font-display text-[clamp(2.25rem,13vw,4.5rem)] font-bold uppercase leading-none"
      >
        Anthony Akro
      </p>
    </div>

    <button type="button" class="label absolute bottom-6 right-6 hover:text-chalk" @click.stop="finish">
      Skip
    </button>
  </div>
</template>
