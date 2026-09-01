<script setup>
import { ref } from "vue";
import Container from "./Container.vue";

const groups = ref([
  {
    label: "languages",
    items: ["PHP", "JavaScript", "TypeScript", "Python", "Go", "SQL", "CSS"],
  },
  {
    label: "databases",
    items: ["MySQL", "PostgreSQL", "MongoDB", "SQLite", "Redis"],
  },
  {
    label: "frameworks & tools",
    items: [
      "Laravel",
      "Vue.js",
      "Inertia.js",
      "Nuxt.js",
      "React",
      "Next.js",
      "Node.js",
      "Fastify",
      "NestJS",
      "Tailwind CSS",
      "Filament",
      "Docker",
      "Nginx",
      "Git",
      "GitHub Actions",
      "Stripe",
    ],
  },
  {
    label: "testing",
    items: ["Pest", "PHPUnit", "Cypress", "Jest", "Vitest", "Laravel Dusk", "Playwright"],
  },
  {
    label: "ai & machine learning",
    items: [
      "LLM Agents",
      "MCP",
      "XGBoost",
      "SHAP",
      "Federated Learning",
      "scikit-learn",
      "Pandas",
    ],
  },
]);
</script>

<template>
  <container title="Stack" eyebrow="/// manifest" anchor="skills">
    <div class="divide-y divide-[rgba(233,228,216,0.14)] border-y border-hairline">
      <div
        v-for="(group, gi) in groups"
        :key="group.label"
        v-reveal="gi * 80"
        class="grid grid-cols-1 gap-4 py-6 sm:grid-cols-[220px_1fr] sm:gap-8"
      >
        <span
          class="font-mono text-xs uppercase tracking-[0.25em] text-amber sm:pt-1.5"
        >
          {{ group.label }}
        </span>
        <div class="flex flex-wrap gap-1.5">
          <span
            v-for="(item, i) in group.items"
            :key="item"
            class="chip chip-in"
            :style="{ '--cd': `${gi * 80 + 150 + i * 30}ms` }"
          >
            {{ item }}
          </span>
        </div>
      </div>
    </div>
  </container>
</template>

<style scoped></style>
