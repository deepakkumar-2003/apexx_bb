# Specification Document — Apexx Fitness Studio Website

---

## 1. Project Overview

**Client:** Apexx Fitness Studio (Unisex)
**Tagline:** "Push Your Limits....."
**Address:** 5/433, Sivasakthi Nagar, Erode Road, Mettukadai, Perundurai, Erode - 638107
**Phone:** +91 98941 22627
**Instagram:** [@apexx_fitness_studio](https://instagram.com/apexx_fitness_studio)
**Admin Email (testing):** deepakkumar.aadhi@gmail.com
**Language:** English only

**Goal:** Build a fast, mobile-responsive website for lead generation — showcasing membership packages, capturing enquiries, and providing an admin panel to manage leads.

---

## 2. Brand Identity

| Property | Value |
|---|---|
| Primary Color | Metallic Silver (`#C0C0C0` / brushed steel) |
| Accent Color | Deep Red (`#8B0000` / crimson) |
| Background | Dark Charcoal (`#1a1a1a`) |
| Text | White / Light Gray |
| Logo | `/public/logo.png` (provided) |

All UI components must follow this dark, aggressive fitness aesthetic consistent with the logo.

---

## 3. Tech Stack

| Layer | Technology |
|---|---|
| Frontend | Next.js (App Router) |
| Backend / Database | Supabase (PostgreSQL) |
| Email Notifications | Supabase Edge Functions + SMTP (or Resend) |
| Deployment | Vercel |
| Domain | Placeholder (TBD) |

---

## 4. Site Structure

| Page | Route | Description |
|---|---|---|
| Home | `/` | Hero, highlights, CTA buttons |
| Packages | `/packages` | Membership plans with Enquire Now buttons |
| About Us | `/about` | Gym story, trainers, equipment |
| Gallery | `/gallery` | Gym photo grid |
| Contact | `/contact` | Enquiry form, phone, WhatsApp, Google Maps |
| Admin Panel | `/admin` | Password-protected dashboard |

---

## 5. Page Specifications

### 5.1 Home Page (`/`)

**Sections:**
- **Hero** — Full-width background (gym image or dark gradient), logo, tagline "Push Your Limits.....", CTA buttons: `Join Now` → `/packages`, `Enquire` → `/contact`
- **Highlights** — 3–4 feature cards (e.g., Equipment, Trainers, Unisex, Timing) — placeholder content
- **Packages Preview** — Brief snapshot of 3 plans with a `View All Plans` button → `/packages`
- **Testimonials** — 3 member review cards — placeholder content
- **CTA Banner** — "Ready to transform? Join Apexx today" with `Enquire Now` button
- **Footer** — Address, phone, Instagram link, copyright

---

### 5.2 Packages Page (`/packages`)

Displays all membership plans as cards.

**Plans:**

| Plan | Price | Duration | Note |
|---|---|---|---|
| Quarterly | ₹4,599 | 3 Months + 1 Month FREE | — |
| Half Yearly | ₹6,599 | 6 Months | — |
| Annual | ₹8,999 | 12 Months | — |

**Special Offer Badge:** "Up to 25% off on registration* — *For college students with valid College ID card"

**Each plan card includes:**
- Plan name
- Price (prominent)
- Duration
- Features list (placeholder — e.g., "Cardio Access", "Weight Training", "Trainer Guidance", "Locker Room") — to be updated by admin later
- `Enquire Now` button → scrolls to or links to `/contact` with package pre-selected

---

### 5.3 About Us Page (`/about`)

**Sections:**
- **Gym Story** — Placeholder paragraph about Apexx Fitness Studio
- **Our Trainers** — 2–3 trainer cards (name, photo placeholder, designation)
- **Our Equipment** — Photo grid or icon list of equipment — placeholder
- **Why Choose Us** — 3–4 bullet points — placeholder

---

### 5.4 Gallery Page (`/gallery`)

- Responsive photo grid (3 columns desktop, 2 tablet, 1 mobile)
- Placeholder images (gym interior, equipment, training sessions)
- Lightbox on click (optional enhancement)

---

### 5.5 Contact Page (`/contact`)

**Sections:**
- Enquiry Form (see Section 6)
- Phone number: +91 98941 22627 (click-to-call on mobile)
- Floating + inline WhatsApp button
- Embedded Google Maps — location: Apexx Fitness Studio, Perundurai, Erode

---

## 6. Enquiry Form

### Fields

| Field | Type | Required |
|---|---|---|
| Full Name | Text | Yes |
| Phone Number | Tel | Yes |
| Email | Email | No |
| Package Interest | Dropdown | No |
| Message | Textarea | No |

**Dropdown options:** Quarterly (3+1 Month Free), Half Yearly (6 Months), Annual (12 Months), Not sure yet

### On Submit Behavior

1. Validate: phone number is required
2. Save submission to Supabase `enquiries` table
3. Send email notification to admin (`deepakkumar.aadhi@gmail.com`) with full enquiry details
4. Redirect user to WhatsApp chat:
   `https://wa.me/919894122627?text=Hi%2C%20I%27m%20interested%20in%20your%20gym%20membership`

---

## 7. WhatsApp Integration

- **Floating WhatsApp button** — fixed position, bottom-right, visible on all pages
- **Pre-filled message:** `"Hi, I'm interested in your gym membership"`
- **Links to:** `https://wa.me/919894122627`
- Works on both mobile (opens app) and desktop (opens WhatsApp Web)

---

## 8. Admin Panel (`/admin`)

### 8.1 Authentication

- Route protected at middleware level
- Credentials stored in environment variables:
  - `ADMIN_USERNAME`
  - `ADMIN_PASSWORD`
- Session maintained via cookie (no Supabase Auth)
- Login page at `/admin/login`

---

### 8.2 Dashboard Features

#### Enquiries Management
- Table view: Name, Phone, Email, Package, Message, Date & Time
- Filter by package, date range
- Mark as read / follow-up status (optional)
- Delete enquiry

#### Packages Management
- List all packages
- Add new package (name, price, duration, features list)
- Edit existing package
- Delete package
- Changes reflect live on `/packages` page (data from Supabase)

#### Export Data
- Export all enquiries as `.csv` file
- Filter before export (date range, package)

---

## 9. Supabase Database Schema

### Table: `enquiries`

| Column | Type | Notes |
|---|---|---|
| `id` | uuid | Primary key, auto-generated |
| `name` | text | Required |
| `phone` | text | Required |
| `email` | text | Nullable |
| `package` | text | Nullable |
| `message` | text | Nullable |
| `created_at` | timestamp | Auto |

### Table: `packages`

| Column | Type | Notes |
|---|---|---|
| `id` | uuid | Primary key |
| `name` | text | e.g., "Annual" |
| `price` | integer | In INR |
| `duration` | text | e.g., "12 Months" |
| `badge` | text | e.g., "Most Popular" — nullable |
| `features` | text[] | Array of feature strings |
| `is_active` | boolean | Show/hide on site |
| `created_at` | timestamp | Auto |

---

## 10. Email Notification

**Trigger:** New enquiry form submission
**Recipient:** `deepakkumar.aadhi@gmail.com`
**Subject:** `New Enquiry — Apexx Fitness Studio`
**Body:** Full details of the submission (name, phone, email, package, message, timestamp)
**Implementation:** Supabase Edge Function triggered on insert to `enquiries` table, via Resend or SMTP

---

## 11. Functional Requirements

| Requirement | Detail |
|---|---|
| Mobile responsive | All pages fully responsive (mobile-first) |
| Page load speed | Target < 3 seconds |
| Form validation | Phone number required, format check |
| WhatsApp link | Works on mobile and desktop |
| Admin access | Only via `/admin/login` with env credentials |
| SEO basics | Meta title, description per page |

---

## 12. Non-Functional Requirements

| Requirement | Detail |
|---|---|
| HTTPS | Enforced by Vercel by default |
| Spam protection | Honeypot field on enquiry form (no CAPTCHA for now) |
| Environment variables | All secrets in `.env.local`, never committed |
| Error handling | Form shows success/error message after submission |

---

## 13. Environment Variables

```env
# Admin credentials
ADMIN_USERNAME=
ADMIN_PASSWORD=

# Supabase
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=

# Email (Resend or SMTP)
RESEND_API_KEY=

# Admin notification email
ADMIN_EMAIL=deepakkumar.aadhi@gmail.com
```

---

## 14. Future Scope (Out of Current Build)

- Bulk WhatsApp messaging — `whatsapp-web.js` on Render (admin types message, clicks send, delivered to all users)
- Online payment integration
- Member login dashboard
- Class/session booking system
- Automated WhatsApp campaigns

---

## 15. Deployment

| Service | Purpose |
|---|---|
| Vercel | Next.js frontend + serverless API routes |
| Supabase | Database + Edge Functions |
| Domain | TBD — placeholder for now |

---

## 16. Out of Scope (Current Version)

- Tamil language support
- Member-facing login or portal
- Online payments
- Bulk WhatsApp (deferred to future)
- Multi-admin support

---

*Last updated: 2026-04-17*
