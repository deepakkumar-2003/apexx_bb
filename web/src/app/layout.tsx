import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: {
    default: 'Apexx Fitness Studio — Push Your Limits',
    template: '%s | Apexx Fitness Studio',
  },
  description:
    'Apexx Fitness Studio — Unisex gym in Perundurai, Erode. Affordable membership plans, expert trainers, and world-class equipment. Join today!',
  keywords: ['gym', 'fitness', 'Perundurai', 'Erode', 'unisex gym', 'membership', 'Apexx'],
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className="h-full">
      <body className="min-h-full flex flex-col antialiased" suppressHydrationWarning>{children}</body>
    </html>
  )
}
