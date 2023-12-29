<script setup>
defineProps({
  title: {
    type: String,
    required: true,
  },
});
</script>

<template>
  <div
    :id="title.toLowerCase().replace(' ', '-')"
    class="max-w-7xl px-6 mx-auto py-32"
  >
    <div class="border-2-- p-8-- border-zinc-500">
      <h1
        class="text-3xl sm:text-5xl lg:text-7xl mb-16 flex items-center font-semibold"
      >
        {{ title }}
      </h1>
    </div>

    <div>
      <slot></slot>
    </div>
  </div>
</template>

<style scoped></style>
