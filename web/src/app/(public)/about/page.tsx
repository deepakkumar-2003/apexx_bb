import type { Metadata } from 'next'
import { User, Target, Award, Heart } from 'lucide-react'

export const metadata: Metadata = {
  title: 'About Us',
  description:
    'Learn about Apexx Fitness Studio — our story, our trainers, and why we are the best gym in Perundurai, Erode.',
}

const trainers = [
  {
    name: 'Placeholder Trainer',
    designation: 'Head Trainer & Founder',
    bio: 'Certified fitness trainer with 8+ years of experience in strength and conditioning.',
  },
  {
    name: 'Placeholder Trainer',
    designation: 'Cardio & HIIT Specialist',
    bio: 'Expert in high-intensity interval training and cardiovascular fitness programs.',
  },
  {
    name: 'Placeholder Trainer',
    designation: 'Nutrition Coach',
    bio: 'Certified nutritionist helping members achieve their goals through personalized diet plans.',
  },
]

const reasons = [
  {
    icon: Target,
    title: 'Goal-Oriented Training',
    desc: 'Every program is tailored to your specific fitness goals — weight loss, muscle gain, or endurance.',
  },
  {
    icon: Award,
    title: 'Certified Professionals',
    desc: 'All trainers hold nationally recognized certifications and undergo regular training updates.',
  },
  {
    icon: Heart,
    title: 'Community & Support',
    desc: 'Join a supportive community that keeps you motivated and accountable every step of the way.',
  },
  {
    icon: User,
    title: 'Personalized Attention',
    desc: 'Low member-to-trainer ratio ensures you always get the attention and guidance you deserve.',
  },
]

export default function AboutPage() {
  return (
    <div className="py-16 px-4">
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div className="text-center mb-16">
          <p className="text-[#8B0000] text-xs uppercase tracking-[0.4em] mb-3">Our Story</p>
          <h1 className="text-3xl md:text-4xl font-black text-[#C0C0C0] uppercase tracking-widest mb-6">
            About Apexx Fitness
          </h1>
        </div>

        {/* Gym Story */}
        <div className="max-w-3xl mx-auto mb-20">
          <div className="bg-[#242424] border border-[#3a3a3a] p-8">
            <h2 className="text-[#8B0000] font-bold uppercase tracking-widest text-sm mb-4">
              Our Story
            </h2>
            <p className="text-[#909090] leading-relaxed mb-4">
              Apexx Fitness Studio was founded with a singular vision — to bring world-class fitness facilities to Perundurai, Erode, at prices accessible to everyone. We believe that fitness is not a luxury; it is a right.
            </p>
            <p className="text-[#909090] leading-relaxed mb-4">
              Located at Sivasakthi Nagar, Mettukadai, our unisex studio is designed to be a welcoming space for everyone — from beginners taking their first step to seasoned athletes pushing their limits.
            </p>
            <p className="text-[#909090] leading-relaxed">
              At Apexx, we don&apos;t just build bodies — we build character, discipline, and confidence. Our motto, &ldquo;Push Your Limits,&rdquo; is not just a tagline. It is the principle we live and train by every single day.
            </p>
          </div>
        </div>

        {/* Trainers */}
        <div className="mb-20">
          <h2 className="text-center text-[#C0C0C0] text-2xl font-black uppercase tracking-widest mb-3">
            Our <span className="text-[#8B0000]">Trainers</span>
          </h2>
          <p className="text-center text-[#606060] text-sm mb-12">
            Expert guidance from certified professionals
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {trainers.map((t, i) => (
              <div key={i} className="bg-[#242424] border border-[#3a3a3a] p-6 text-center">
                <div className="w-24 h-24 rounded-full bg-[#2e2e2e] border border-[#3a3a3a] mx-auto mb-4 flex items-center justify-center">
                  <User size={40} className="text-[#606060]" />
                </div>
                <h3 className="text-[#C0C0C0] font-bold uppercase tracking-wider text-sm mb-1">
                  {t.name}
                </h3>
                <p className="text-[#8B0000] text-xs uppercase tracking-widest mb-3">
                  {t.designation}
                </p>
                <p className="text-[#606060] text-sm">{t.bio}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Equipment */}
        <div className="mb-20">
          <h2 className="text-center text-[#C0C0C0] text-2xl font-black uppercase tracking-widest mb-3">
            Our <span className="text-[#8B0000]">Equipment</span>
          </h2>
          <p className="text-center text-[#606060] text-sm mb-12">
            Professional-grade equipment for every fitness need
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              'Treadmills',
              'Ellipticals',
              'Stationary Bikes',
              'Free Weights',
              'Barbells & Plates',
              'Cable Machines',
              'Smith Machine',
              'Bench Press',
            ].map((item) => (
              <div
                key={item}
                className="bg-[#242424] border border-[#3a3a3a] px-4 py-6 text-center hover:border-[#8B0000] transition-colors"
              >
                <p className="text-[#C0C0C0] text-sm font-semibold uppercase tracking-wider">
                  {item}
                </p>
              </div>
            ))}
          </div>
          <p className="text-center text-[#606060] text-xs mt-4">
            * Equipment list is representative. Visit us for a full tour.
          </p>
        </div>

        {/* Why Choose Us */}
        <div>
          <h2 className="text-center text-[#C0C0C0] text-2xl font-black uppercase tracking-widest mb-3">
            Why <span className="text-[#8B0000]">Choose Us</span>
          </h2>
          <p className="text-center text-[#606060] text-sm mb-12">
            More than just a gym — a complete fitness experience
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {reasons.map((r) => (
              <div
                key={r.title}
                className="bg-[#242424] border border-[#3a3a3a] p-6 flex gap-4 hover:border-[#8B0000] transition-colors"
              >
                <r.icon size={28} className="text-[#8B0000] shrink-0 mt-1" />
                <div>
                  <h3 className="text-[#C0C0C0] font-bold uppercase tracking-wider text-sm mb-2">
                    {r.title}
                  </h3>
                  <p className="text-[#606060] text-sm leading-relaxed">{r.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
