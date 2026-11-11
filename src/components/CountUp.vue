<script setup>
import { onBeforeUnmount, onMounted, ref, watch } from "vue";

const props = defineProps({
  to: { type: Number, required: true },
  from: { type: Number, default: 1 },
  duration: { type: Number, default: 850 },
  delay: { type: Number, default: 0 },
  format: { type: Function, default: (n) => String(n) },
});

// Rest state is the final value, so the number is right even if no timer runs.
const shown = ref(props.to);
let timer;

const reduce =
  typeof window !== "undefined" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

const run = () => {
  clearInterval(timer);
  if (reduce) {
    shown.value = props.to;
    return;
  }
  const start = Date.now() + props.delay;
  shown.value = props.from;
  timer = setInterval(() => {
    const p = Math.min(1, Math.max(0, (Date.now() - start) / props.duration));
    shown.value = Math.round(
      props.from + (props.to - props.from) * (1 - Math.pow(1 - p, 3))
    );
    if (p >= 1) clearInterval(timer);
  }, 16);
};

onMounted(run);
watch(() => props.to, run);
onBeforeUnmount(() => clearInterval(timer));
</script>

<template>
  <span class="tabular-nums">{{ format(shown) }}</span>
</template>
