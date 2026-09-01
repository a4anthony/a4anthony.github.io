// v-reveal — marks an element `is-visible` the first time it scrolls into view.
//
//   v-reveal            fade + rise (default)
//   v-reveal="300"      same, delayed 300ms (sets --d for the CSS transition)
//   v-reveal.wipe       clip-path wipe left→right (monitor powering on)
//   v-reveal.bare       no styling of the element itself; only toggles the
//                       class so children (.chip-in, .timeline-line, .dot-pop)
//                       can react
//
// All visuals live in style.css and are disabled under prefers-reduced-motion.

let observer = null;

if (typeof window !== "undefined" && "IntersectionObserver" in window) {
  observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      }
    },
    { rootMargin: "0px 0px -8% 0px", threshold: 0.08 }
  );
}

export default {
  mounted(el, binding) {
    const { bare, wipe } = binding.modifiers;
    el.classList.add(bare ? "reveal-bare" : "reveal");
    if (wipe) el.classList.add("reveal-wipe");
    if (typeof binding.value === "number") {
      el.style.setProperty("--d", `${binding.value}ms`);
    }
    if (!observer) {
      el.classList.add("is-visible");
      return;
    }
    observer.observe(el);
  },
  unmounted(el) {
    observer?.unobserve(el);
  },
};
