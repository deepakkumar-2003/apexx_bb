'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Home, Package, Info, Images, Phone } from 'lucide-react'

const links = [
  { href: '/', label: 'Home', icon: Home },
  { href: '/packages', label: 'Packages', icon: Package },
  { href: '/about', label: 'About', icon: Info },
  { href: '/gallery', label: 'Gallery', icon: Images },
  { href: '/contact', label: 'Contact', icon: Phone },
]

export default function BottomNavbar() {
  const pathname = usePathname()

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-[#1a1a1a]/95 backdrop-blur border-t border-[#3a3a3a]">
      <div className="flex items-center justify-around h-16">
        {links.map(({ href, label, icon: Icon }) => {
          const active = pathname === href
          return (
            <Link
              key={href}
              href={href}
              className={`flex flex-col items-center gap-1 px-2 py-1 transition-colors ${
                active ? 'text-white' : 'text-[#C0C0C0] hover:text-white'
              }`}
            >
              <Icon size={20} strokeWidth={active ? 2.5 : 1.5} />
              <span className="text-[10px] uppercase tracking-wider">{label}</span>
            </Link>
          )
        })}
      </div>
    </nav>
  )
}
