'use client'

import { useState } from 'react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'

export default function AdminLoginPage() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      const res = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      })

      if (res.ok) {
        router.push('/admin/enquiries')
        router.refresh()
      } else {
        const data = await res.json()
        setError(data.error || 'Invalid credentials')
      }
    } catch {
      setError('Something went wrong. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-[#1a1a1a] flex items-center justify-center px-4">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <Image
            src="/images/main-logo-1.png"
            alt="Apexx Fitness Studio"
            width={160}
            height={64}
            className="mx-auto h-14 w-auto object-contain mb-4"
          />
          <h1 className="text-[#C0C0C0] font-black uppercase tracking-widest text-lg">
            Admin Panel
          </h1>
          <p className="text-[#606060] text-xs mt-1">Apexx Fitness Studio</p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="bg-[#242424] border border-[#3a3a3a] p-8 space-y-4"
        >
          <div>
            <label className="block text-[#C0C0C0] text-xs uppercase tracking-wider mb-1">
              Username
            </label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              autoComplete="username"
              className="w-full bg-[#1a1a1a] border border-[#3a3a3a] text-white px-3 py-2.5 text-sm focus:outline-none focus:border-[#8B0000] transition-colors"
            />
          </div>
          <div>
            <label className="block text-[#C0C0C0] text-xs uppercase tracking-wider mb-1">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              autoComplete="current-password"
              className="w-full bg-[#1a1a1a] border border-[#3a3a3a] text-white px-3 py-2.5 text-sm focus:outline-none focus:border-[#8B0000] transition-colors"
            />
          </div>

          {error && (
            <p className="text-[#b30000] text-xs bg-[#1a1a1a] border border-[#8B0000] px-3 py-2">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#8B0000] hover:bg-[#b30000] disabled:bg-[#4a0000] text-white font-bold py-3 uppercase tracking-widest text-sm transition-colors"
          >
            {loading ? 'Signing in...' : 'Sign In'}
          </button>
        </form>
      </div>
    </div>
  )
}
