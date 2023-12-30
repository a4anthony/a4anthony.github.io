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
    style="text-orientation: sideways; writing-mode: vertical-rl"
    class="fixed btn-hidden text-gray-100 bg-sky-400 tracking-widest py-1 bottom-10 right-4 sm:right-8 uppercase text-sm transform rotate-90--"
  >
    Back to top
  </button>
</template>

<style></style>
