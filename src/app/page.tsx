import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { Dumbbell, Users, Clock, ShieldCheck, Star, ChevronRight } from 'lucide-react'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import FloatingWhatsApp from '@/components/FloatingWhatsApp'

export const metadata: Metadata = {
  title: 'Apexx Fitness Studio — Push Your Limits',
  description:
    'Apexx Fitness Studio — Unisex gym in Perundurai, Erode. Affordable membership plans, expert trainers, and world-class equipment. Join today!',
}

const highlights = [
  {
    icon: Dumbbell,
    title: 'Modern Equipment',
    desc: 'State-of-the-art cardio and strength training machines for every fitness goal.',
  },
  {
    icon: Users,
    title: 'Expert Trainers',
    desc: 'Certified personal trainers dedicated to guiding your transformation journey.',
  },
  {
    icon: ShieldCheck,
    title: 'Unisex Facility',
    desc: 'A safe, welcoming environment designed for everyone — men and women alike.',
  },
  {
    icon: Clock,
    title: 'Flexible Timings',
    desc: 'Early morning to late evening sessions to fit your busy schedule.',
  },
]

const packages = [
  { name: 'Quarterly', price: '₹4,599', duration: '3 Months + 1 Free' },
  { name: 'Half Yearly', price: '₹6,599', duration: '6 Months' },
  { name: 'Annual', price: '₹8,999', duration: '12 Months' },
]

const testimonials = [
  {
    name: 'Placeholder Member',
    rating: 5,
    text: 'Apexx completely transformed my fitness journey. The trainers are highly professional and the equipment is top-notch.',
    plan: 'Annual Member',
  },
  {
    name: 'Placeholder Member',
    rating: 5,
    text: 'Great atmosphere and affordable pricing. The quarterly plan with free month is an amazing deal!',
    plan: 'Quarterly Member',
  },
  {
    name: 'Placeholder Member',
    rating: 5,
    text: 'Best gym in Perundurai. Clean, modern, and the staff is always supportive and motivating.',
    plan: 'Half Yearly Member',
  },
]

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1">
        {/* Hero */}
        <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
          <div
            className="absolute inset-0 z-0"
            style={{
              background:
                'linear-gradient(135deg, #0a0a0a 0%, #1a1a1a 40%, #2a0a0a 70%, #1a1a1a 100%)',
            }}
          />
          <div
            className="absolute inset-0 z-0 opacity-10"
            style={{
              backgroundImage:
                'repeating-linear-gradient(45deg, #8B0000 0, #8B0000 1px, transparent 0, transparent 50%)',
              backgroundSize: '20px 20px',
            }}
          />
          <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
            <div className="mb-8 flex justify-center">
              <Image
                src="/images/main-logo-1.png"
                alt="Apexx Fitness Studio"
                width={280}
                height={112}
                className="w-48 sm:w-64 md:w-72 h-auto"
                priority
              />
            </div>
            <p className="text-[#C0C0C0] text-sm uppercase tracking-[0.4em] mb-4">
              Unisex Fitness Studio • Perundurai, Erode
            </p>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-black text-white uppercase tracking-wider leading-tight mb-6">
              Push Your{' '}
              <span className="text-[#8B0000]">Limits</span>
              <span className="text-[#C0C0C0]">.....</span>
            </h1>
            <p className="text-[#909090] text-base sm:text-lg max-w-xl mx-auto mb-10">
              Transform your body. Elevate your mind. Join Erode&apos;s premier unisex fitness studio
              with expert guidance and modern equipment.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/packages"
                className="bg-[#8B0000] hover:bg-[#b30000] text-white font-bold px-8 py-4 uppercase tracking-widest text-sm transition-colors"
              >
                View Plans
              </Link>
              <Link
                href="/contact"
                className="border border-[#C0C0C0] hover:bg-[#C0C0C0] hover:text-[#1a1a1a] text-[#C0C0C0] font-bold px-8 py-4 uppercase tracking-widest text-sm transition-colors"
              >
                Enquire Now
              </Link>
            </div>
          </div>
        </section>

        {/* Highlights */}
        <section className="py-20 px-4 bg-[#111111]">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-center text-[#C0C0C0] text-2xl md:text-3xl font-black uppercase tracking-widest mb-3">
              Why Choose <span className="text-[#8B0000]">Apexx</span>
            </h2>
            <p className="text-center text-[#606060] text-sm mb-12">
              Everything you need to achieve your fitness goals
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {highlights.map((h) => (
                <div
                  key={h.title}
                  className="bg-[#1a1a1a] border border-[#3a3a3a] p-6 hover:border-[#8B0000] transition-colors group"
                >
                  <h.icon
                    size={32}
                    className="text-[#8B0000] mb-4 group-hover:scale-110 transition-transform"
                  />
                  <h3 className="text-[#C0C0C0] font-bold uppercase tracking-wider text-sm mb-2">
                    {h.title}
                  </h3>
                  <p className="text-[#606060] text-sm leading-relaxed">{h.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Packages Preview */}
        <section className="py-20 px-4">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-center text-[#C0C0C0] text-2xl md:text-3xl font-black uppercase tracking-widest mb-3">
              Membership <span className="text-[#8B0000]">Plans</span>
            </h2>
            <p className="text-center text-[#606060] text-sm mb-4">
              Up to 25% off for college students with valid ID card
            </p>
            <p className="text-center text-[#8B0000] text-xs uppercase tracking-widest mb-12">
              Special Offer
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
              {packages.map((p) => (
                <div
                  key={p.name}
                  className="bg-[#242424] border border-[#3a3a3a] p-8 text-center hover:border-[#8B0000] transition-colors"
                >
                  <h3 className="text-[#C0C0C0] font-bold uppercase tracking-widest text-sm mb-4">
                    {p.name}
                  </h3>
                  <div className="text-4xl font-black text-white mb-2">{p.price}</div>
                  <div className="text-[#8B0000] text-sm font-semibold uppercase tracking-wider mb-6">
                    {p.duration}
                  </div>
                  <Link
                    href={`/contact?package=${p.name}`}
                    className="inline-block border border-[#8B0000] text-[#8B0000] hover:bg-[#8B0000] hover:text-white font-bold px-6 py-2 text-xs uppercase tracking-widest transition-colors"
                  >
                    Enquire Now
                  </Link>
                </div>
              ))}
            </div>
            <div className="text-center">
              <Link
                href="/packages"
                className="inline-flex items-center gap-2 text-[#C0C0C0] hover:text-white text-sm uppercase tracking-widest font-semibold transition-colors"
              >
                View All Plans <ChevronRight size={16} />
              </Link>
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section className="py-20 px-4 bg-[#111111]">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-center text-[#C0C0C0] text-2xl md:text-3xl font-black uppercase tracking-widest mb-3">
              Member <span className="text-[#8B0000]">Stories</span>
            </h2>
            <p className="text-center text-[#606060] text-sm mb-12">
              Real results from real members
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {testimonials.map((t, i) => (
                <div key={i} className="bg-[#1a1a1a] border border-[#3a3a3a] p-6">
                  <div className="flex gap-1 mb-4">
                    {Array.from({ length: t.rating }).map((_, j) => (
                      <Star key={j} size={14} className="text-[#8B0000] fill-[#8B0000]" />
                    ))}
                  </div>
                  <p className="text-[#909090] text-sm leading-relaxed mb-6 italic">
                    &ldquo;{t.text}&rdquo;
                  </p>
                  <div>
                    <div className="text-[#C0C0C0] font-semibold text-sm">{t.name}</div>
                    <div className="text-[#606060] text-xs">{t.plan}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Banner */}
        <section className="py-20 px-4 bg-[#8B0000]">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-white text-2xl md:text-3xl font-black uppercase tracking-widest mb-4">
              Ready to Transform?
            </h2>
            <p className="text-red-200 text-sm mb-8">
              Join Apexx Fitness Studio today and take the first step towards a stronger, healthier
              you.
            </p>
            <Link
              href="/contact"
              className="inline-block bg-white text-[#8B0000] hover:bg-[#f0f0f0] font-black px-10 py-4 uppercase tracking-widest text-sm transition-colors"
            >
              Enquire Now
            </Link>
          </div>
        </section>
      </main>
      <Footer />
      <FloatingWhatsApp />
    </div>
  )
}
