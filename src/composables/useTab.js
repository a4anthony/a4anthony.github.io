import { ref } from "vue";

export const TABS = ["overview", "squad", "career", "offer", "cv"];

const tab = ref("overview");

const read = () => {
  const h = window.location.hash.replace("#", "");
  tab.value = TABS.includes(h) ? h : "overview";
};

if (typeof window !== "undefined") {
  read();
  window.addEventListener("hashchange", read);
}

export function useTab() {
  const go = (name) => {
    if (tab.value === name) return;
    window.location.hash = name;
  };
  return { tab, go };
}
