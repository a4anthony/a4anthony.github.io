<script setup>
import { ref } from "vue";
import Container from "./Container.vue";

const entries = ref([
  {
    id: 1,
    period: "2021.10 — now",
    title: "Full-Stack Software Engineer",
    org: "In Focus Europe · London",
    notes: [
      "Core engineer on an English assessment platform serving 2,200+ companies and 115K+ test takers, with AI-powered proctoring and ATS integrations.",
      "Migrated the entire frontend from Angular to Vue.js and built the shared TypeScript component library that now powers the platform's frontends.",
      "Built “Neo”, a production AI agent that triages support tickets, performs root cause analysis, and authors pull requests — 190+ PRs authored, fixes merged to production.",
      "Introduced Cypress end-to-end testing; design and run the Laravel APIs and MySQL schemas behind the platform.",
    ],
  },
  {
    id: 2,
    period: "2019.08 — 2021.07",
    title: "Software Developer",
    org: "Amela Group",
    notes: [
      "Architected and shipped a scalable e-commerce platform end-to-end: Laravel backend, Vue.js frontend, MySQL schema, production deploy.",
      "Reached 80% browser-test coverage with Laravel Dusk across signup, cart, checkout, and payments.",
      "Built the CI/CD pipeline and hardened production servers — Nginx, SSL, firewall, automated backups.",
    ],
  },
  {
    id: 3,
    period: "2026.06",
    title: "MSc Computer Science & Technology — Distinction",
    org: "Ulster University",
    notes: [
      "Research: Explainable Federated Ensemble Learning for Real-Time Financial Fraud Detection — XGBoost/Random Forest ensembles with SHAP explainability, trained across distributed datasets with Flower.",
    ],
  },
]);
</script>

<template>
  <container title="Experience" eyebrow="/// changelog" anchor="experience">
    <ol class="relative border-l border-hairline">
      <li
        v-for="entry in entries"
        :key="entry.id"
        class="relative pb-14 pl-8 last:pb-0 sm:pl-12"
      >
        <span
          class="absolute -left-[5px] top-1.5 h-[9px] w-[9px] border border-amber bg-ground"
          aria-hidden="true"
        />
        <p class="font-mono text-xs uppercase tracking-[0.2em] text-amber">
          {{ entry.period }}
        </p>
        <h3 class="mt-2 font-display text-2xl font-semibold text-steam">
          {{ entry.title }}
        </h3>
        <p class="mt-1 font-mono text-sm text-faded">{{ entry.org }}</p>
        <ul class="mt-4 max-w-3xl space-y-2.5">
          <li
            v-for="(note, index) in entry.notes"
            :key="index"
            class="flex text-sm leading-relaxed text-faded"
          >
            <span class="mr-3 mt-[7px] h-px w-4 shrink-0 bg-amber/50" aria-hidden="true" />
            <span>{{ note }}</span>
          </li>
        </ul>
      </li>
    </ol>
  </container>
</template>

<style scoped></style>
