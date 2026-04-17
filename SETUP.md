# Apexx Fitness Studio — Setup Guide

## 1. Place the Logo

Copy `logo.png` to `web/public/logo.png`

---

## 2. Set Up Supabase

1. Create a project at [supabase.com](https://supabase.com)
2. Go to **SQL Editor** and run:
   - `web/supabase/migrations/001_initial_schema.sql`
   - `web/supabase/migrations/002_seed_packages.sql`
3. Go to **Settings → API** and copy:
   - Project URL → `NEXT_PUBLIC_SUPABASE_URL`
   - `anon` key → `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `service_role` key → `SUPABASE_SERVICE_ROLE_KEY`
4. Deploy the Edge Function for email notifications:
   ```bash
   supabase functions deploy notify-enquiry
   supabase secrets set RESEND_API_KEY=your_key ADMIN_EMAIL=deepakkumar.aadhi@gmail.com
   ```
5. In Supabase Dashboard → **Database → Webhooks**, create a webhook:
   - Table: `enquiries`
   - Event: `INSERT`
   - Function: `notify-enquiry`

---

## 3. Set Up Resend (Email)

1. Create account at [resend.com](https://resend.com)
2. Verify your domain (or use the test domain for dev)
3. Get API key → `RESEND_API_KEY`
4. Update the `from` address in `web/supabase/functions/notify-enquiry/index.ts`

---

## 4. Configure Environment Variables

Update `web/.env.local`:
```env
ADMIN_USERNAME=admin
ADMIN_PASSWORD=your_secure_password

NEXT_PUBLIC_SUPABASE_URL=https://xxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJ...
SUPABASE_SERVICE_ROLE_KEY=eyJ...

RESEND_API_KEY=re_xxxx
ADMIN_EMAIL=deepakkumar.aadhi@gmail.com

SESSION_SECRET=change_this_to_a_random_32_char_string
```

---

## 5. Run Locally

```bash
cd web
npm install
npm run dev
```

Open http://localhost:3000

---

## 6. Deploy to Vercel

1. Push to GitHub
2. Connect repo on [vercel.com](https://vercel.com)
3. Add all environment variables from `.env.local` in Vercel dashboard
4. Deploy

---

## 7. Update Google Maps Embed

Replace the `src` URL in `web/src/app/(public)/contact/page.tsx` with the correct Google Maps embed URL for Apexx Fitness Studio.

To get it:
1. Go to Google Maps
2. Search "Apexx Fitness Studio Perundurai"
3. Click Share → Embed a map → Copy HTML → Extract the `src` URL

---

## 8. Replace Placeholder Content

After setup, update via Admin Panel (`/admin`):
- **Packages** → Edit features list for each plan
- **Site content** (via code) → Trainer names/photos, gym story text, gallery images

---

## Admin Panel Access

URL: `/admin/login`
Default credentials are in `.env.local` (`ADMIN_USERNAME` / `ADMIN_PASSWORD`)
Change before going live.
