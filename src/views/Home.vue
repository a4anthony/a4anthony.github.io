<script setup>
import {
  FaceSmileIcon,
  ArrowTopRightOnSquareIcon,
  ChevronDownIcon,
} from "@heroicons/vue/24/outline/index.js";

import { onBeforeUnmount, onMounted, ref } from "vue";
import Projects from "../components/Projects.vue";
import Skills from "../components/Skills.vue";
import Contact from "../components/Contact.vue";
import ScrollToTop from "../components/ScrollToTop.vue";

const stopHeight = ref(false);
const height = ref(0);
const difference = ref(0);
const layout = ref("");
onMounted(() => {
  window.addEventListener("resize", () => setLayoutHeight());
  window.addEventListener("deviceorientation", () => setLayoutHeight(true));
  // window.addEventListener("orientationchange", () => setLayoutHeight(true));
  setLayoutHeight();

  setTimeout(() => {
    stopHeight.value = true;
  }, 500);
});

onBeforeUnmount(() => {
  window.removeEventListener("resize", () => setLayoutHeight());
});
const setLayoutHeight = (allow = false) => {
  let oLayout;
  if (window.innerHeight > window.innerWidth) {
    oLayout = "portrait";

    console.log("portrait");
  } else {
    oLayout = "landscape";
    console.log("landscape");
  }
  if (layout.value === oLayout) {
    console.log("same layout");
    return;
  }
  layout.value = oLayout;

  const doc = document.documentElement;
  difference.value = window.innerHeight - height.value;
  // console.log(
  //   "diff",
  //   difference.value,
  //   window.scrollHeight,
  //   window.innerHeight
  // );
  height.value = window.innerHeight;
  doc.style.setProperty("--doc-height", `${window.innerHeight}px`);
};
</script>

<template>
  <div
    class="bg-gradient-to-r from-black to-zinc-950 min-h-screen text-white relative isolate"
  >
    <svg
      class="absolute inset-0 -z-10 h-full w-full stroke-white/10 [mask-image:radial-gradient(100%_100%_at_top_right,white,transparent)]"
      aria-hidden="true"
    >
      <defs>
        <pattern
          id="983e3e4c-de6d-4c3f-8d64-b9761d1534cc"
          width="200"
          height="200"
          x="50%"
          y="-1"
          patternUnits="userSpaceOnUse"
        >
          <path d="M.5 200V.5H200" fill="none" />
        </pattern>
      </defs>
      <svg x="50%" y="-1" class="overflow-visible fill-gray-800/20">
        <path
          d="M-200 0h201v201h-201Z M600 0h201v201h-201Z M-400 600h201v201h-201Z M200 800h201v201h-201Z"
          stroke-width="0"
        />
      </svg>
      <rect
        width="100%"
        height="100%"
        stroke-width="0"
        fill="url(#983e3e4c-de6d-4c3f-8d64-b9761d1534cc)"
      />
    </svg>
    <!--:style="{ height: 'var(&#45;&#45;doc-height)' }"-->
    <div
      :style="{ height: 'var(--doc-height)' }"
      class="max-w-7xl px-6 mx-auto flex items-center relative"
    >
      <router-link
        to="#projects"
        class="absolute top-full -mt-12 uppercase-- group tracking-widest text-sm-- px-6 font-bold h-align-- right-0 z-10 flex flex-col-- items-center"
      >
        <span class="group-hover:mb-2-- block">Projects</span>
        <chevron-down-icon
          class="h-4 w-4 ml-2 animate group-hover:animate-bounce--"
        />
      </router-link>

      <div class="mx-auto py-20 flex items-center">
        <!--<img-->
        <!--  src="/p.png"-->
        <!--  class="w-36 float-left&#45;&#45; border-4 border-sky-500 mr-6 mb-6 mt-6"-->
        <!--/>-->
        <div class="flex flex-col">
          <!--<div class="loader">-->
          <!--  <span class="loader-text">Loading...</span>-->
          <!--</div>-->
          <div class="mb-10 space-x-10 text-sm">
            <a
              href=""
              class="uppercase tracking-widest text-gray-300 hover:text-gray-400 inline-flex items-center"
              >Github <arrow-top-right-on-square-icon class="w-4 h-4 ml-2" /></a
            ><a
              href=""
              class="uppercase tracking-widest text-gray-300 hover:text-gray-400 inline-flex items-center"
              >LinkedIn <arrow-top-right-on-square-icon class="w-4 h-4 ml-2"
            /></a>
          </div>
          <h1 class="text-3xl sm:text-6xl mb-4 font-bold">
            <span class="text-3xl sm:text-5xl mb-2 block sm:inline-flex"
              >Hello!</span
            >
            I'm
            <span class="italic-- underline loader-text">Anthony Akro</span>
          </h1>
          <span class="block text-sm font-light mb-12 uppercase text-zinc-400">
            Full Stack Web Developer
          </span>
          <span class="block sm:text-xl mb-2 sm:w-3/5"
            >I am a full stack web developer and a creative thinker. I
            constantly find better and efficient ways to solve problems and I am
            also passionate about learning new technologies.
          </span>

          <div class="mt-8">
            <router-link to="#contact" class="btn animate">
              Hire me
              <face-smile-icon class="h-5 w-5 ml-2" />
            </router-link>
          </div>
        </div>
      </div>
    </div>

    <!--project-->
    <projects />

    <!--skills-->
    <skills />

    <!--contact-->
    <contact />

    <scroll-to-top />

    <div class="py-2 mt-10 text-center text-sm text-zinc-400">
      <!--copyright text-->
      <span>© {{ new Date().getFullYear() }} Anthony Akro</span>
    </div>
  </div>
</template>

<style scoped></style>
