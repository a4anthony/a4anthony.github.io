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

<style>
.scroll-to-top--btn {
  z-index: 100;
  position: fixed;
  bottom: 20px;
  right: 40px;
  opacity: 0.85;
  color: #ffff !important;
  padding: 20px 10px;
}

.btn-visible {
  visibility: visible;
  opacity: 0.85;
  transition: opacity 0.2s linear;
}

.btn-hidden {
  visibility: hidden;
  opacity: 0;
  transition: visibility 0s 0.2s, opacity 0.2s linear;
}
</style>
