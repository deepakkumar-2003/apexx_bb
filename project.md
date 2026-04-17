# Project Plan — Apexx Fitness Studio Website

*Generated: 2026-04-17 | Based strictly on spec.md*

---

## Table of Contents

1. [Project Charter](#1-project-charter)
2. [Work Breakdown Structure (WBS)](#2-work-breakdown-structure-wbs)
3. [Timeline with Milestones](#3-timeline-with-milestones)
4. [Resource Plan](#4-resource-plan)
5. [Risk Register](#5-risk-register)
6. [Technical Dependencies](#6-technical-dependencies)
7. [Definition of Done — Per Feature / Page](#7-definition-of-done--per-feature--page)

---

## 1. Project Charter

### 1.1 Project Name
Apexx Fitness Studio — Public Website with Admin Panel

### 1.2 Client
Apexx Fitness Studio (Unisex), Perundurai, Erode

### 1.3 Objectives

| # | Objective |
|---|---|
| O1 | Deliver a fast, mobile-responsive lead generation website. |
| O2 | Showcase membership packages (Quarterly, Half Yearly, Annual) with pricing and enquiry CTAs. |
| O3 | Capture visitor enquiries into a Supabase database with admin email notification. |
| O4 | Redirect post-enquiry traffic to WhatsApp to close leads conversationally. |
| O5 | Provide a password-protected admin panel to manage enquiries and packages live. |
| O6 | Deploy to production on Vercel with Supabase as the backend. |

### 1.4 Scope

**In Scope:**
- Six pages: Home (`/`), Packages (`/packages`), About (`/about`), Gallery (`/gallery`), Contact (`/contact`), Admin Panel (`/admin`)
- Enquiry form with Supabase persistence and email notification via Resend/SMTP Edge Function
- Floating WhatsApp button on all pages
- Admin panel: enquiries table, package CRUD, CSV export, login via env-var credentials
- Brand identity implementation (dark charcoal, metallic silver, deep red)
- SEO meta tags per page
- Honeypot spam protection
- Vercel deployment

**Out of Scope (explicitly excluded per spec):**
- Tamil language support
- Member-facing login or portal
- Online payments
- Bulk WhatsApp messaging
- Multi-admin support
- Class/session booking
- Automated WhatsApp campaigns

### 1.5 Success Criteria

| Criterion | Measurement |
|---|---|
| All six pages render correctly on mobile, tablet, and desktop | Manual visual review across breakpoints |
| Enquiry form saves to Supabase `enquiries` table | Confirmed via Supabase dashboard after test submission |
| Admin notification email is received at `deepakkumar.aadhi@gmail.com` | Live test submission check |
| Post-submission WhatsApp redirect fires with pre-filled message | Live test on mobile and desktop |
| Admin panel is inaccessible without valid credentials | Direct navigation to `/admin` redirects to `/admin/login` |
| Package changes in admin panel reflect live on `/packages` | Create/edit/delete package and verify on public page |
| Page load time is under 3 seconds on a standard connection | Lighthouse or WebPageTest score |
| CSV export downloads all enquiry records | Functional download test with filter applied |
| No secrets are present in the committed codebase | Audit of `.gitignore` and repo history |

---

## 2. Work Breakdown Structure (WBS)

Tasks are grouped by phase. Each task is sized as a time estimate (hours) assuming a solo developer.

---

### Phase 0 — Project Setup

| ID | Task | Est. (hrs) |
|---|---|---|
| P0.1 | Create Next.js project with App Router (`npx create-next-app`) | 0.5 |
| P0.2 | Configure Tailwind CSS and global theme tokens (colors, fonts) | 1.0 |
| P0.3 | Create Supabase project, note URL and anon key | 0.5 |
| P0.4 | Create `.env.local` with all environment variable placeholders | 0.5 |
| P0.5 | Set up `.gitignore` (include `.env.local`, `node_modules`) | 0.5 |
| P0.6 | Initialize Git repository and push initial commit | 0.5 |
| P0.7 | Connect Vercel project to Git repository (auto-deploy on push) | 0.5 |
| P0.8 | Add logo (`/public/logo.png`) to project | 0.5 |
| **Phase 0 Total** | | **4.5 hrs** |

---

### Phase 1 — Database & Backend Setup

| ID | Task | Est. (hrs) |
|---|---|---|
| P1.1 | Create `enquiries` table in Supabase (id, name, phone, email, package, message, created_at) | 0.5 |
| P1.2 | Create `packages` table in Supabase (id, name, price, duration, badge, features, is_active, created_at) | 0.5 |
| P1.3 | Set Row Level Security (RLS) policies: public insert on `enquiries`, service-role full access on both tables | 1.0 |
| P1.4 | Seed `packages` table with initial three plans (Quarterly ₹4,599, Half Yearly ₹6,599, Annual ₹8,999) | 0.5 |
| P1.5 | Write and deploy Supabase Edge Function for email notification on `enquiries` insert (Resend API) | 2.0 |
| P1.6 | Test Edge Function end-to-end: insert row manually, verify email received | 0.5 |
| **Phase 1 Total** | | **5.0 hrs** |

---

### Phase 2 — Shared Components & Layout

| ID | Task | Est. (hrs) |
|---|---|---|
| P2.1 | Build `Navbar` component (logo, nav links, mobile hamburger menu) | 2.0 |
| P2.2 | Build `Footer` component (address, phone, Instagram link, copyright) | 1.0 |
| P2.3 | Build `FloatingWhatsApp` button component (fixed bottom-right, pre-filled message link) | 0.5 |
| P2.4 | Build reusable `Button` component (primary / secondary variants matching brand colors) | 0.5 |
| P2.5 | Build `EnquiryForm` component (all fields per spec, honeypot field, validation, Supabase submission, WhatsApp redirect) | 3.0 |
| P2.6 | Create root layout (`app/layout.tsx`) — includes Navbar, Footer, FloatingWhatsApp, global styles | 1.0 |
| P2.7 | Add global SEO defaults (metadata object in root layout) | 0.5 |
| **Phase 2 Total** | | **8.5 hrs** |

---

### Phase 3 — Public Pages

| ID | Task | Est. (hrs) |
|---|---|---|
| **Home Page (`/`)** | | |
| P3.1 | Hero section — full-width background, logo, tagline, Join Now + Enquire CTAs | 2.0 |
| P3.2 | Highlights section — 3–4 feature cards (Equipment, Trainers, Unisex, Timing) | 1.5 |
| P3.3 | Packages Preview section — brief snapshot of 3 plans, View All Plans button | 1.5 |
| P3.4 | Testimonials section — 3 placeholder review cards | 1.0 |
| P3.5 | CTA Banner section — "Ready to transform?" + Enquire Now button | 0.5 |
| P3.6 | Add page-level SEO metadata for Home | 0.25 |
| **Packages Page (`/packages`)** | | |
| P3.7 | Fetch packages from Supabase (`is_active = true`) and render plan cards | 2.0 |
| P3.8 | Each card: name, price (prominent), duration, features list, Enquire Now button linking to `/contact?package=<name>` | 1.5 |
| P3.9 | Special Offer badge UI — "Up to 25% off on registration* — for college students with valid College ID" | 0.5 |
| P3.10 | Add page-level SEO metadata for Packages | 0.25 |
| **About Page (`/about`)** | | |
| P3.11 | Gym Story section — placeholder paragraph | 0.5 |
| P3.12 | Our Trainers section — 2–3 trainer cards (name, photo placeholder, designation) | 1.0 |
| P3.13 | Our Equipment section — photo grid or icon list placeholder | 1.0 |
| P3.14 | Why Choose Us section — 3–4 bullet points | 0.5 |
| P3.15 | Add page-level SEO metadata for About | 0.25 |
| **Gallery Page (`/gallery`)** | | |
| P3.16 | Responsive photo grid (3 cols desktop, 2 tablet, 1 mobile) with placeholder images | 1.5 |
| P3.17 | Add page-level SEO metadata for Gallery | 0.25 |
| **Contact Page (`/contact`)** | | |
| P3.18 | Mount `EnquiryForm` component; pre-select package from URL query param (`?package=`) | 1.0 |
| P3.19 | Contact info block — phone (click-to-call), inline WhatsApp link | 0.5 |
| P3.20 | Embedded Google Maps iframe — Apexx Fitness Studio, Perundurai | 0.5 |
| P3.21 | Add page-level SEO metadata for Contact | 0.25 |
| **Phase 3 Total** | | **18.25 hrs** |

---

### Phase 4 — Admin Panel

| ID | Task | Est. (hrs) |
|---|---|---|
| P4.1 | Build `/admin/login` page — username + password form | 1.5 |
| P4.2 | Implement login API route (`/api/admin/login`) — validate against env vars, set `HttpOnly` session cookie | 1.5 |
| P4.3 | Write Next.js middleware to protect `/admin/*` routes — redirect unauthenticated requests to `/admin/login` | 1.0 |
| P4.4 | Build admin layout — sidebar navigation (Enquiries, Packages, Export) | 1.5 |
| P4.5 | Enquiries table view — Name, Phone, Email, Package, Message, Date & Time columns | 2.0 |
| P4.6 | Filter controls on enquiries — by package, by date range | 1.5 |
| P4.7 | Delete enquiry action with confirmation | 0.5 |
| P4.8 | Packages list view — table of all packages | 1.0 |
| P4.9 | Add new package form — name, price, duration, features (multi-value input), is_active toggle | 2.0 |
| P4.10 | Edit existing package (pre-filled form) | 1.5 |
| P4.11 | Delete package action with confirmation | 0.5 |
| P4.12 | CSV export — download all enquiries, honour active filters (date range, package) | 2.0 |
| P4.13 | Logout action — clear session cookie, redirect to `/admin/login` | 0.5 |
| **Phase 4 Total** | | **17.0 hrs** |

---

### Phase 5 — QA, Polish & Deployment

| ID | Task | Est. (hrs) |
|---|---|---|
| P5.1 | Cross-browser review (Chrome, Firefox, Safari / iOS Safari) | 1.5 |
| P5.2 | Mobile responsiveness audit — all six pages on 375 px, 768 px, 1280 px viewports | 1.5 |
| P5.3 | Lighthouse audit — target score ≥ 85 Performance, ≥ 90 SEO | 1.0 |
| P5.4 | End-to-end enquiry form test: submission → Supabase row → email → WhatsApp redirect | 1.0 |
| P5.5 | Admin panel end-to-end test: login, CRUD packages, filter + delete enquiries, CSV export, logout | 1.5 |
| P5.6 | Set Vercel environment variables (all from `.env.local`) | 0.5 |
| P5.7 | Final production deploy to Vercel, smoke-test live URL | 1.0 |
| P5.8 | Verify HTTPS is enforced on production URL | 0.25 |
| **Phase 5 Total** | | **8.25 hrs** |

---

### Grand Total Estimate: ~61.5 hours

---

## 3. Timeline with Milestones

**Assumption:** Solo developer working approximately 5–6 focused hours per day.  
**Start date:** 2026-04-18 (next working day after plan creation)

| Day | Date | Work Items | Milestone |
|---|---|---|---|
| 1 | 2026-04-18 | P0.1 – P0.8 (Project Setup), P1.1 – P1.4 (DB schema + seed) | **M1: Dev environment ready, DB tables created and seeded** |
| 2 | 2026-04-19 | P1.5 – P1.6 (Edge Function + email test), P2.1 – P2.4 (Navbar, Footer, WhatsApp btn, Button component) | **M2: Backend notification live; shared UI components built** |
| 3 | 2026-04-20 | P2.5 – P2.7 (EnquiryForm, root layout, global SEO), P3.1 – P3.6 (Home page complete) | **M3: Core form logic done; Home page live in dev** |
| 4 | 2026-04-21 | P3.7 – P3.10 (Packages page), P3.11 – P3.15 (About page) | Pages: Packages and About complete |
| 5 | 2026-04-22 | P3.16 – P3.21 (Gallery page, Contact page) | **M4: All public pages complete** |
| 6 | 2026-04-23 | P4.1 – P4.7 (Admin login, middleware, enquiries management) | Admin auth and enquiries view done |
| 7 | 2026-04-24 | P4.8 – P4.13 (Packages CRUD, CSV export, logout) | **M5: Admin panel fully functional** |
| 8 | 2026-04-25 | P5.1 – P5.5 (QA, cross-browser, mobile audit, Lighthouse, E2E tests) | Bug fixes from QA |
| 9 | 2026-04-26 | P5.6 – P5.8 (Set Vercel env vars, production deploy, HTTPS verify, smoke test) | **M6: Production deployment — site live** |

### Key Milestones Summary

| Milestone | Target Date |
|---|---|
| M1 — Dev environment and database ready | 2026-04-18 |
| M2 — Backend email notification live | 2026-04-19 |
| M3 — Home page and enquiry form functional | 2026-04-20 |
| M4 — All public-facing pages complete | 2026-04-22 |
| M5 — Admin panel fully functional | 2026-04-24 |
| M6 — Production site live on Vercel | 2026-04-26 |

**Total calendar duration: 9 days**

---

## 4. Resource Plan

### Personnel
- **Role:** Full-Stack Developer (solo)
- **Responsibilities:** All design, frontend, backend, database, QA, deployment

### Accounts and Services Required

| Service | Purpose | Notes |
|---|---|---|
| Supabase (Free Tier) | PostgreSQL database + Edge Functions | Create project, obtain URL and keys |
| Vercel (Hobby Tier) | Frontend hosting + serverless API routes | Connect GitHub repo for CI/CD |
| Resend (Free Tier) | Transactional email from Edge Function | Obtain API key, verify sender domain |
| GitHub | Version control and Vercel CI/CD trigger | Create private repo |
| Google Maps Embed | Contact page embedded map | No key needed for basic embed |

### Tools
- Node.js (LTS) and npm/pnpm
- Next.js 14+ (App Router)
- Tailwind CSS
- Supabase JS client library (`@supabase/supabase-js`)
- VS Code (or preferred editor)

### Time Budget

| Phase | Estimated Hours |
|---|---|
| Phase 0 — Setup | 4.5 |
| Phase 1 — Database & Backend | 5.0 |
| Phase 2 — Shared Components | 8.5 |
| Phase 3 — Public Pages | 18.25 |
| Phase 4 — Admin Panel | 17.0 |
| Phase 5 — QA & Deployment | 8.25 |
| **Total** | **~61.5 hrs** |

---

## 5. Risk Register

| ID | Risk | Probability | Impact | Mitigation |
|---|---|---|---|---|
| R1 | Supabase free-tier rate limits throttle enquiry inserts or Edge Function invocations during a traffic spike | Low | Medium | Monitor Supabase dashboard; Edge Function email can fail silently (log error) — Supabase row save is the critical path. Plan to upgrade tier if limits are hit. |
| R2 | Resend email delivery fails (API key issue, sender domain not verified, spam filters) | Medium | Medium | Test email delivery before launch. Implement error logging in Edge Function so failures are visible. The WhatsApp redirect still works even if email fails. |
| R3 | Admin password stored only in env vars is forgotten or lost | Low | High | Document credentials in a secure password manager before deployment. Changing credentials only requires Vercel env-var update and redeployment — no code change needed. |
| R4 | Session cookie security — cookie-based auth without Supabase Auth is simpler but must be `HttpOnly`, `Secure`, and `SameSite=Strict` | Medium | High | Enforce all three cookie flags in the login API route. Test that `/admin` is unreachable without cookie. Never expose `ADMIN_PASSWORD` in client-side code. |
| R5 | Google Maps embed blocked by browser content security policy (CSP) | Low | Low | Use a permissive `frame-src` directive for `maps.google.com` in Next.js headers config. Test embed on multiple browsers. |
| R6 | Placeholder images and content are never replaced by client before launch | Medium | Medium | Clearly separate placeholder assets from real assets. Provide the client a simple list of content they need to supply (trainer photos, equipment photos, gym story text). |
| R7 | Vercel build fails due to missing environment variables during CI/CD | Medium | Medium | Set all required env vars in Vercel dashboard before the first production push. Use `next.config.js` `env` validation or a startup check to surface missing vars early. |
| R8 | Packages page shows empty state if `packages` table is empty or `is_active` flag is all false | Low | Medium | Seed the three plans in Phase 1 (P1.4) and verify before launch. Admin panel shows all packages regardless of `is_active` so admin can re-enable them. |
| R9 | WhatsApp redirect blocked on desktop browsers or corporate networks | Low | Low | WhatsApp Web (`wa.me`) is the standard deep-link and works on desktop. Note this as known limitation in handover notes. |
| R10 | Scope creep — client requests features outside spec (payments, member portal) during build | Medium | Medium | Refer all new requests to Section 14 (Future Scope) of the spec. Establish change control: any new feature requires a spec update and new timeline. |

---

## 6. Technical Dependencies

The following dependency chain must be respected. Starting a task before its dependency is complete will cause blockers.

```
1. Node.js + Next.js project initialized (P0.1)
        |
        v
2. Tailwind + brand tokens configured (P0.2)
        |
        v
3. Supabase project created, URL/keys noted (P0.3)
        |
        +-----> 4a. .env.local populated (P0.4)
        |              |
        |              v
        |       5. DB tables created: enquiries + packages (P1.1, P1.2)
        |              |
        |              +-----> 6a. RLS policies set (P1.3)
        |              |              |
        |              |              v
        |              |       7. Packages table seeded (P1.4)
        |              |              |
        |              |              v
        |              |       8. Packages page can fetch live data (P3.7)
        |              |
        |              +-----> 6b. Edge Function (email) deployed (P1.5)
        |                             |
        |                             v
        |                      9. Email notification tested (P1.6)
        |
        +-----> 4b. Shared components built (P2.1–P2.6)
                       |
                       +-----> 10. EnquiryForm built (P2.5)
                       |              |
                       |              +-----> 11. Contact page mounts form (P3.18)
                       |              |
                       |              +-----> 12. Supabase insert works (requires P1.3 RLS)
                       |                            |
                       |                            v
                       |                     13. Edge Function fires (requires P1.5)
                       |
                       +-----> 14. All public pages (P3.1–P3.21) require layout (P2.6)
                                      |
                                      v
                               15. Admin panel (P4.x) can be built in parallel with
                                   public pages but requires:
                                     - DB tables (P1.1, P1.2)
                                     - Middleware (P4.3) must come after login API (P4.2)
                                     - Login API (P4.2) must come after login page (P4.1)
                                      |
                                      v
                               16. QA (Phase 5) requires ALL phases 0–4 complete
                                      |
                                      v
                               17. Vercel env vars set (P5.6) before production deploy (P5.7)
```

### Hard Ordering Rules

| Must Complete First | Before Starting |
|---|---|
| P0.3 (Supabase project) | P1.1, P1.2, P1.3, P1.4, P1.5 |
| P1.1 + P1.3 (enquiries table + RLS) | P2.5 (EnquiryForm Supabase insert) |
| P1.2 + P1.3 (packages table + RLS) | P3.7 (Packages page data fetch) |
| P1.5 (Edge Function deployed) | P1.6 (email test) |
| P2.5 (EnquiryForm component) | P3.18 (Contact page) |
| P2.6 (root layout) | Any page (P3.x) |
| P4.1 (login page) | P4.2 (login API) |
| P4.2 (login API) | P4.3 (middleware) |
| P4.3 (middleware) | P4.4–P4.13 (all admin features) |
| All phases (0–4) | Phase 5 (QA + deploy) |
| P5.6 (Vercel env vars) | P5.7 (production deploy) |

---

## 7. Definition of Done — Per Feature / Page

A feature or page is considered **Done** when ALL of the following criteria for that item are met.

---

### Global Criteria (applies to every page/component)

- [ ] Renders correctly on mobile (375 px), tablet (768 px), and desktop (1280 px+)
- [ ] Follows brand identity: background `#1a1a1a`, primary `#C0C0C0`, accent `#8B0000`, white/light-gray text
- [ ] Logo renders from `/public/logo.png`
- [ ] Navbar links are correct and mobile hamburger menu works
- [ ] Footer is present with address, phone, Instagram link, copyright
- [ ] Floating WhatsApp button is visible and links to `https://wa.me/919894122627` with pre-filled message
- [ ] No console errors in browser DevTools
- [ ] No secrets or credentials in source code

---

### P0 — Project Setup

- [ ] `npx create-next-app` project runs and builds without errors
- [ ] Tailwind configured with custom theme values for brand colors
- [ ] `.gitignore` includes `.env.local` and confirms no secrets are tracked
- [ ] Git repository initialized and pushed to remote
- [ ] Vercel project linked to repository

---

### P1 — Database & Backend

- [ ] `enquiries` table exists with all seven columns as specified
- [ ] `packages` table exists with all eight columns as specified
- [ ] RLS policy: anonymous users can INSERT into `enquiries`, cannot SELECT/UPDATE/DELETE
- [ ] RLS policy: service role key has full access to both tables
- [ ] Three initial packages are present in `packages` table with correct names, prices, durations, and `is_active = true`
- [ ] Supabase Edge Function deploys without errors
- [ ] A test insert into `enquiries` triggers the Edge Function and delivers an email to `deepakkumar.aadhi@gmail.com` with subject "New Enquiry — Apexx Fitness Studio"

---

### Home Page (`/`)

- [ ] Hero section: gym background or dark gradient, logo, tagline "Push Your Limits.....", two CTA buttons (Join Now → `/packages`, Enquire → `/contact`)
- [ ] Highlights section: 3–4 feature cards rendered
- [ ] Packages Preview section: brief cards for three plans visible with "View All Plans" button linking to `/packages`
- [ ] Testimonials section: 3 placeholder review cards rendered
- [ ] CTA Banner: "Ready to transform?" text and Enquire Now button visible
- [ ] Page meta title and description are set for SEO

---

### Packages Page (`/packages`)

- [ ] Plans are fetched from Supabase `packages` table (only `is_active = true` rows)
- [ ] Each card shows: plan name, price in INR (prominent), duration, features list
- [ ] Each card has "Enquire Now" button linking to `/contact?package=<plan-name>`
- [ ] Special Offer badge is displayed: "Up to 25% off on registration* — For college students with valid College ID card"
- [ ] If no packages are active, a fallback/empty-state message is shown (not a blank page)
- [ ] Page meta title and description are set for SEO

---

### About Page (`/about`)

- [ ] Gym Story section renders with placeholder paragraph
- [ ] Trainers section renders 2–3 cards with name, photo placeholder, designation
- [ ] Equipment section renders photo grid or icon list placeholder
- [ ] "Why Choose Us" section renders 3–4 bullet points
- [ ] Page meta title and description are set for SEO

---

### Gallery Page (`/gallery`)

- [ ] Photo grid renders: 3 columns on desktop, 2 on tablet, 1 on mobile
- [ ] Placeholder images load without broken-image icons
- [ ] Page meta title and description are set for SEO

---

### Contact Page (`/contact`)

- [ ] Enquiry Form is rendered (see Enquiry Form criteria below)
- [ ] If `?package=<name>` is present in the URL, the Package Interest dropdown is pre-selected to that value
- [ ] Phone number is shown and is a clickable `tel:` link on mobile
- [ ] Inline WhatsApp link is visible and functional
- [ ] Google Maps iframe is embedded showing Apexx Fitness Studio location (Perundurai, Erode)
- [ ] Page meta title and description are set for SEO

---

### Enquiry Form

- [ ] Fields: Full Name (required), Phone Number (required), Email (optional), Package Interest dropdown (optional), Message (optional)
- [ ] Dropdown options match spec: "Quarterly (3+1 Month Free)", "Half Yearly (6 Months)", "Annual (12 Months)", "Not sure yet"
- [ ] Honeypot hidden field is present in the DOM (invisible to users)
- [ ] Submission is blocked and error shown if Phone Number is empty
- [ ] Phone number format is validated before submission
- [ ] On valid submission: row saved to Supabase `enquiries` table
- [ ] On valid submission: user is redirected to WhatsApp (`https://wa.me/919894122627?text=Hi%2C%20I%27m%20interested%20in%20your%20gym%20membership`)
- [ ] On Supabase error: form displays an error message (does not silently fail)
- [ ] Form cannot be re-submitted while a submission is in progress (button disabled / loading state)
- [ ] Honeypot-filled submissions are rejected server-side without saving to DB

---

### WhatsApp Floating Button

- [ ] Button is fixed to bottom-right corner on all pages
- [ ] Button is visible on all six pages
- [ ] Links to `https://wa.me/919894122627` with pre-filled message text
- [ ] Opens WhatsApp app on mobile, WhatsApp Web on desktop
- [ ] Button does not obscure important page content

---

### Admin Panel — Login (`/admin/login`)

- [ ] Login form renders with username and password fields
- [ ] Submitting correct credentials (matching `ADMIN_USERNAME` / `ADMIN_PASSWORD` env vars) sets a session cookie and redirects to `/admin`
- [ ] Submitting incorrect credentials shows an error and does not set a cookie
- [ ] Accessing `/admin` or any `/admin/*` route without a valid cookie redirects to `/admin/login`
- [ ] Session cookie is `HttpOnly`, `Secure`, and `SameSite=Strict`

---

### Admin Panel — Enquiries

- [ ] Table displays all enquiries: Name, Phone, Email, Package, Message, Date & Time
- [ ] Enquiries are sorted newest-first by default
- [ ] Filter by package works — table updates to show only matching rows
- [ ] Filter by date range works — table updates to show only matching rows
- [ ] Delete button removes the enquiry after a confirmation prompt; row disappears from table
- [ ] Table is readable and not horizontally clipped on 1280 px desktop

---

### Admin Panel — Packages Management

- [ ] Packages list shows all packages (active and inactive)
- [ ] "Add Package" form: name, price, duration, features (multi-value), is_active — saves to Supabase
- [ ] Newly added package appears in list immediately after save
- [ ] Edit package: form pre-fills with existing values; save updates Supabase row
- [ ] Edited package reflects updated values on `/packages` (live data, no manual redeploy needed)
- [ ] Delete package: removes row from Supabase after confirmation; removed package no longer appears on `/packages`

---

### Admin Panel — CSV Export

- [ ] "Export CSV" button triggers a file download named with a recognizable pattern (e.g., `enquiries-2026-04-26.csv`)
- [ ] CSV includes all columns: name, phone, email, package, message, created_at
- [ ] CSV respects active filters (package filter, date range filter) before export
- [ ] CSV file opens correctly in Excel and Google Sheets (correct comma delimiter, UTF-8 encoding)

---

### Admin Panel — Logout

- [ ] Logout action clears the session cookie
- [ ] After logout, navigating to `/admin` redirects to `/admin/login`
- [ ] Back-button after logout does not restore admin session

---

### Phase 5 — QA & Deployment

- [ ] Lighthouse Performance score >= 85 on Home page (mobile)
- [ ] Lighthouse SEO score >= 90 on at least three pages
- [ ] No broken internal links across all six pages
- [ ] All Vercel environment variables are set (not just in `.env.local`)
- [ ] Site loads over HTTPS and HTTP redirects to HTTPS
- [ ] Production URL smoke test: all six pages load, form submits, admin panel accessible

---

*End of Project Plan*

*Based on spec.md — Last updated: 2026-04-17*
