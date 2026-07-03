<script setup>
import { onMounted } from "vue";
const scrollToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });

  // remove hash from url
  history.pushState(
    "",
    document.title,
    window.location.pathname + window.location.search
  );
};

onMounted(() => {
  window.addEventListener("scroll", function () {
    // console.log('scroll')
    if (window.scrollY > 400) {
      document.getElementById("scroll-to-top").classList.remove("btn-hidden");
      document.getElementById("scroll-to-top").classList.add("btn-visible");
    } else {
      document.getElementById("scroll-to-top").classList.remove("btn-visible");
      document.getElementById("scroll-to-top").classList.add("btn-hidden");
    }
  });
});
</script>

<template>
  <button
    id="scroll-to-top"
    @click="scrollToTop"
    aria-label="Back to top"
    style="text-orientation: sideways; writing-mode: vertical-rl"
    class="fixed btn-hidden z-40 border border-hairline bg-panel font-mono text-xs uppercase tracking-[0.25em] text-faded hover:text-amber hover:border-amber/60 px-1.5 py-3 bottom-10 right-4 sm:right-8"
  >
    ↑ top
  </button>
</template>

<style></style>
