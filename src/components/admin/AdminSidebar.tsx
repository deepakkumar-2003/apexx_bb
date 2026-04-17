'use client'

import Link from 'next/link'
import Image from 'next/image'
import { usePathname, useRouter } from 'next/navigation'
import { LayoutDashboard, Users, Package, LogOut } from 'lucide-react'

const navItems = [
  { href: '/admin/enquiries', icon: Users, label: 'Enquiries' },
  { href: '/admin/packages', icon: Package, label: 'Packages' },
]

export default function AdminSidebar() {
  const pathname = usePathname()
  const router = useRouter()

  async function handleLogout() {
    await fetch('/api/admin/logout', { method: 'POST' })
    router.push('/admin/login')
    router.refresh()
  }

  return (
    <aside className="w-56 shrink-0 bg-[#111111] border-r border-[#3a3a3a] flex flex-col min-h-screen">
      <div className="p-4 border-b border-[#3a3a3a]">
        <Image
          src="/images/main-logo-1.png"
          alt="Apexx Fitness Studio"
          width={120}
          height={48}
          className="h-10 w-auto object-contain"
        />
        <p className="text-[#606060] text-xs mt-1 uppercase tracking-widest">Admin Panel</p>
      </div>

      <nav className="flex-1 p-3 space-y-1">
        <Link
          href="/admin"
          className={`flex items-center gap-3 px-3 py-2.5 text-sm uppercase tracking-wider transition-colors ${
            pathname === '/admin'
              ? 'bg-[#8B0000] text-white'
              : 'text-[#909090] hover:text-white hover:bg-[#2e2e2e]'
          }`}
        >
          <LayoutDashboard size={16} />
          Dashboard
        </Link>
        {navItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={`flex items-center gap-3 px-3 py-2.5 text-sm uppercase tracking-wider transition-colors ${
              pathname.startsWith(item.href)
                ? 'bg-[#8B0000] text-white'
                : 'text-[#909090] hover:text-white hover:bg-[#2e2e2e]'
            }`}
          >
            <item.icon size={16} />
            {item.label}
          </Link>
        ))}
      </nav>

      <div className="p-3 border-t border-[#3a3a3a]">
        <button
          onClick={handleLogout}
          className="flex items-center gap-3 px-3 py-2.5 text-sm text-[#909090] hover:text-white hover:bg-[#2e2e2e] w-full uppercase tracking-wider transition-colors"
        >
          <LogOut size={16} />
          Logout
        </button>
      </div>
    </aside>
  )
}
