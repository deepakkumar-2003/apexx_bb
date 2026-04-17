import Link from 'next/link'
import Image from 'next/image'

const links = [
  { href: '/', label: 'Home' },
  { href: '/packages', label: 'Packages' },
  { href: '/about', label: 'About' },
  { href: '/gallery', label: 'Gallery' },
  { href: '/contact', label: 'Contact' },
]

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 bg-[#1a1a1a]/95 backdrop-blur border-b border-[#3a3a3a]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-center md:justify-between h-16">
          <Link href="/" className="flex items-center gap-2 shrink-0">
            <Image
              src="/images/main-logo-1.png"
              alt="Apexx Fitness Studio"
              width={120}
              height={48}
              className="h-12 md:h-10 w-auto object-contain"
              priority
            />
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-8">
            {links.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="text-sm font-medium text-[#C0C0C0] hover:text-white transition-colors uppercase tracking-wider"
              >
                {l.label}
              </Link>
            ))}
            <Link
              href="/contact"
              className="bg-[#8B0000] hover:bg-[#b30000] text-white text-sm font-bold px-4 py-2 uppercase tracking-wider transition-colors"
            >
              Join Now
            </Link>
          </nav>
        </div>
      </div>
    </header>
  )
}
