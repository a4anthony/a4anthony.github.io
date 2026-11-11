import { reactive, ref } from "vue";

// ---- Form: the last five deploys of this site, from GitHub Actions ----
const RUNS_URL =
  "https://api.github.com/repos/a4anthony/a4anthony.github.io/actions/runs?per_page=5&status=completed";
const CACHE_KEY = "scout-form-v1";
const CACHE_MS = 10 * 60 * 1000;

const form = ref([]);
const formState = ref("idle"); // idle | loading | ready | error

const toResult = (conclusion) =>
  conclusion === "success" ? "W" : conclusion === "failure" ? "L" : "D";

export function useForm() {
  const load = async () => {
    if (formState.value === "loading" || formState.value === "ready") return;
    formState.value = "loading";
    try {
      const cached = JSON.parse(sessionStorage.getItem(CACHE_KEY) || "null");
      if (cached && Date.now() - cached.at < CACHE_MS) {
        form.value = cached.runs;
        formState.value = "ready";
        return;
      }
    } catch (e) {
      /* storage unavailable: fall through to the network */
    }
    try {
      const res = await fetch(RUNS_URL, {
        headers: { Accept: "application/vnd.github+json" },
      });
      if (!res.ok) throw new Error(String(res.status));
      const json = await res.json();
      form.value = json.workflow_runs.slice(0, 5).map((run) => ({
        result: toResult(run.conclusion),
        at: run.created_at,
        url: run.html_url,
      }));
      formState.value = "ready";
      try {
        sessionStorage.setItem(
          CACHE_KEY,
          JSON.stringify({ at: Date.now(), runs: form.value })
        );
      } catch (e) {
        /* ignore */
      }
    } catch (e) {
      formState.value = "error";
    }
  };
  return { form, formState, load };
}

// ---- Fitness: response time of each live project, from the visitor's browser ----
const pings = reactive({}); // id -> { state: 'checking' | 'up' | 'down', ms }
let lastRun = 0;

// Requests a tiny static file twice and times the second request, so the
// figure is the server's response time rather than DNS and TLS setup.
async function ping(id, url) {
  pings[id] = { state: "checking", ms: pings[id]?.ms ?? null };
  const target = () =>
    `${url.replace(/\/$/, "")}/favicon.ico?scout=${Date.now()}`;
  const opts = { mode: "no-cors", cache: "no-store" };
  try {
    await fetch(target(), opts);
    const started = performance.now();
    await fetch(target(), opts);
    pings[id] = { state: "up", ms: Math.round(performance.now() - started) };
  } catch (e) {
    pings[id] = { state: "down", ms: null };
  }
}

export function usePings() {
  const run = (targets) => {
    if (Date.now() - lastRun < 20000) return;
    lastRun = Date.now();
    targets.forEach((t) => ping(t.id, t.href));
  };
  return { pings, run };
}

export function timeAgo(iso) {
  const days = Math.floor((Date.now() - new Date(iso).getTime()) / 86400000);
  if (days <= 0) return "today";
  if (days === 1) return "yesterday";
  if (days < 60) return `${days} days ago`;
  return `${Math.floor(days / 30)} months ago`;
}
