<script setup>
import { ref } from "vue";
import { ArrowLongLeftIcon } from "@heroicons/vue/24/outline/index.js";
import Container from "./Container.vue";

const languages = ref(["PHP", "JavaScript", "Go", "CSS"]);
const databases = ref(["MySQL", "postgreSQL", "SQLite"]);
const servers = ref(["Digital Ocean"]);
const frameworks = ref([
  "Laravel",
  "Vuejs",
  "Nuxtjs",
  "React",
  "Express",
  "Django",
  "Bootstrap",
  "TailwindCss",
  "Git",
  "Docker",
  "Nginx",
]);
const tests = ref(["PHPUnit", "Jest", "Cypress", "Pest"]);
const skills = ref([
  "Database Management",
  "Problem solving",
  "Creative thinking",
  "Communicating",
  "Organising",
]);
</script>

<template>
  <container title="Skills">
    <div class="space-y-6">
      <div
        v-for="(items, index) in [
          languages,
          databases,
          // servers,
          frameworks,
          tests,
          skills,
        ]"
      >
        <span
          class="block mb-2 text-sm capitalize tracking-wider text-gray-300"
        >
          {{
            index === 0
              ? "Languages"
              : index === 1
              ? "Databases"
              : index === 2
              ? "Frameworks/Tools"
              : index === 3
              ? "Automated Tests"
              : "Personal Skills"
          }}
        </span>
        <div class="flex flex-wrap">
          <div
            v-for="(language, index) in items"
            :key="index"
            class="bg-zinc-900 text-white rounded-0 px-4 py-2 text-sm font-medium mr-2 mb-2"
          >
            {{ language }}
          </div>
        </div>
      </div>
    </div>
  </container>
</template>

<style scoped></style>
