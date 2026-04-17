import type { Metadata } from 'next'
import Link from 'next/link'
import { CheckCircle2 } from 'lucide-react'
import { createClient } from '@/lib/supabase/server'

export const metadata: Metadata = {
  title: 'Membership Plans',
  description:
    'Choose the right membership plan at Apexx Fitness Studio. Quarterly, Half Yearly, and Annual plans with expert trainer access in Perundurai, Erode.',
}

export const revalidate = 60

type Package = {
  id: string
  name: string
  price: number
  duration: string
  badge: string | null
  features: string[]
  is_active: boolean
}

export default async function PackagesPage() {
  const supabase = await createClient()
  const { data: packages } = await supabase
    .from('packages')
    .select('*')
    .eq('is_active', true)
    .order('price', { ascending: true })

  const plans: Package[] = packages || []

  return (
    <div className="py-16 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-4">
          <p className="text-[#8B0000] text-xs uppercase tracking-[0.4em] mb-3">
            Membership Plans
          </p>
          <h1 className="text-3xl md:text-4xl font-black text-[#C0C0C0] uppercase tracking-widest mb-4">
            Choose Your Plan
          </h1>
          <p className="text-[#606060] text-sm max-w-xl mx-auto">
            Flexible membership options designed to fit your lifestyle and budget. All plans include access to all gym facilities.
          </p>
        </div>

        {/* Special Offer Banner */}
        <div className="max-w-2xl mx-auto mb-12 bg-[#2a0a0a] border border-[#8B0000] px-6 py-4 text-center">
          <span className="text-[#8B0000] text-xs uppercase tracking-widest font-bold">
            Special Offer
          </span>
          <p className="text-[#C0C0C0] text-sm mt-1">
            Up to <strong>25% off on registration</strong> for college students with valid College ID card*
          </p>
        </div>

        {/* Plans */}
        {plans.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-[#606060]">No active plans available. Please check back soon.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            {plans.map((plan) => (
              <div
                key={plan.id}
                className={`bg-[#242424] border p-8 flex flex-col relative ${
                  plan.badge === 'Best Value' || plan.badge === 'Popular'
                    ? 'border-[#8B0000]'
                    : 'border-[#3a3a3a]'
                }`}
              >
                {plan.badge && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#8B0000] text-white text-xs font-bold px-3 py-1 uppercase tracking-widest whitespace-nowrap">
                    {plan.badge}
                  </span>
                )}

                <div className="text-center mb-6">
                  <h2 className="text-[#C0C0C0] font-black uppercase tracking-widest text-lg mb-2">
                    {plan.name}
                  </h2>
                  <div className="text-5xl font-black text-white mb-1">
                    ₹{plan.price.toLocaleString('en-IN')}
                  </div>
                  <div className="text-[#8B0000] text-sm font-semibold uppercase tracking-wider">
                    {plan.duration}
                  </div>
                </div>

                <ul className="space-y-3 mb-8 flex-1">
                  {plan.features.map((f, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-[#909090]">
                      <CheckCircle2 size={16} className="text-[#8B0000] mt-0.5 shrink-0" />
                      {f}
                    </li>
                  ))}
                </ul>

                <Link
                  href={`/contact?package=${encodeURIComponent(plan.name)}`}
                  className="block text-center bg-[#8B0000] hover:bg-[#b30000] text-white font-bold py-3 uppercase tracking-widest text-sm transition-colors"
                >
                  Enquire Now
                </Link>
              </div>
            ))}
          </div>
        )}

        {/* Note */}
        <p className="text-center text-[#606060] text-xs">
          * College student discount requires valid College ID card at the time of registration. Contact us for more details.
        </p>

        {/* CTA */}
        <div className="text-center mt-10">
          <p className="text-[#909090] text-sm mb-4">Have questions about our plans?</p>
          <Link
            href="/contact"
            className="inline-block border border-[#8B0000] text-[#8B0000] hover:bg-[#8B0000] hover:text-white font-bold px-8 py-3 uppercase tracking-widest text-sm transition-colors"
          >
            Talk to Us
          </Link>
        </div>
      </div>
    </div>
  )
}
