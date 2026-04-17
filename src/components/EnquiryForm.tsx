'use client'

import { useState } from 'react'
import { createClient } from '@/lib/supabase/client'

const PACKAGES = [
  { value: 'Quarterly', label: 'Quarterly — ₹4,599 (3+1 Month Free)' },
  { value: 'Half Yearly', label: 'Half Yearly — ₹6,599 (6 Months)' },
  { value: 'Annual', label: 'Annual — ₹8,999 (12 Months)' },
  { value: 'Not sure yet', label: 'Not sure yet' },
]

const WA_URL =
  'https://wa.me/919894122627?text=Hi%2C%20I%27m%20interested%20in%20your%20gym%20membership'

export default function EnquiryForm({ defaultPackage = '' }: { defaultPackage?: string }) {
  const [form, setForm] = useState({
    name: '',
    phone: '',
    email: '',
    package: defaultPackage,
    message: '',
    honeypot: '',
  })
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [loading, setLoading] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [serverError, setServerError] = useState('')

  function validate() {
    const e: Record<string, string> = {}
    if (!form.name.trim()) e.name = 'Name is required'
    if (!form.phone.trim()) e.phone = 'Phone number is required'
    else if (!/^[6-9]\d{9}$/.test(form.phone.replace(/\s/g, '')))
      e.phone = 'Enter a valid 10-digit Indian mobile number'
    return e
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (form.honeypot) return // silently reject bots

    const errs = validate()
    setErrors(errs)
    if (Object.keys(errs).length > 0) return

    setLoading(true)
    setServerError('')

    try {
      const supabase = createClient()
      const { error } = await supabase.from('enquiries').insert({
        name: form.name.trim(),
        phone: form.phone.trim(),
        email: form.email.trim() || null,
        package: form.package || null,
        message: form.message.trim() || null,
      })

      if (error) throw error

      setSubmitted(true)
      window.open(WA_URL, '_blank')
    } catch {
      setServerError('Something went wrong. Please try again or call us directly.')
    } finally {
      setLoading(false)
    }
  }

  if (submitted) {
    return (
      <div className="bg-[#242424] border border-[#3a3a3a] p-8 text-center">
        <div className="text-4xl mb-4">💪</div>
        <h3 className="text-[#C0C0C0] font-bold text-xl mb-2 uppercase tracking-wider">
          Enquiry Received!
        </h3>
        <p className="text-[#909090] text-sm">
          We&apos;ve received your enquiry. WhatsApp is opening so you can chat with us directly.
        </p>
        <a
          href={WA_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block mt-4 bg-[#25D366] text-white text-sm font-bold px-6 py-2 hover:bg-[#1ebe5d] transition-colors"
        >
          Open WhatsApp
        </a>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* Honeypot */}
      <input
        type="text"
        name="website"
        value={form.honeypot}
        onChange={(e) => setForm({ ...form, honeypot: e.target.value })}
        className="hidden"
        tabIndex={-1}
        autoComplete="off"
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-[#C0C0C0] text-xs uppercase tracking-wider mb-1">
            Full Name <span className="text-[#8B0000]">*</span>
          </label>
          <input
            type="text"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            placeholder="Your name"
            className="w-full bg-[#2e2e2e] border border-[#3a3a3a] text-white placeholder-[#606060] px-3 py-2.5 text-sm focus:outline-none focus:border-[#8B0000] transition-colors"
          />
          {errors.name && <p className="text-[#b30000] text-xs mt-1">{errors.name}</p>}
        </div>

        <div>
          <label className="block text-[#C0C0C0] text-xs uppercase tracking-wider mb-1">
            Phone Number <span className="text-[#8B0000]">*</span>
          </label>
          <input
            type="tel"
            value={form.phone}
            onChange={(e) => setForm({ ...form, phone: e.target.value })}
            placeholder="10-digit mobile number"
            className="w-full bg-[#2e2e2e] border border-[#3a3a3a] text-white placeholder-[#606060] px-3 py-2.5 text-sm focus:outline-none focus:border-[#8B0000] transition-colors"
          />
          {errors.phone && <p className="text-[#b30000] text-xs mt-1">{errors.phone}</p>}
        </div>
      </div>

      <div>
        <label className="block text-[#C0C0C0] text-xs uppercase tracking-wider mb-1">
          Email <span className="text-[#606060]">(optional)</span>
        </label>
        <input
          type="email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          placeholder="your@email.com"
          className="w-full bg-[#2e2e2e] border border-[#3a3a3a] text-white placeholder-[#606060] px-3 py-2.5 text-sm focus:outline-none focus:border-[#8B0000] transition-colors"
        />
      </div>

      <div>
        <label className="block text-[#C0C0C0] text-xs uppercase tracking-wider mb-1">
          Package Interest <span className="text-[#606060]">(optional)</span>
        </label>
        <select
          value={form.package}
          onChange={(e) => setForm({ ...form, package: e.target.value })}
          className="w-full bg-[#2e2e2e] border border-[#3a3a3a] text-white px-3 py-2.5 text-sm focus:outline-none focus:border-[#8B0000] transition-colors"
        >
          <option value="">Select a plan...</option>
          {PACKAGES.map((p) => (
            <option key={p.value} value={p.value}>
              {p.label}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-[#C0C0C0] text-xs uppercase tracking-wider mb-1">
          Message <span className="text-[#606060]">(optional)</span>
        </label>
        <textarea
          value={form.message}
          onChange={(e) => setForm({ ...form, message: e.target.value })}
          rows={3}
          placeholder="Any questions or specific requirements..."
          className="w-full bg-[#2e2e2e] border border-[#3a3a3a] text-white placeholder-[#606060] px-3 py-2.5 text-sm focus:outline-none focus:border-[#8B0000] transition-colors resize-none"
        />
      </div>

      {serverError && (
        <p className="text-[#b30000] text-sm bg-[#2e2e2e] border border-[#8B0000] px-3 py-2">
          {serverError}
        </p>
      )}

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-[#8B0000] hover:bg-[#b30000] disabled:bg-[#4a0000] text-white font-bold py-3 uppercase tracking-widest text-sm transition-colors"
      >
        {loading ? 'Sending...' : 'Send Enquiry & Chat on WhatsApp'}
      </button>
    </form>
  )
}
