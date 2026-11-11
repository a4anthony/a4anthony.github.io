<script setup>
defineProps({ status: { type: String, required: true } });

const map = {
  live: { label: "Live", text: "text-elite", dot: "bg-elite dot-pulse" },
  early: { label: "Early access", text: "text-good", dot: "bg-good dot-pulse dot-early" },
  oss: { label: "Open source", text: "text-chalk", dot: "border border-chalk" },
  dev: { label: "In development", text: "text-mist", dot: "bg-mist" },
  retired: { label: "Retired", text: "text-mist/70", dot: "border border-mist/60" },
};
</script>

<template>
  <span
    class="inline-flex items-center gap-1.5 whitespace-nowrap font-display text-[13px] font-semibold uppercase tracking-[0.1em]"
    :class="map[status].text"
  >
    <span class="h-1.5 w-1.5 rounded-full" :class="map[status].dot" />
    {{ map[status].label }}
  </span>
</template>

<style scoped>
.dot-early {
  --pulse: rgba(244, 211, 94, 0.5);
}
</style>
