import { notFound } from 'next/navigation'

// Home page is served by app/page.tsx (root level).
// This file must exist due to Next.js route group structure but is intentionally not rendered.
export default function PublicGroupIndex() {
  notFound()
}
