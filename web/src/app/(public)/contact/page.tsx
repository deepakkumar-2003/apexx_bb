import type { Metadata } from 'next'
import { Phone, MapPin } from 'lucide-react'

function InstagramIcon({ size = 18, className }: { size?: number; className?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" />
    </svg>
  )
}
import EnquiryForm from '@/components/EnquiryForm'

export const metadata: Metadata = {
  title: 'Contact Us',
  description:
    'Get in touch with Apexx Fitness Studio. Fill out our enquiry form or WhatsApp us directly. Located in Perundurai, Erode.',
}

const WA_URL =
  'https://wa.me/919894122627?text=Hi%2C%20I%27m%20interested%20in%20your%20gym%20membership'

type Props = {
  searchParams: Promise<{ package?: string }>
}

export default async function ContactPage({ searchParams }: Props) {
  const params = await searchParams
  const defaultPackage = params.package || ''

  return (
    <div className="py-16 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <p className="text-[#8B0000] text-xs uppercase tracking-[0.4em] mb-3">Get In Touch</p>
          <h1 className="text-3xl md:text-4xl font-black text-[#C0C0C0] uppercase tracking-widest mb-4">
            Contact Us
          </h1>
          <p className="text-[#606060] text-sm max-w-xl mx-auto">
            Ready to start your fitness journey? Fill out the form below and we&apos;ll connect with you on WhatsApp right away.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Contact Info */}
          <div className="space-y-6">
            <div className="bg-[#242424] border border-[#3a3a3a] p-6">
              <h2 className="text-[#C0C0C0] font-bold uppercase tracking-widest text-sm mb-6">
                Contact Info
              </h2>
              <div className="space-y-5">
                <div className="flex items-start gap-3">
                  <MapPin size={18} className="text-[#8B0000] mt-0.5 shrink-0" />
                  <div>
                    <p className="text-[#C0C0C0] text-xs uppercase tracking-wider mb-1">Address</p>
                    <p className="text-[#909090] text-sm leading-relaxed">
                      5/433, Sivasakthi Nagar,<br />
                      Erode Road, Mettukadai,<br />
                      Perundurai, Erode - 638107
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Phone size={18} className="text-[#8B0000] mt-0.5 shrink-0" />
                  <div>
                    <p className="text-[#C0C0C0] text-xs uppercase tracking-wider mb-1">Phone</p>
                    <a
                      href="tel:+919894122627"
                      className="text-[#909090] hover:text-white text-sm transition-colors"
                    >
                      +91 98941 22627
                    </a>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <InstagramIcon size={18} className="text-[#8B0000] mt-0.5 shrink-0" />
                  <div>
                    <p className="text-[#C0C0C0] text-xs uppercase tracking-wider mb-1">Instagram</p>
                    <a
                      href="https://instagram.com/apexx_fitness_studio"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#909090] hover:text-white text-sm transition-colors"
                    >
                      @apexx_fitness_studio
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* WhatsApp CTA */}
            <a
              href={WA_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-3 w-full py-4 font-bold text-white text-sm uppercase tracking-widest transition-colors"
              style={{ backgroundColor: '#25D366' }}
            >
              <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
              Chat on WhatsApp
            </a>
          </div>

          {/* Form */}
          <div className="lg:col-span-2">
            <div className="bg-[#242424] border border-[#3a3a3a] p-6 md:p-8">
              <h2 className="text-[#C0C0C0] font-bold uppercase tracking-widest text-sm mb-6">
                Send Enquiry
              </h2>
              <EnquiryForm defaultPackage={defaultPackage} />
            </div>
          </div>
        </div>

        {/* Google Maps */}
        <div className="mt-12">
          <h2 className="text-[#C0C0C0] font-bold uppercase tracking-widest text-sm mb-4">
            Find Us
          </h2>
          <div className="border border-[#3a3a3a] overflow-hidden">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3916.0!2d77.5793!3d11.2817!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTHCsDE2JzU0LjEiTiA3N8KwMzQnNDUuNSJF!5e0!3m2!1sen!2sin!4v1000000000000!5m2!1sen!2sin"
              width="100%"
              height="400"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Apexx Fitness Studio Location"
            />
          </div>
        </div>
      </div>
    </div>
  )
}
