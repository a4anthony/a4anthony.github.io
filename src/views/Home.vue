<script setup>
import { onBeforeUnmount, onMounted, ref } from "vue";
import { ArrowTopRightOnSquareIcon } from "@heroicons/vue/24/outline/index.js";
import Projects from "../components/Projects.vue";
import Experience from "../components/Experience.vue";
import Skills from "../components/Skills.vue";
import Contact from "../components/Contact.vue";
import ScrollToTop from "../components/ScrollToTop.vue";

const prefersReducedMotion =
  typeof window !== "undefined" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

// the frameworks vary by project; the loop doesn't
const frontends = ["vue", "nuxt", "react", "inertia"];
const backends = ["laravel", "nestjs", "node", "go", "python"];
const stores = ["mysql", "postgres"];
const frontendIndex = ref(0);
const backendIndex = ref(0);
const storeIndex = ref(0);
let cycleTimer;

// nav: scroll progress + active section
const progress = ref(0);
const activeSection = ref("");
let sectionObserver;

// ambient cursor light
const glow = ref({ x: -1000, y: -1000 });
const onPointerMove = (e) => {
  glow.value = { x: e.clientX, y: e.clientY };
};

const onScroll = () => {
  const max = document.documentElement.scrollHeight - window.innerHeight;
  progress.value = max > 0 ? Math.min(1, window.scrollY / max) : 0;
};

onMounted(() => {
  cycleTimer = setInterval(() => {
    frontendIndex.value = (frontendIndex.value + 1) % frontends.length;
    backendIndex.value = (backendIndex.value + 1) % backends.length;
    if (backendIndex.value % 2 === 0) {
      storeIndex.value = (storeIndex.value + 1) % stores.length;
    }
  }, 3000);

  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  if ("IntersectionObserver" in window) {
    sectionObserver = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) activeSection.value = `#${entry.target.id}`;
        }
      },
      { rootMargin: "-40% 0px -55% 0px", threshold: 0 }
    );
    for (const link of navLinks) {
      const el = document.querySelector(link.href);
      if (el) sectionObserver.observe(el);
    }
  }
});

onBeforeUnmount(() => {
  clearInterval(cycleTimer);
  window.removeEventListener("scroll", onScroll);
  sectionObserver?.disconnect();
});

const navLinks = [
  { label: "projects", href: "#projects" },
  { label: "changelog", href: "#experience" },
  { label: "stack", href: "#skills" },
  { label: "contact", href: "#contact" },
];

const statusLine = [
  { label: "role", value: "Full-Stack Engineer" },
  { label: "base", value: "Manchester, UK" },
  { label: "current", value: "In Focus Europe" },
  { label: "building", value: "Seamward" },
  { label: "education", value: "MSc, Distinction" },
];
</script>

<template>
  <div class="relative isolate min-h-screen" @pointermove="onPointerMove">
    <div
      v-if="!prefersReducedMotion"
      class="cursor-glow"
      :style="{ '--mx': glow.x + 'px', '--my': glow.y + 'px' }"
      aria-hidden="true"
    />

    <!-- nav -->
    <nav
      v-reveal
      class="fixed inset-x-0 top-0 z-50 border-b border-hairline bg-ground/85 backdrop-blur"
    >
      <div
        class="mx-auto flex h-14 max-w-6xl items-center justify-between px-6"
      >
        <a href="#top" class="font-mono text-sm font-semibold text-steam">
          a4anthony<span class="text-amber">.com</span>
        </a>
        <div class="flex items-center gap-5 sm:gap-7">
          <a
            v-for="link in navLinks"
            :key="link.href"
            :href="link.href"
            class="hidden font-mono text-xs transition-colors duration-300 sm:block"
            :class="
              activeSection === link.href
                ? 'text-steam'
                : 'text-faded hover:text-steam'
            "
          >
            <span
              class="mr-1.5 inline-block transition-opacity duration-300"
              :class="activeSection === link.href ? 'opacity-100 text-amber' : 'opacity-0'"
              aria-hidden="true"
              >/</span
            >{{ link.label }}
          </a>
          <a
            href="https://blog.a4anthony.com/"
            target="_blank"
            rel="noopener"
            class="inline-flex items-center font-mono text-xs text-amber hover:text-steam"
          >
            blog <arrow-top-right-on-square-icon class="ml-1 h-3.5 w-3.5" />
          </a>
        </div>
      </div>
      <!-- scroll progress -->
      <div
        class="absolute inset-x-0 bottom-0 h-px w-full origin-left bg-amber"
        :style="{ transform: `scaleX(${progress})` }"
        aria-hidden="true"
      />
    </nav>

    <!-- hero -->
    <header id="top" class="mx-auto max-w-6xl px-6 pb-16 pt-36 sm:pt-44">
      <p v-reveal.wipe="120" class="eyebrow mb-6">
        Manchester, UK — Full-Stack Software Engineer
      </p>
      <h1
        v-reveal.wipe="280"
        class="font-display text-5xl font-bold tracking-tight text-steam sm:text-7xl lg:text-8xl"
      >
        Anthony Akro<span class="text-amber">.</span>
      </h1>
      <p
        v-reveal="520"
        class="mt-8 max-w-2xl text-lg leading-relaxed text-faded"
      >
        I build web applications and keep them running in production: the
        interface, the API behind it, and the infrastructure underneath. Seven
        years across the PHP and TypeScript ecosystems — Laravel and Vue at the
        core; NestJS, Go, and Python where the job calls for them. Lately:
        founding Seamward, an integration-reliability control plane, alongside
        a production AI agent that ships real fixes, and an MSc in Computer
        Science with research in federated machine learning and explainable
        AI.
      </p>

      <!-- status line: values resolve one after another, like a readout -->
      <dl
        v-reveal="700"
        class="mt-10 flex flex-wrap gap-x-10 gap-y-4 border-y border-hairline py-4"
      >
        <div
          v-for="(item, i) in statusLine"
          :key="item.label"
          v-reveal.wipe="900 + i * 110"
        >
          <dt class="font-mono text-[11px] uppercase tracking-[0.25em] text-faded">
            {{ item.label }}
          </dt>
          <dd class="mt-1 font-mono text-sm text-steam">{{ item.value }}</dd>
        </div>
      </dl>

      <div v-reveal="1250" class="mt-10 flex flex-wrap items-center gap-4">
        <a href="#contact" class="btn">Get in touch</a>
        <a
          href="https://blog.a4anthony.com/"
          target="_blank"
          rel="noopener"
          class="btn-ghost"
        >
          Read the blog
          <arrow-top-right-on-square-icon class="ml-2 h-4 w-4" />
        </a>
        <div class="ml-1 flex items-center gap-5">
          <a
            href="https://github.com/a4anthony"
            target="_blank"
            rel="noopener"
            class="font-mono text-xs text-faded underline decoration-hairline underline-offset-4 hover:text-steam"
            >github</a
          >
          <a
            href="https://www.linkedin.com/in/anthony-akro-21a469165/"
            target="_blank"
            rel="noopener"
            class="font-mono text-xs text-faded underline decoration-hairline underline-offset-4 hover:text-steam"
            >linkedin</a
          >
        </div>
      </div>

      <!-- signature: the full loop — runtime lane + delivery lane -->
      <figure v-reveal="1450" class="mt-20">
        <div class="overflow-x-auto">
          <svg
            viewBox="0 0 780 270"
            class="w-full min-w-[640px]"
            role="img"
            aria-label="The full stack loop: a browser app calling nginx, an API and its databases, plus a delivery lane where git push runs CI tests and deploys to production, with Sentry watching for errors"
          >
            <!-- lane labels -->
            <g
              fill="#90A5A6"
              font-family="IBM Plex Mono, monospace"
              font-size="11"
            >
              <text x="4" y="40">runtime — every request</text>
              <text x="4" y="200">delivery — every merge</text>
            </g>

            <!-- wires -->
            <g stroke="rgba(233,228,216,0.2)" stroke-width="1" fill="none">
              <!-- runtime lane -->
              <line x1="114" y1="80" x2="170" y2="80" />
              <line x1="280" y1="80" x2="336" y2="80" />
              <line x1="446" y1="80" x2="502" y2="36" />
              <line x1="446" y1="80" x2="502" y2="124" />
              <line x1="612" y1="36" x2="668" y2="80" />
              <line x1="612" y1="124" x2="668" y2="80" />
              <!-- delivery lane -->
              <line x1="114" y1="240" x2="170" y2="240" />
              <line x1="280" y1="240" x2="336" y2="240" />
              <!-- deploy ships into the running api -->
              <line x1="391" y1="222" x2="391" y2="98" />
              <!-- the api reports errors to sentry -->
              <line x1="430" y1="98" x2="535" y2="222" />
            </g>

            <!-- packets (drawn under the nodes so they hide as they pass) -->
            <template v-if="!prefersReducedMotion">
              <circle r="3.5" fill="#E3A857">
                <animateMotion
                  dur="4.5s"
                  repeatCount="indefinite"
                  path="M 59 80 H 391 L 557 36 L 723 80"
                />
              </circle>
              <circle r="3.5" fill="#E3A857" opacity="0.8">
                <animateMotion
                  dur="4.5s"
                  begin="2.25s"
                  repeatCount="indefinite"
                  path="M 59 80 H 391 L 557 124 L 723 80"
                />
              </circle>
              <circle r="3.5" fill="#E3A857" opacity="0.9">
                <animateMotion
                  dur="7s"
                  repeatCount="indefinite"
                  path="M 59 240 H 391 V 98"
                />
              </circle>
              <circle r="3" fill="#90A5A6" opacity="0.7">
                <animateMotion
                  dur="5.5s"
                  begin="1.5s"
                  repeatCount="indefinite"
                  path="M 430 98 L 535 222"
                />
              </circle>
            </template>

            <!-- nodes -->
            <g
              fill="#16242A"
              stroke="rgba(233,228,216,0.2)"
              stroke-width="1"
            >
              <!-- runtime lane -->
              <rect x="4" y="62" width="110" height="36" />
              <rect x="170" y="62" width="110" height="36" />
              <rect x="336" y="62" width="110" height="36" />
              <rect x="502" y="18" width="110" height="36" />
              <rect x="502" y="106" width="110" height="36" />
              <rect x="668" y="62" width="110" height="36" />
              <!-- delivery lane -->
              <rect x="4" y="222" width="110" height="36" />
              <rect x="170" y="222" width="110" height="36" />
              <rect x="336" y="222" width="110" height="36" />
              <rect x="502" y="222" width="110" height="36" />
            </g>
            <g
              fill="#E9E4D8"
              font-family="IBM Plex Mono, monospace"
              font-size="13"
              text-anchor="middle"
            >
              <!-- runtime lane -->
              <text x="59" y="84.5" fill="#E3A857">
                {{ frontends[frontendIndex] }}
              </text>
              <text x="225" y="84.5">nginx</text>
              <text x="391" y="84.5" fill="#E3A857">
                {{ backends[backendIndex] }}
              </text>
              <text x="557" y="40.5">{{ stores[storeIndex] }}</text>
              <text x="557" y="128.5">redis</text>
              <!-- 200 OK blinks as each packet lands -->
              <text x="723" y="84.5" fill="#5BC98C">
                200 OK
                <template v-if="!prefersReducedMotion">
                  <animate
                    attributeName="opacity"
                    values="1;1;0.3;1"
                    keyTimes="0;0.96;0.975;1"
                    dur="4.5s"
                    repeatCount="indefinite"
                  />
                  <animate
                    attributeName="opacity"
                    values="1;1;0.3;1"
                    keyTimes="0;0.96;0.975;1"
                    dur="4.5s"
                    begin="2.25s"
                    repeatCount="indefinite"
                  />
                </template>
              </text>
              <!-- delivery lane -->
              <text x="59" y="244.5">git push</text>
              <text x="225" y="244.5">ci · tests</text>
              <text x="391" y="244.5">deploy</text>
              <text x="557" y="244.5">sentry</text>
            </g>
          </svg>
        </div>
        <figcaption class="mt-3 font-mono text-xs text-faded">
          the full loop — interface to data layer, plus the pipeline that ships
          it and the monitoring that watches it. frameworks vary by project;
          the loop doesn't.
        </figcaption>
      </figure>
    </header>

    <!--projects-->
    <projects />

    <!--experience-->
    <experience />

    <!--skills-->
    <skills />

    <!--contact-->
    <contact />

    <scroll-to-top />

    <!-- footer -->
    <footer class="border-t border-hairline">
      <div
        v-reveal
        class="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4 px-6 py-8"
      >
        <span class="font-mono text-xs text-faded"
          >© {{ new Date().getFullYear() }} Anthony Akro</span
        >
        <div class="flex items-center gap-6 font-mono text-xs">
          <a
            href="https://github.com/a4anthony"
            target="_blank"
            rel="noopener"
            class="text-faded hover:text-steam"
            >github</a
          >
          <a
            href="https://www.linkedin.com/in/anthony-akro-21a469165/"
            target="_blank"
            rel="noopener"
            class="text-faded hover:text-steam"
            >linkedin</a
          >
          <a
            href="https://blog.a4anthony.com/"
            target="_blank"
            rel="noopener"
            class="text-faded hover:text-steam"
            >blog</a
          >
          <a
            href="mailto:tony@a4anthony.com"
            class="text-amber hover:text-steam"
            >tony@a4anthony.com</a
          >
        </div>
      </div>
    </footer>
  </div>
</template>

<style scoped></style>
