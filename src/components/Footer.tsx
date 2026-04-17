import Link from 'next/link'
import { MapPin, Phone } from 'lucide-react'

function InstagramIcon({ size = 16, className }: { size?: number; className?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" />
    </svg>
  )
}

export default function Footer() {
  return (
    <footer className="bg-[#111111] border-t border-[#3a3a3a] mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand */}
          <div>
            <h3 className="text-[#C0C0C0] font-bold text-lg uppercase tracking-widest mb-3">
              Apexx Fitness Studio
            </h3>
            <p className="text-[#909090] text-sm italic">"Push Your Limits....."</p>
            <p className="text-[#909090] text-sm mt-2">Unisex Fitness Studio</p>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-[#C0C0C0] font-semibold uppercase tracking-wider text-sm mb-4">
              Contact
            </h4>
            <div className="space-y-3">
              <div className="flex items-start gap-2 text-[#909090] text-sm">
                <MapPin size={16} className="text-[#8B0000] mt-0.5 shrink-0" />
                <span>
                  5/433, Sivasakthi Nagar, Erode Road,<br />
                  Mettukadai, Perundurai, Erode - 638107
                </span>
              </div>
              <a
                href="tel:+919894122627"
                className="flex items-center gap-2 text-[#909090] hover:text-white text-sm transition-colors"
              >
                <Phone size={16} className="text-[#8B0000]" />
                +91 98941 22627
              </a>
              <a
                href="https://instagram.com/apexx_fitness_studio"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-[#909090] hover:text-white text-sm transition-colors"
              >
                <InstagramIcon size={16} className="text-[#8B0000]" />
                @apexx_fitness_studio
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-[#C0C0C0] font-semibold uppercase tracking-wider text-sm mb-4">
              Quick Links
            </h4>
            <div className="space-y-2">
              {[
                { href: '/packages', label: 'Membership Plans' },
                { href: '/about', label: 'About Us' },
                { href: '/gallery', label: 'Gallery' },
                { href: '/contact', label: 'Contact Us' },
              ].map((l) => (
                <Link
                  key={l.href}
                  href={l.href}
                  className="block text-[#909090] hover:text-[#C0C0C0] text-sm transition-colors"
                >
                  {l.label}
                </Link>
              ))}
            </div>
          </div>
        </div>

        <div className="border-t border-[#3a3a3a] mt-8 pt-6 text-center">
          <p className="text-[#606060] text-xs">
            &copy; {new Date().getFullYear()} Apexx Fitness Studio. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
