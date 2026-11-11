// Every fact here comes from the CV knowledge base and GitHub evidence file.
// Attribute scores are self-assessed out of 20, mapped from the depth tiers:
// Expert 17-20, Strong 14-16, Solid 11-13.

export const player = {
  name: "Anthony Akro",
  initials: "AA",
  role: "Full-stack software engineer",
  photo: "/profile.jpg", // optional: drop a portrait at public/profile.jpg
  base: "Manchester, UK",
  ability: 4,
  potential: 5,
  email: "tony@a4anthony.com",
  links: {
    github: "https://github.com/a4anthony",
    linkedin: "https://www.linkedin.com/in/anthony-akro-21a469165/",
    blog: "https://blog.a4anthony.com/",
  },
  facts: [
    { label: "Club", value: "In Focus Europe" },
    { label: "Also", value: "Founder, Seamward" },
    { label: "Experience", value: "7 seasons" },
    { label: "Preferred stack", value: "Laravel, Vue, TypeScript, Node.js, React" },
    { label: "Qualification", value: "MSc, Distinction" },
    { label: "Transfer status", value: "Listening to offers", highlight: true },
  ],
  summary:
    "Full-stack software engineer. I design, build and run production software end to end: interfaces, APIs, backend services, data and the infrastructure underneath. Seven years across PHP, TypeScript, Go and Python, with Laravel and Vue at the core.",
};

export const attributeGroups = [
  {
    name: "Technical",
    items: [
      { name: "Laravel", value: 19, evidence: "Primary backend framework for seven years, present in 109 repositories. Proof: Hired By Code, Kuponify and TheEnglishQuiz." },
      { name: "PHP", value: 18, evidence: "Primary language since 2019 and 30% of all code written. Three published Packagist packages." },
      { name: "Vue", value: 18, evidence: "Vue 2 and 3 in production across 103 repositories. Led the Angular to Vue migration at In Focus Europe." },
      { name: "TypeScript", value: 16, evidence: "Seamward is 74K lines of TypeScript. Built and maintain In Focus Europe's shared component library." },
      { name: "SQL", value: 16, evidence: "MySQL and PostgreSQL schema design in production. Seamward runs 39 Prisma models across 31 migrations." },
      { name: "Node.js", value: 15, evidence: "Fastify and NestJS APIs, plus tooling in 187 repositories." },
      { name: "Go", value: 12, evidence: "Linkwire and Go Webhook Hub: layered services with Redis, NATS JetStream and Prometheus metrics." },
      { name: "Python", value: 12, evidence: "A FastAPI agent platform and MSc machine-learning research with XGBoost and SHAP." },
    ],
  },
  {
    name: "Engineering",
    items: [
      { name: "API design", value: 17, evidence: "Kuponify's OAuth2 API with scoped tokens and rate limits. Seamward's control-plane API is tested against its published contract." },
      { name: "System design", value: 16, evidence: "Seamward: transactional ingest and enqueue, a pure-function drift engine, and sandboxed replay of historical traffic." },
      { name: "Testing", value: 16, evidence: "600+ Vitest cases in Seamward, Pest suites in Kuponify, Cypress at In Focus Europe, and 80% browser-test coverage at Amela." },
      { name: "CI/CD", value: 15, evidence: "GitHub Actions, GitLab CI, Jenkins and Bitbucket Pipelines, with gated production deploys over SSH." },
      { name: "LLM agents", value: 15, evidence: "Neo, a production agent that has authored 190+ pull requests. Seamward's bounded AI repair pipeline and its MCP server." },
      { name: "Docker", value: 14, evidence: "Multi-stage builds and Compose stacks across Go, Node and Laravel services." },
      { name: "Observability", value: 14, evidence: "Prometheus metrics, Sentry alerting, structured logs, Laravel Horizon and Telescope." },
      { name: "Security", value: 14, evidence: "HMAC-signed webhooks, OAuth2, API keys hashed at rest, OS-level sandboxing and hardened servers." },
    ],
  },
  {
    name: "Mental",
    items: [
      { name: "Ownership", value: 18, evidence: "Solo founder of Seamward, Hired By Code, Kuponify and Eavesdroppr: design, build, deploy and operations." },
      { name: "Determination", value: 18, evidence: "Earned an MSc with Distinction alongside a full-time engineering role." },
      { name: "Work rate", value: 17, evidence: "About 5,200 commits and 869 pull requests across 255 repositories since 2019." },
      { name: "Adaptability", value: 17, evidence: "Civil engineering graduate turned software engineer. Ships in PHP, TypeScript, Go and Python." },
      { name: "Composure", value: 16, evidence: "Triages production incidents, then hardens servers and adds monitoring so the next one is caught earlier." },
      { name: "Teamwork", value: 16, evidence: "Ran weekly sprints at Amela. Built an AI agent that connects the support team directly to engineering." },
      { name: "Vision", value: 15, evidence: "Spots a product gap and builds for it: Seamward, Hired By Code and Kuponify all started that way." },
      { name: "Communication", value: 15, evidence: "Writes a technical blog and wrote Seamward's 33-page documentation site." },
    ],
  },
];

export const radarAxes = [
  { label: "Backend", value: 18, from: ["Laravel", "PHP", "API design", "Node.js"] },
  { label: "Frontend", value: 17, from: ["Vue", "TypeScript"] },
  { label: "Testing", value: 16, from: ["Testing", "CI/CD"] },
  { label: "Data", value: 15, from: ["SQL", "System design"] },
  { label: "DevOps", value: 15, from: ["CI/CD", "Docker", "Observability", "Security"] },
  { label: "Product", value: 15, from: ["Ownership", "Vision", "Communication"] },
  { label: "AI", value: 15, from: ["LLM agents", "Python"] },
];

export const scoutReport = {
  pros: [
    "Builds the interface, the API and the infrastructure, then keeps all three running.",
    "Built an AI agent at In Focus Europe that has authored 190+ pull requests.",
    "Founder of Seamward: 74K lines of TypeScript and 600+ tests, built solo.",
    "Led a full Angular to Vue migration on a live assessment platform.",
    "MSc Computer Science, awarded with Distinction.",
  ],
  cons: ["Will ask to see your test coverage."],
  verdict: "Sign before deadline day",
};

export const traits = [
  "Writes the test first",
  "Deploys his own work",
  "Reads the logs before guessing",
  "Automates anything done twice",
  "Comfortable in every position",
];

export const honours = [
  { tag: "2026", title: "MSc Computer Science, Distinction", detail: "Ulster University" },
  { tag: "2026", title: "Seamward opens early access", detail: "Founder venture" },
  { tag: "2026", title: "AI agent Neo passes 190 pull requests", detail: "In Focus Europe" },
  { tag: "Club", title: "Angular to Vue migration completed", detail: "In Focus Europe" },
  { tag: "Open", title: "Three packages published on Packagist", detail: "Open source" },
];

export const ticker = [
  "Deadline day",
  "Seamward opens early access",
  "AI agent Neo passes 190 pull requests",
  "MSc awarded with Distinction",
  "14 projects in the squad",
  "Angular to Vue migration completed at In Focus Europe",
  "Akro: “I build it and I keep it running”",
];

// Squad = projects. Positions are playful; `type` says the same thing plainly.
export const squad = [
  {
    id: "seamward", no: 9, name: "Seamward", short: "Seamward", pos: "ST", captain: true, x: 50, y: 13,
    type: "Founder venture", status: "early", href: "https://seamward.com", linkLabel: "Visit seamward.com", ping: true,
    desc: "Integration reliability control plane. It watches third-party API and webhook traffic from the side, detects contract drift, replays redacted traffic in a network-denied sandbox, and validates repairs before a human ships them.",
    stack: ["TypeScript", "Fastify", "Next.js 15", "Prisma", "PostgreSQL", "MCP", "Turborepo"],
    stat: "74K lines of TypeScript, 600+ tests",
  },
  {
    id: "hiredbycode", no: 11, name: "Hired By Code", short: "Hired By Code", pos: "AML", x: 20, y: 22,
    type: "Founder product", status: "live", href: "https://hiredbycode.com", linkLabel: "Visit hiredbycode.com", ping: true,
    desc: "AI-powered CV builder that reads GitHub activity (repos, pull requests, commit patterns) to generate ATS-optimised CVs and track job applications.",
    stack: ["Laravel 12", "Vue 3", "Inertia", "TypeScript", "Stripe", "Redis"],
    stat: "Nine-phase GitHub analysis pipeline",
  },
  {
    id: "eavesdroppr", no: 7, name: "Eavesdroppr", short: "Eavesdroppr", pos: "AMR", x: 80, y: 22,
    type: "Founder product", status: "live", href: "https://eavesdroppr.com", linkLabel: "Visit eavesdroppr.com", ping: true,
    desc: "Content publishing platform for an African-diaspora lifestyle audience, with full-text search, a queued media pipeline and structured-data SEO.",
    stack: ["Laravel 12", "Inertia", "Vue 3", "Filament", "Meilisearch"],
    stat: "Search, queues and SEO built in",
  },
  {
    id: "linkwire", no: 6, name: "Linkwire", short: "Linkwire", pos: "MCL", x: 27, y: 45,
    type: "Go service", status: "live", href: "https://links.a4anthony.com", linkLabel: "Open the demo", ping: true,
    desc: "Multi-tenant URL shortener and click-analytics service in Go. Redis-first redirect path, a non-blocking analytics pipeline, per-tenant rate limiting and signed webhooks. A demo project.",
    stack: ["Go", "Gin", "PostgreSQL", "Redis", "React", "Prometheus", "Docker"],
    stat: "Tenant isolation proven with integration tests",
  },
  {
    id: "teq", no: 8, name: "TheEnglishQuiz", short: "English Quiz", pos: "MC", x: 50, y: 51,
    type: "Employer platform", status: "live", href: "https://theenglishquiz.com", linkLabel: "Visit theenglishquiz.com", ping: true,
    desc: "English language assessment platform used by employers and recruiters, with AI proctoring, ATS integrations and government certification programmes. Core engineer since 2021.",
    stack: ["Laravel", "Vue.js", "TypeScript", "MySQL", "Cypress"],
    stat: "Led its Angular to Vue migration",
  },
  {
    id: "kuponify", no: 10, name: "Kuponify", short: "Kuponify", pos: "MCR", x: 73, y: 45,
    type: "Founder product", status: "live", href: "https://kuponify.com", linkLabel: "Visit kuponify.com", ping: true,
    desc: "API-first coupon management for e-commerce: multi-tenant stores, revenue analytics, tiered billing and an OAuth2-secured API.",
    stack: ["Laravel 12", "Vue 3", "Chart.js", "Passport", "Stripe"],
    stat: "14+ feature test suites",
  },
  {
    id: "whereby", no: 3, name: "Whereby-Laravel", short: "Whereby", pos: "DL", x: 12, y: 69,
    type: "Open-source package", status: "oss", href: "https://github.com/a4anthony/whereby-laravel", linkLabel: "View the source",
    desc: "Laravel wrapper for the Whereby video API with a fluent interface, service-provider auto-discovery and a PHPUnit suite. Published on Packagist.",
    stack: ["PHP 8+", "Laravel", "PHPUnit"],
    stat: "Published on Packagist",
  },
  {
    id: "agent", no: 5, name: "Agent Platform", short: "Agent Platform", pos: "DCL", x: 37, y: 76,
    type: "Open-source platform", status: "oss", href: "https://github.com/a4anthony/agent-platform", linkLabel: "View the source",
    desc: "Self-hostable LLM agent operations platform: budgeted tool execution, streaming, pgvector semantic memory, versioned prompts, human approvals and evaluation suites.",
    stack: ["Python", "FastAPI", "PostgreSQL", "pgvector", "React", "Prometheus"],
    stat: "Crash-resumable agent runs",
  },
  {
    id: "proctoring", no: 4, name: "Proctoring Platform", short: "Proctoring", pos: "DCR", x: 63, y: 76,
    type: "TypeScript monorepo", status: "dev", href: "", linkLabel: "",
    desc: "Multi-tenant proctoring SaaS in a TypeScript monorepo: a browser SDK with webcam recording and behavioural observers, Python face analysis and queued post-hoc runs. Private repository.",
    stack: ["TypeScript", "NestJS", "Next.js", "Prisma", "PostgreSQL", "Docker"],
    stat: "Four packages, types published to npm",
  },
  {
    id: "coupon", no: 2, name: "Coupon Generator", short: "Coupons", pos: "DR", x: 88, y: 69,
    type: "Open-source package", status: "oss", href: "https://github.com/a4anthony/coupon", linkLabel: "View the source",
    desc: "Coupon generation and validation for Laravel with a publishable dashboard, configurable rules, expiry handling and redemption limits.",
    stack: ["PHP 8+", "Laravel", "Blade", "PHPUnit"],
    stat: "Published on Packagist",
  },
  {
    id: "webhookhub", no: 1, name: "Go Webhook Hub", short: "Webhook Hub", pos: "GK", x: 50, y: 91,
    type: "Go service", status: "oss", href: "https://github.com/a4anthony/go-webhook-hub", linkLabel: "View the source",
    desc: "High-concurrency webhook ingestion and delivery: HMAC verification, at-least-once processing on JetStream, backoff with jitter, per-destination circuit breakers and dead-letter replay. Chaos-tested.",
    stack: ["Go", "Gin", "NATS JetStream", "PostgreSQL", "Prometheus", "Docker"],
    stat: "Nothing gets past it: at-least-once delivery",
  },
  {
    id: "cartavel", no: 12, name: "Cartavel", short: "Cartavel", pos: "SUB", bench: true,
    type: "Open-source package", status: "oss", href: "https://github.com/a4anthony/cartavel", linkLabel: "View the source",
    desc: "Session-backed cart management for Laravel with a facade-driven API, item-level metadata and pluggable storage drivers.",
    stack: ["PHP 8+", "Laravel", "PHPUnit"],
    stat: "Published on Packagist",
  },
  {
    id: "melamart", no: 14, name: "MelaMart", short: "MelaMart", pos: "RET", bench: true,
    type: "E-commerce platform", status: "retired", href: "", linkLabel: "",
    desc: "E-commerce platform built from an empty repository to launch at Amela Group: Stripe payments, webhook-driven orders and 80% browser-test coverage. The store has since closed.",
    stack: ["Laravel", "Vue.js", "MySQL", "Dusk"],
    stat: "540 commits, 209 pull requests",
  },
  {
    id: "fluentnow", no: 15, name: "FluentNow", short: "FluentNow", pos: "RET", bench: true,
    type: "Learning platform", status: "retired", href: "", linkLabel: "",
    desc: "Language learning platform with lesson scheduling, progress tracking and self-hosted video classrooms. No longer online.",
    stack: ["Laravel", "Vue 2", "Jitsi Meet", "Redis", "Nginx"],
    stat: "Self-hosted video classrooms",
  },
];

export const positionNames = {
  ST: "Striker: the flagship",
  AML: "Left wing: founder product",
  AMR: "Right wing: founder product",
  MCL: "Midfield: service",
  MC: "Midfield: platform",
  MCR: "Midfield: product",
  DL: "Left back: package",
  DCL: "Centre back: platform",
  DCR: "Centre back: platform",
  DR: "Right back: package",
  GK: "Goalkeeper: infrastructure",
  SUB: "Substitute",
  RET: "Retired",
};

export const career = [
  {
    seasons: "2026 –", club: "Seamward", role: "Founder and engineer", commits: "241", prs: "49",
    notes: [
      "Building an integration reliability control plane as a TypeScript monorepo: Fastify API, Next.js console, Prisma on PostgreSQL.",
      "Designed transactional ingest, a pure-function drift engine and OS-level sandboxed replay.",
      "Bounded AI repairs: an LLM proposes, deterministic checks decide, a human approves.",
    ],
  },
  {
    seasons: "2021 –", club: "In Focus Europe", role: "Full-stack software engineer", commits: "2,050+", prs: "360+",
    notes: [
      "Core engineer on an English assessment platform with AI proctoring and ATS integrations.",
      "Migrated the entire frontend from Angular to Vue and built the shared TypeScript component library.",
      "Built Neo, a production AI agent that triages support tickets and authors pull requests.",
      "Introduced Cypress end-to-end testing. Design and run the Laravel APIs and MySQL schemas.",
    ],
  },
  {
    seasons: "2019 – 21", club: "Amela Group", role: "Software developer", commits: "540", prs: "209",
    notes: [
      "Architected and shipped an e-commerce platform end to end: Laravel, Vue, MySQL and the production deploy.",
      "Reached 80% browser-test coverage with Laravel Dusk.",
      "Built the deployment pipeline and hardened the production servers.",
    ],
  },
  {
    seasons: "2018 – 19", club: "University of Benin", role: "Trainee engineer, civil", commits: "–", prs: "–",
    notes: ["Civil engineering before software: AutoCAD drawings, site inspections and infrastructure assessments."],
  },
];

export const careerTotals = [
  { label: "Seasons", value: 7 },
  { label: "Commits", value: 5200, approx: true },
  { label: "Pull requests", value: 869, approx: true },
  { label: "Repositories", value: 255 },
  { label: "Projects", value: 14 },
];

// Product domains by repository count, from the GitHub scan.
export const domains = [
  { name: "E-commerce and marketplaces", repos: 21 },
  { name: "Media and real-time comms", repos: 8 },
  { name: "Jobs and career tooling", repos: 7 },
  { name: "Assessment and proctoring", repos: 4 },
  { name: "Events and bookings", repos: 4 },
  { name: "Payments and fintech", repos: 3 },
  { name: "Education and machine learning", repos: 2 },
];

export const qualifications = [
  {
    title: "MSc Computer Science and Technology", grade: "Distinction", where: "Ulster University", year: "2026",
    detail: "Research: explainable federated ensemble learning for real-time financial fraud detection, with XGBoost, Random Forest, SHAP and Flower.",
  },
  {
    title: "BSc Civil Engineering", grade: "Honours", where: "Eastern Mediterranean University", year: "2018",
    detail: "ABET-accredited degree in structural analysis, construction management and fluid engineering.",
  },
];

export const techBreadth = [
  { name: "Node.js", repos: 187 },
  { name: "Tailwind CSS", repos: 119 },
  { name: "Laravel", repos: 109 },
  { name: "Vue", repos: 103 },
  { name: "Vite", repos: 71 },
  { name: "TypeScript", repos: 40 },
  { name: "Python", repos: 25 },
  { name: "Inertia", repos: 25 },
  { name: "Nuxt", repos: 20 },
  { name: "React", repos: 19 },
  { name: "Go", repos: 5 },
];


// ---------- Plain CV ----------
// A conventional CV for readers who want one. No employer business figures:
// this page is public.
export const cv = {
  profile: [
    "Full-stack software engineer with seven years of experience building and running production software: SaaS platforms, backend services, APIs, interfaces and the infrastructure underneath them. I work across the whole system, from data modelling and distributed backend design to design systems, deployment pipelines and monitoring.",
    "My core is Laravel and Vue, where I have led a full framework migration and built a shared component library. Around that I ship TypeScript and Node.js services with Fastify, NestJS and Next.js, backend services in Go, and Python for machine learning and agent platforms. I am also the founder of Seamward, an integration reliability platform I designed and built solo.",
    "My recent work centres on AI engineering: a production agent that triages support tickets and authors pull requests, a bounded LLM repair pipeline with deterministic validation and human approval, and a Model Context Protocol server. I hold an MSc in Computer Science with Distinction, with research in federated machine learning and explainable AI.",
  ],
  strengths: [
    { title: "Product engineering, end to end", text: "Founder of four products. I take an idea through design, architecture, build, billing, deployment and operations without hand-offs." },
    { title: "Backend and distributed systems", text: "Multi-tenant APIs, transactional job pipelines, queues, webhooks with retries and dead-lettering, rate limiting, and schema design in MySQL and PostgreSQL." },
    { title: "Frontend and design systems", text: "Vue 2 and 3, React and Next.js. Led an Angular to Vue migration and built a shared TypeScript component library used across a platform's frontends." },
    { title: "AI and LLM engineering", text: "Production agents, provider-agnostic LLM gateways, validated structured output, evaluation harnesses and MCP servers." },
    { title: "DevOps and reliability", text: "Linux servers, Nginx, Docker, CI/CD on GitHub Actions and GitLab CI, server hardening, and monitoring with Sentry and Prometheus." },
    { title: "Testing and quality", text: "Test-first on pure packages, API tests against real databases, end-to-end suites in Cypress and Playwright, and browser tests in Laravel Dusk." },
  ],
  experience: [
    {
      role: "Founder and engineer", org: "Seamward", where: "", dates: "Aug 2026 to present",
      bullets: [
        "Designed and built an integration reliability control plane that observes third-party API and webhook traffic from the side, detects contract and behavioural drift, and validates repairs before a human ships them.",
        "Built the platform as a TypeScript monorepo with pnpm and Turborepo: a Fastify 5 API, a Next.js 15 console, Prisma on PostgreSQL and a Node collector SDK.",
        "Designed a transactional ingest pipeline where the write and the job enqueue share one PostgreSQL transaction, which removes the need for an outbox.",
        "Wrote a pure-function drift engine covering eight classes of drift, with deterministic schema fingerprinting so payloads never need to be stored.",
        "Engineered OS-level sandboxing for replay: repair code runs in a network-denied child process with CPU, memory and time limits.",
        "Built a bounded AI subsystem in which provider-agnostic LLM adapters propose repairs, eight deterministic checks validate them, and a fingerprinted human approval gates export.",
        "Shipped an MCP server behind OAuth 2.0, a GitHub App integration written without an SDK, a 33-page documentation site and the marketing site.",
        "Work test-first under a pull-request-only workflow with gated production deploys.",
      ],
    },
    {
      role: "Full-stack software engineer", org: "In Focus Europe", where: "London", dates: "Oct 2021 to present",
      bullets: [
        "Core engineer on an English language assessment platform used by employers and recruiters, with AI-powered proctoring, ATS integrations and government certification programmes.",
        "Led the migration of the entire frontend from Angular to Vue, improving performance, maintainability and delivery speed.",
        "Built and maintain the company's shared TypeScript and Vue component library, which standardises UI across the platform's frontends.",
        "Built and deployed Neo, a production AI agent integrated with GitHub. It triages support tickets, performs root cause analysis on session data, and authors pull requests with proposed fixes, several of which have been merged to production.",
        "Develop and maintain the Laravel APIs and business logic behind the platform, and design and optimise its MySQL schemas.",
        "Introduced end-to-end testing with Cypress across key user journeys.",
        "Integrated third-party services and REST APIs to extend the platform.",
      ],
    },
    {
      role: "Software developer", org: "Amela Group", where: "", dates: "Aug 2019 to Jul 2021",
      bullets: [
        "Architected and shipped an e-commerce platform end to end: Laravel backend, Vue frontend, MySQL schema and the production deploy.",
        "Owned the platform after launch through two years of iteration across the catalogue, checkout and admin tooling, tuning queries as the catalogue grew.",
        "Reached 80% browser-level test coverage with Laravel Dusk and ran a weekly sprint cadence.",
        "Built and maintained the deployment pipeline on Bitbucket Pipelines, plus scheduled jobs for inventory sync, emails and reports.",
        "Integrated payments, shipping and transactional email, and wrote the REST API consumed by the storefront and an internal admin tool.",
        "Hardened the production server: Nginx, TLS, firewall rules, fail2ban and automated database backups.",
      ],
    },
  ],
  earlier: "Before software I trained as a civil engineer, including a year as a trainee engineer at the University of Benin producing AutoCAD drawings and assisting with site inspections.",
  projects: [
    {
      name: "Hired By Code", href: "https://hiredbycode.com", note: "Founder product", stack: "Laravel 12, Vue 3, Inertia, TypeScript, Redis, Stripe",
      bullets: [
        "SaaS platform that generates ATS-optimised CVs from a nine-phase analysis of a developer's GitHub activity.",
        "Multi-strategy job scraper with an HTTP to Puppeteer fallback, a Chrome extension, and a hybrid scoring engine that combines keyword extraction with AI analysis.",
        "Queued generation pipeline on Laravel Horizon with retries, dead-letter handling and Sentry alerting, plus multi-currency Stripe billing.",
      ],
    },
    {
      name: "Kuponify", href: "https://kuponify.com", note: "Founder product", stack: "Laravel 12, Vue 3, Inertia, Passport, Stripe, Paystack",
      bullets: [
        "API-first coupon management for e-commerce with a multi-store, multi-tenant architecture.",
        "OAuth2 API with scoped tokens, per-user rate limiting and quota logging, and role-based access for team accounts.",
        "Tiered subscriptions with plan switching, trials, proration and a webhook-driven lifecycle.",
        "Revenue and coupon analytics dashboards in Vue 3 and Chart.js, with auto-generated public API documentation.",
      ],
    },
    {
      name: "Eavesdroppr", href: "https://eavesdroppr.com", note: "Founder product", stack: "Laravel 12, Inertia, Vue 3, Filament, Meilisearch",
      bullets: [
        "Content publishing platform with a Filament admin, full-text search, and queued jobs for image optimisation and scheduled publishing.",
        "SEO foundations across the rendering layer: sitemap generation, structured data and Open Graph.",
        "Provisioned and hardened the production server and the CI/CD pipeline.",
      ],
    },
    {
      name: "Linkwire", href: "https://links.a4anthony.com", note: "Go service, demo project", stack: "Go, Gin, PostgreSQL, Redis, React, Prometheus, Docker",
      bullets: [
        "Multi-tenant URL shortener and click-analytics service with a layered architecture and explicit dependency wiring.",
        "Redis-first redirect path with a Postgres fallback, and a non-blocking analytics pipeline that sheds load under pressure.",
        "Per-tenant rate limiting, API keys hashed at rest, and HMAC-signed webhooks with backoff and dead-lettering. Tenant isolation is proven with integration tests.",
      ],
    },
    {
      name: "Go Webhook Hub", href: "https://github.com/a4anthony/go-webhook-hub", note: "Open source", stack: "Go, Gin, NATS JetStream, PostgreSQL, Prometheus",
      bullets: [
        "Webhook ingestion and delivery service with HMAC verification and at-least-once processing.",
        "Exponential backoff with jitter, per-destination circuit breakers, dead-letter replay and graceful shutdown, chaos-tested against an unreliable destination.",
      ],
    },
    {
      name: "Agent Platform", href: "https://github.com/a4anthony/agent-platform", note: "Open source", stack: "Python, FastAPI, PostgreSQL, pgvector, React",
      bullets: [
        "Self-hostable, provider-agnostic LLM agent platform with budgeted tool execution, streaming and semantic memory.",
        "Versioned prompts, database-persisted human approvals, crash-resumable runs and YAML evaluation suites.",
      ],
    },
    {
      name: "Proctoring Platform", href: "", note: "Private repository", stack: "TypeScript, NestJS, Next.js, Prisma, PostgreSQL, Python",
      bullets: [
        "Multi-tenant proctoring platform as a TypeScript monorepo: a browser SDK, a NestJS API, a Next.js dashboard and shared types published to npm.",
        "Python face-analysis worker bridged to Node, with post-hoc analysis runs queued and processed by a dedicated worker.",
      ],
    },
    {
      name: "Laravel packages", href: "https://github.com/a4anthony", note: "Open source", stack: "PHP 8+, Laravel, PHPUnit",
      bullets: [
        "Whereby-Laravel, Coupon Generator and Cartavel, all published on Packagist with service-provider auto-discovery, publishable config and a PHPUnit suite.",
      ],
    },
  ],
  skills: [
    { label: "Languages", items: "PHP, TypeScript, JavaScript, Go, Python, SQL" },
    { label: "Backend", items: "Laravel, Node.js, Fastify, NestJS, Express, FastAPI, REST API design, OAuth2, queues and background jobs, webhooks" },
    { label: "Frontend", items: "Vue 2 and 3, Inertia, Nuxt, React, Next.js, Tailwind CSS, Headless UI, Storybook, Chart.js" },
    { label: "Data", items: "MySQL, PostgreSQL, Redis, MongoDB, SQLite, Prisma, multi-tenant schema design, query optimisation" },
    { label: "DevOps and cloud", items: "Linux administration, Nginx, Docker, GitHub Actions, GitLab CI, Jenkins, Bitbucket Pipelines, Digital Ocean, AWS S3, Cloudflare" },
    { label: "Observability", items: "Sentry, Prometheus, Laravel Horizon and Telescope, structured logging" },
    { label: "Testing", items: "Pest, PHPUnit, Vitest, Jest, Cypress, Playwright, Laravel Dusk" },
    { label: "AI and ML", items: "LLM agents, prompt engineering, Model Context Protocol, evaluation harnesses, XGBoost, SHAP, federated learning, scikit-learn, Pandas" },
    { label: "Payments", items: "Stripe, Paystack" },
  ],
  education: [
    {
      title: "MSc Computer Science and Technology", grade: "Distinction", where: "Ulster University", dates: "Awarded 2026",
      lines: [
        "Research project: explainable federated ensemble learning for real-time financial fraud detection, combining XGBoost and Random Forest ensembles with SHAP explainability and federated training.",
        "Coursework: data science and machine learning, deep learning, big data and infrastructure, knowledge engineering, scalable advanced software solutions, digital transformation.",
      ],
    },
    {
      title: "BSc Civil Engineering", grade: "Honours", where: "Eastern Mediterranean University", dates: "2014 to 2018",
      lines: ["ABET-accredited degree covering structural analysis and design, construction management and fluid engineering."],
    },
  ],
  community: [
    "Maintainer of three Laravel packages published on Packagist, all MIT-licensed.",
    "External open-source contributions, including laravel-paystack.",
    "Writes about engineering at blog.a4anthony.com.",
  ],
};

// Role fit: each score is the average of the attributes that role leans on.
export const roles = [
  { name: "Founding engineer", from: ["Ownership", "Vision", "API design", "Laravel", "Vue"] },
  { name: "Full-stack engineer", from: ["Laravel", "Vue", "TypeScript", "API design", "SQL", "Testing"] },
  { name: "Backend engineer", from: ["Laravel", "PHP", "Node.js", "Go", "SQL", "API design", "System design"] },
  { name: "AI engineer", from: ["LLM agents", "Python", "System design", "API design"] },
  { name: "Platform engineer", from: ["CI/CD", "Docker", "Observability", "Security"] },
];
