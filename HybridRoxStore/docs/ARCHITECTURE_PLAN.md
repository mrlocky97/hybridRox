# Architecture Alignment Plan — HybridRox
**Date:** 2026-06-27  
**Status:** Proposal — awaiting approval before any code changes  
**Author:** Claude (senior software architect, Cowork session)

---

## Purpose

This document establishes one source of truth for the repository's actual architecture,
identifies every contradiction between documentation and code, recommends whether to
continue with the current stack or migrate, and provides a phased alignment roadmap.

No code is modified until each phase is explicitly approved.

---

## 1. What Actually Exists (Ground Truth)

The codebase was built — likely via an AI-assisted scaffolding tool (Hostinger Horizons,
evidenced by `vite-plugin-iframe-route-restoration.js` and `horizons-*` error handlers
embedded in `vite.config.js`) — independently of and after the planning documents were
written. The two tracks were never reconciled.

### Real stack

| Layer | Technology | Evidence |
|---|---|---|
| Frontend framework | React 18.3 + Vite 7.3 | `apps/web/package.json`, `vite.config.js` |
| Language | JavaScript (no TypeScript) | All source files are `.jsx`/`.js`; `jsconfig.json` not `tsconfig.json` |
| Styling | Tailwind CSS 3.4 + shadcn/ui | `tailwind.config.js`, `components.json`, 50+ `ui/` components |
| Routing | React Router v7 (SPA, client-side) | `App.jsx` — `BrowserRouter` with 14 `<Route>` definitions |
| CMS / backend | PocketBase (SQLite) at `/hcgi/platform` | `pocketbaseClient.js`, 37 migrations, 5 hooks |
| Commerce | Hostinger Ecommerce API (`api-ecommerce.hostinger.com`) | `EcommerceApi.js` — live store ID, full checkout flow |
| i18n | i18next (es/en) | `I18nProvider.jsx`, `translations.js` |
| Package manager | npm workspaces (monorepo) | Root `package.json` `"workspaces": ["apps/*"]` |
| Node version | 22 | `.nvmrc` |
| Hosting | Hostinger (inferred) | `/hcgi/` path prefix, Hostinger API domain |

### Project scope (what is built)

- **20 pages** — home, store, product detail, bundles, blog (list + detail), community,
  contact, about, legal (privacy, returns, terms, cookies), success
- **Full ecommerce flow** — product listing, variants, cart (`useCart` hook), checkout
  via Hostinger's payment API
- **CMS** — blog posts, testimonials, waitlist, contact submissions, newsletter signups,
  all managed in PocketBase
- **Commerce is live, not deferred** — `initializeCheckout()` creates real payment
  sessions; store ID `store_01KRNBKXJQEG3EP2B7SMNXE3C0` is production

---

## 2. Contradiction Inventory

Every inconsistency between `README.md`, `CLAUDE.md`, `docs/DEVELOPMENT.md` and the
actual codebase, ranked by impact.

### Critical — cause incorrect decisions if not corrected

| # | Document says | Reality | Impact |
|---|---|---|---|
| C1 | Framework: Next.js App Router | React 18 + Vite 7 SPA | Any AI or developer reading docs will scaffold the wrong framework |
| C2 | Language: TypeScript strict | Pure JavaScript (`.jsx`/`.js`) | TypeScript tooling, `tsconfig`, strict mode checks — all absent |
| C3 | Package manager: pnpm | npm workspaces | `pnpm install` fails; commands in docs are wrong |
| C4 | `src/` folder is *pending* | `apps/web/src/` is fully built with 20+ pages | Docs imply a greenfield project; codebase is feature-complete |
| C5 | Commerce: *deferred* | Live Hostinger checkout in production | Docs say don't add payments; payments already exist and are running |
| C6 | Phase 1 is the *next step* | Phases 1–3 are complete | Roadmap is 2–3 phases behind reality |

### Significant — cause confusion or inconsistency

| # | Document says | Reality | Impact |
|---|---|---|---|
| S1 | Blog via MDX files | Blog via PocketBase `blog_posts` collection | Content editing model is completely different (DB vs files) |
| S2 | Email via external provider (Resend / Mailerlite) | Email via PocketBase hooks (`newsletter-welcome.pb.js`) | No external email SaaS; hooks handle welcome emails directly |
| S3 | `src/app/` App Router file structure | `src/pages/` flat list of route components | Folder conventions are wrong in every doc |
| S4 | `pnpm dev` / `pnpm build` as dev commands | `npm run dev` — root runs `concurrently` across apps | Every setup instruction in docs fails |
| S5 | Routing: file-based (Next.js) | Explicit `<Routes>` in `App.jsx` | Routing mental model is wrong |
| S6 | Backend: not mentioned | PocketBase at `/hcgi/platform` with 37 migrations | Entire backend layer is absent from docs |

### Minor — outdated references

| # | Issue |
|---|---|
| M1 | `DEVELOPMENT.md §2` setup block uses `pnpm install` and `cp .env.example` (file doesn't exist) |
| M2 | `DEVELOPMENT.md §4` folder structure (`src/app/`, `src/content/`, `src/styles/`) matches no real path |
| M3 | `CLAUDE.md` commands block (`pnpm dev`, `pnpm lint`) is wrong |
| M4 | `README.md` project structure table shows `src/` and `public/` as pending — both exist under `apps/web/` |
| M5 | Node.js requirement documented as "20 LTS or superior" but `.nvmrc` pins Node 22 |

---

## 3. Framework Recommendation: React + Vite vs. Next.js

### Option A — Stay with React + Vite (recommended)

**Summary:** Align docs to match the existing codebase. Fix no code, only fix the truth
about what the code is. Evaluate Next.js migration separately, later, based on real SEO
and performance data.

**Arguments for:**

- The app is feature-complete and production-ready. A full rewrite now would introduce
  weeks of risk with no user-visible benefit.
- The original SEO argument for Next.js assumed a content-first site. The actual site is
  ecommerce-first, backed by Hostinger's checkout. Hostinger may handle SEO concerns at
  the hosting layer (server-side rendering, CDN, etc.).
- PocketBase is self-hosted at `/hcgi/platform` — a Hostinger-specific path. A migration
  to Next.js would require either re-platforming the backend or re-designing the proxy
  routing, which is a non-trivial infrastructure decision.
- `EcommerceApi.js` is tightly coupled to Hostinger's commerce API. That coupling would
  need to be re-evaluated during any framework migration.
- Vite's dev experience is measurably faster than Next.js for a project of this scale.
  Developer velocity stays high.
- Tailwind, shadcn/ui, Radix, React Hook Form, Zod — all are framework-agnostic and
  would carry over cleanly to Next.js when/if migrated.

**Arguments against:**

- No SSR means search engines receive an empty HTML shell on first load. For blog posts
  and product pages, this is a real SEO penalty.
- `react-helmet` (used for meta tags) is a client-side solution; it does not help
  crawlers that do not execute JavaScript.
- No built-in image optimization (no `next/image`). Large hero images are loaded
  unoptimized.

**When to reconsider:** If organic traffic is a measurable KPI and Google Search Console
shows poor indexing of product and blog pages, then Next.js (or a hybrid: Astro for
content pages + React for the store) becomes the right conversation.

---

### Option B — Migrate to Next.js App Router

**Summary:** Align code to docs. Rewrite `apps/web/` as a Next.js TypeScript app,
preserving all components and hooks, changing routing and data fetching.

**Trade-offs vs. Option A:**

| Dimension | React + Vite | Next.js App Router |
|---|---|---|
| Time to migrate | 0 | 3–6 weeks (20 pages, all data fetching, routing) |
| Risk | None | High — active checkout, PocketBase integration, i18n all need rethinking |
| SEO (product/blog) | Poor (client-rendered) | Excellent (SSR/SSG per route) |
| TypeScript | Optional add later | Built-in from scaffold |
| Image optimization | Manual (`<img>`) | `next/image` built-in |
| Dev speed | Fast (Vite HMR) | Slower (Next.js HMR is heavier) |
| PocketBase path (`/hcgi/`) | Works via Vite proxy | Requires `next.config.js` rewrites |
| Hostinger Ecommerce API | Direct client-side fetch | Can move to Server Actions (better for keys) |
| Deploy target | Static / any host | Node.js server or Vercel/serverless |

**Migration risks specific to this codebase:**

1. `EcommerceApi.js` exposes the store ID client-side. In Next.js this moves to Server
   Actions or Route Handlers, which requires rethinking how the cart works (currently
   all client state in `useCart`).
2. PocketBase at `/hcgi/platform` is a Hostinger-managed path. If the app moves off
   Hostinger, PocketBase moves with it. That's an infrastructure dependency to resolve
   before any framework migration.
3. The 5 custom Vite plugins (visual editor, selection mode, PocketBase auth injection,
   iframe restoration, error handlers) are build-time tools. Some may be Hostinger's
   builder tooling; they would not exist in a Next.js project and their absence needs
   to be evaluated before removing them.

**Recommendation:** Do not migrate now. Treat Next.js as a **Phase 5 decision**, made
after validating that organic SEO is a growth lever and that Hostinger's platform
constraints are understood.

---

## 4. Alignment Roadmap

Ordered from zero risk to highest risk. Each phase requires explicit approval before
the next begins.

### Phase A — Documentation alignment `[zero risk, no code changes]`

Fix the three documentation files to describe the system that exists.

**Files to update:**

- `README.md` — rewrite stack table, phase status, project structure, setup commands
- `CLAUDE.md` — update stack section, correct commands, remove "pending" language,
  add PocketBase and Hostinger commerce to context
- `docs/DEVELOPMENT.md` — rewrite §2 setup, §3 stack rationale, §4 folder structure,
  §8 roadmap (mark Phases 1–3 complete, reframe Phase 4–5)

**Deliverable:** All three docs accurately describe the existing system. No ambiguity
about what stack is in use.

**Approval required:** Yes — before writing.

---

### Phase B — Naming and structure consistency `[low risk, no logic changes]`

The codebase has minor structural inconsistencies introduced by the scaffolding tool.
These are cosmetic but create friction.

**Issues to resolve:**

- `apps/web/src/pages/` contains both English (`CommunityPage.jsx`) and Spanish
  (`ComunidadPage.jsx`) variants of the same route — likely duplicates from an
  incomplete i18n refactor. Audit and remove the unreachable one.
- `App.jsx` has two routes for the same page (`/product/:id` and `/producto/:id`)
  pointing to the same component. Confirm intent and document it.
- `src/api/EcommerceApi.js` — the store ID is hardcoded. It should move to an
  environment variable (`VITE_STORE_ID`) following Vite's convention.
- `tailwind.config.js` — brand tokens (`#0D0D0D`, `#E8FF00`, etc.) are absent.
  Tailwind uses generic shadcn HSL variables. The `BRAND.md` / `CLAUDE.md` tokens
  need to be mapped into `tailwind.config.js` as named colors
  (`base`, `carbon`, `hueso`, `acento`) so components can use them via class names.

**Approval required:** Yes — per sub-item, not as a batch.

---

### Phase C — TypeScript introduction `[medium risk, incremental]`

If TypeScript is desired, add it incrementally without a big-bang rewrite.

**Approach:**

1. Add `tsconfig.json` with `allowJs: true` and `checkJs: true` — this type-checks
   existing `.js` files without renaming them.
2. Rename new files to `.tsx`/`.ts` going forward.
3. Rename existing files one domain at a time (e.g., `lib/` first, then `hooks/`,
   then `api/`, then `components/`).
4. The `EcommerceApi.js` JSDoc typedefs (`@typedef`) are already a strong foundation
   — they convert directly to TypeScript interfaces.

**Do not do:** rename all 80+ files at once. One PR per domain area.

**Approval required:** Yes — decision to start Phase C at all, then per PR.

---

### Phase D — SEO evaluation `[no risk, research only]`

Before committing to a Next.js migration, gather real data.

**Actions:**

1. Check Google Search Console: are product pages and blog posts indexed?
2. Run Lighthouse on `/tienda`, `/blog/:slug`, `/product/:id` — capture the SEO score.
3. Check if Hostinger provides server-side rendering or pre-rendering for the hosted
   app (some Hostinger plans include this).
4. Evaluate if a lightweight prerender service (Prerender.io, Rendertron) applied at
   the CDN level solves the SEO gap without a framework migration.

**Deliverable:** a one-page SEO audit that answers: "is the current SPA architecture
causing measurable SEO damage?"

**Approval required:** No — research only.

---

### Phase E — Next.js migration `[high risk, only if Phase D warrants it]`

If Phase D shows SEO damage that cannot be fixed at the CDN/prerender layer, then
migrate to Next.js.

**Pre-conditions (all must be true before starting):**

- Phase A and B are complete.
- Phase D audit shows clear SEO damage.
- Hostinger platform constraints are documented (PocketBase path, checkout API).
- A feature-complete branch exists and is testable before cutting over.
- Explicit sign-off from the project owner.

**Scope:** migrate `apps/web/` only. PocketBase backend, migrations, hooks, and
Hostinger commerce API integration are unchanged.

---

## 5. Immediate Next Actions

In priority order. Nothing here is approved — these are proposals.

1. **Approve Phase A** → I write the updated `README.md`, `CLAUDE.md`,
   `docs/DEVELOPMENT.md` in a single PR.
2. **Confirm Phase B sub-items** → duplicate page audit, route aliases, env vars,
   brand token mapping. Approve each individually.
3. **Decide on TypeScript** → yes or no. If yes, schedule Phase C. If no, document
   that decision in `docs/DEVELOPMENT.md` as an explicit choice.
4. **Run Phase D** → SEO audit. No approval needed, no code risk.
5. **Revisit Phase E** → after Phase D results are in hand.

---

## 6. What Must Not Change Without Explicit Approval

- The Hostinger Ecommerce API integration (`EcommerceApi.js`) — it is live and
  connected to a real store.
- PocketBase migrations — running `migrations:revert` without backup would destroy
  production data.
- The `/hcgi/platform` PocketBase URL — it is a hosting-platform-specific path.
- Any `.env` or secrets handling — none are committed; keep it that way.
- `docs/BRAND.md` — this document is accurate and is the correct source of truth
  for visual identity. Do not edit without a brand decision.

---

*This document should be updated when any phase is completed or when architectural
decisions change. It supersedes the phase roadmap in `docs/DEVELOPMENT.md` until
that file is rewritten in Phase A.*
