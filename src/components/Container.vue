<script setup>
defineProps({
  title: {
    type: String,
    required: true,
  },
  eyebrow: {
    type: String,
    default: "",
  },
  anchor: {
    type: String,
    default: "",
  },
});
</script>

<template>
  <section
    :id="anchor || title.toLowerCase().replace(/\s+/g, '-')"
    class="max-w-6xl px-6 mx-auto py-24 sm:py-28"
  >
    <div class="mb-12 sm:mb-16">
      <span v-if="eyebrow" class="eyebrow mb-4">{{ eyebrow }}</span>
      <h2
        class="font-display text-4xl sm:text-5xl lg:text-6xl font-semibold tracking-tight text-steam"
      >
        {{ title }}
      </h2>
    </div>

    <div>
      <slot></slot>
    </div>
  </section>
</template>

<style scoped></style>
