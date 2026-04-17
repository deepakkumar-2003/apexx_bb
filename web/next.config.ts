import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  // Exclude .ts from pageExtensions so that legacy src/middleware.ts and
  // src/proxy.ts stubs are not detected as proxy/middleware convention files.
  // App Router files (route.ts, page.tsx, layout.tsx, etc.) are unaffected
  // because App Router uses its own file convention resolution.
  pageExtensions: ['tsx', 'jsx', 'js'],
}

export default nextConfig
