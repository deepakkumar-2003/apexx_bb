import type { Metadata } from 'next'
import { ImageIcon } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Gallery',
  description:
    'Take a look inside Apexx Fitness Studio — modern equipment, training areas, and the best gym environment in Perundurai, Erode.',
}

const categories = [
  'Gym Floor',
  'Cardio Area',
  'Free Weights',
  'Training Sessions',
  'Equipment',
  'Facilities',
  'Members',
  'Events',
  'Transformation',
  'Classes',
  'Locker Room',
  'Reception',
]

export default function GalleryPage() {
  return (
    <div className="py-16 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <p className="text-[#8B0000] text-xs uppercase tracking-[0.4em] mb-3">Inside Apexx</p>
          <h1 className="text-3xl md:text-4xl font-black text-[#C0C0C0] uppercase tracking-widest mb-4">
            Photo Gallery
          </h1>
          <p className="text-[#606060] text-sm max-w-xl mx-auto">
            Take a virtual tour of our world-class facility. Real photos coming soon.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {categories.map((cat, i) => (
            <div
              key={i}
              className="bg-[#242424] border border-[#3a3a3a] aspect-video flex flex-col items-center justify-center gap-3 hover:border-[#8B0000] transition-colors group"
            >
              <ImageIcon
                size={40}
                className="text-[#3a3a3a] group-hover:text-[#8B0000] transition-colors"
              />
              <span className="text-[#606060] group-hover:text-[#909090] text-xs uppercase tracking-widest transition-colors">
                {cat}
              </span>
            </div>
          ))}
        </div>

        <p className="text-center text-[#606060] text-xs mt-8">
          📸 Actual gym photos will be added here. Placeholders shown above.
        </p>
      </div>
    </div>
  )
}
