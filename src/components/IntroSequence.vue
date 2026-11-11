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
    class="intro fixed inset-0 z-[100] grid place-items-center bg-ground px-6"
    :class="{ leaving }"
    role="status"
    aria-label="Compiling scout report"
    @click="finish"
  >
    <svg class="pointer-events-none absolute inset-0 h-full w-full opacity-[0.07]" aria-hidden="true">
      <circle cx="50%" cy="50%" r="180" fill="none" stroke="#F1EEFC" stroke-width="2" />
      <line x1="0" y1="50%" x2="100%" y2="50%" stroke="#F1EEFC" stroke-width="2" />
    </svg>

    <div class="relative w-full max-w-[540px]">
      <p class="label !text-elite">Scouting report</p>
      <dl class="mt-4 space-y-1">
        <div
          v-for="(line, i) in lines"
          :key="line[0]"
          class="intro-line flex justify-between gap-6 border-b border-line py-1 font-display text-lg uppercase tracking-[0.1em]"
          :style="{ animationDelay: i * 220 + 'ms' }"
        >
          <dt class="text-mist">{{ line[0] }}</dt>
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

      <p
        class="intro-name mt-8 font-display text-6xl font-bold uppercase leading-none sm:text-7xl"
      >
        Anthony Akro
      </p>
    </div>

    <button type="button" class="label absolute bottom-6 right-6 hover:text-chalk" @click.stop="finish">
      Skip
    </button>
  </div>
</template>
