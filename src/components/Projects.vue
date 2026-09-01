<script setup>
import { computed, ref } from "vue";
import { ArrowTopRightOnSquareIcon } from "@heroicons/vue/24/outline/index.js";
import Container from "./Container.vue";

const statuses = {
  live: { label: "live", text: "text-live", dot: "dot-live" },
  early: { label: "early access", text: "text-amber", dot: "dot-early" },
  oss: {
    label: "open source",
    text: "text-amber",
    dot: "border border-amber bg-transparent",
  },
  dev: { label: "in development", text: "text-faded", dot: "bg-faded" },
};

const projects = ref([
  {
    id: 12,
    title: "Seamward",
    href: "https://seamward.com",
    status: "early",
    description:
      "Integration reliability control plane: observes third-party API and webhook traffic from the side, detects contract drift, replays redacted traffic in a network-denied sandbox, and validates repairs before a human ships them. Founder venture.",
    stack: [
      "TypeScript",
      "Fastify",
      "Next.js 15",
      "Prisma",
      "PostgreSQL",
      "MCP",
      "Turborepo",
    ],
  },
  {
    id: 1,
    title: "Hired By Code",
    href: "https://hiredbycode.com",
    status: "live",
    description:
      "AI-powered CV builder that mines GitHub activity — repos, PRs, commit patterns — to generate ATS-optimised CVs and track job applications.",
    stack: ["Laravel 12", "Vue 3", "Inertia", "TypeScript", "Stripe", "Redis"],
  },
  {
    id: 2,
    title: "Kuponify",
    href: "https://kuponify.com",
    status: "live",
    description:
      "API-first coupon management for e-commerce: multi-tenant stores, revenue analytics, tiered billing, and an OAuth2-secured API.",
    stack: ["Laravel 12", "Vue 3", "Chart.js", "Passport", "Stripe"],
  },
  {
    id: 3,
    title: "Eavesdroppr",
    href: "https://eavesdroppr.com",
    status: "live",
    description:
      "Content publishing platform for an African-diaspora lifestyle audience — full-text search, queued media pipeline, structured-data SEO.",
    stack: ["Laravel 12", "Inertia", "Vue 3", "Filament", "Meilisearch"],
  },
  {
    id: 11,
    title: "Linkwire",
    href: "https://links.a4anthony.com",
    status: "live",
    description:
      "Multi-tenant URL shortener and click-analytics service in Go — Redis-first redirect path, non-blocking analytics pipeline, per-tenant rate limiting, and signed webhooks. Portfolio/demo project.",
    stack: ["Go", "Gin", "PostgreSQL", "Redis", "React", "Prometheus", "Docker"],
  },
  {
    id: 14,
    title: "Go Webhook Hub",
    href: "https://github.com/a4anthony/go-webhook-hub",
    status: "oss",
    description:
      "High-concurrency webhook ingestion and delivery — HMAC verification, JetStream at-least-once processing, backoff with jitter, per-destination circuit breakers, dead-letter replay. Chaos-tested.",
    stack: ["Go", "Gin", "NATS JetStream", "PostgreSQL", "Prometheus", "Docker"],
  },
  {
    id: 13,
    title: "Agent Platform",
    href: "https://github.com/a4anthony/agent-platform",
    status: "oss",
    description:
      "Self-hostable LLM agent operations platform — budgeted tool execution, SSE streaming, pgvector semantic memory, versioned prompts, human approvals, and YAML evaluation suites.",
    stack: ["Python", "FastAPI", "PostgreSQL", "pgvector", "React", "Prometheus"],
  },
  {
    id: 10,
    title: "Proctoring Platform",
    href: "",
    status: "dev",
    description:
      "Multi-tenant proctoring SaaS in a TypeScript monorepo — browser SDK with webcam recording and behavioural observers, Python face analysis, queued post-hoc runs.",
    stack: ["TypeScript", "NestJS", "Next.js", "Prisma", "PostgreSQL", "Docker"],
  },
  {
    id: 4,
    title: "TheEnglishQuiz",
    href: "https://theenglishquiz.com",
    status: "live",
    description:
      "English assessment platform serving 2,200+ companies and 115K+ test takers, with AI proctoring and ATS integrations. Core engineer since 2021.",
    stack: ["Laravel", "Vue.js", "MySQL", "Cypress"],
  },
  {
    id: 5,
    title: "FluentNow",
    href: "https://fluentnow.co",
    status: "live",
    description:
      "Language learning platform with lesson scheduling, progress tracking, and self-hosted video classrooms with SSO hand-off from bookings.",
    stack: ["Laravel", "Vue 2", "Jitsi Meet", "Redis", "Nginx"],
  },
  {
    id: 6,
    title: "MelaMart",
    href: "https://www.melamartonline.com",
    status: "live",
    description:
      "E-commerce platform built greenfield to launch — Stripe payments with webhook-driven order lifecycle and 80% browser-test coverage.",
    stack: ["Laravel", "Vue.js", "MySQL", "Dusk"],
  },
  {
    id: 7,
    title: "Whereby-Laravel",
    href: "https://github.com/a4anthony/whereby-laravel",
    status: "oss",
    description:
      "Laravel wrapper for the Whereby video API — fluent interface, service-provider auto-discovery, PHPUnit suite. Published on Packagist.",
    stack: ["PHP 8+", "Laravel", "PHPUnit"],
  },
  {
    id: 8,
    title: "Coupon Generator",
    href: "https://github.com/a4anthony/coupon",
    status: "oss",
    description:
      "Coupon generation and validation for Laravel with a publishable dashboard, configurable rules, expiry handling, and redemption limits.",
    stack: ["PHP 8+", "Laravel", "Blade", "PHPUnit"],
  },
  {
    id: 9,
    title: "Cartavel",
    href: "https://github.com/a4anthony/cartavel",
    status: "oss",
    description:
      "Session-backed cart management for Laravel — facade-driven API with item-level metadata and pluggable storage drivers.",
    stack: ["PHP 8+", "Laravel", "PHPUnit"],
  },
]);

const eyebrow = computed(
  () => `/// service registry — ${projects.value.length} entries`
);
</script>

<template>
  <container title="Projects" :eyebrow="eyebrow">
    <div
      class="grid grid-cols-1 gap-px border border-hairline bg-ground md:grid-cols-2 lg:grid-cols-3"
    >
      <article
        v-for="(project, index) in projects"
        :key="project.id"
        v-reveal="(index % 3) * 90"
        class="group relative flex flex-col bg-panel p-6 transition-colors duration-300 hover:bg-panel/60 before:absolute before:inset-x-0 before:top-0 before:h-px before:origin-left before:scale-x-0 before:bg-amber before:transition-transform before:duration-500 before:ease-out before:content-[''] hover:before:scale-x-100"
      >
        <div class="flex items-center justify-between">
          <span
            class="inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.2em]"
            :class="statuses[project.status].text"
          >
            <span
              class="dot-pop h-1.5 w-1.5 rounded-full"
              :class="statuses[project.status].dot"
            />
            {{ statuses[project.status].label }}
          </span>
          <arrow-top-right-on-square-icon
            v-if="project.href"
            class="h-4 w-4 text-faded transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-amber"
          />
        </div>

        <h3 class="mt-4 font-display text-xl font-semibold text-steam">
          <a
            v-if="project.href"
            :href="project.href"
            target="_blank"
            rel="noopener"
          >
            <span class="absolute inset-0" />
            {{ project.title }}
          </a>
          <template v-else>{{ project.title }}</template>
        </h3>

        <p class="mt-3 flex-1 text-sm leading-relaxed text-faded">
          {{ project.description }}
        </p>

        <div class="mt-5 flex flex-wrap gap-1.5">
          <span
            v-for="(tech, i) in project.stack"
            :key="tech"
            class="chip chip-in"
            :style="{ '--cd': `${(index % 3) * 90 + 250 + i * 40}ms` }"
          >
            {{ tech }}
          </span>
        </div>
      </article>
    </div>
  </container>
</template>

<style scoped></style>
