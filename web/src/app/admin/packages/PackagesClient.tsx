'use client'

import { useState } from 'react'
import { Plus, Pencil, Trash2, X, Check, Eye, EyeOff } from 'lucide-react'

type Package = {
  id: string
  name: string
  price: number
  duration: string
  badge: string | null
  features: string[]
  is_active: boolean
}

type FormData = {
  name: string
  price: string
  duration: string
  badge: string
  features: string
  is_active: boolean
}

const emptyForm: FormData = {
  name: '',
  price: '',
  duration: '',
  badge: '',
  features: '',
  is_active: true,
}

export default function PackagesClient({ initialData }: { initialData: Package[] }) {
  const [packages, setPackages] = useState<Package[]>(initialData)
  const [showForm, setShowForm] = useState(false)
  const [editId, setEditId] = useState<string | null>(null)
  const [form, setForm] = useState<FormData>(emptyForm)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')

  function openAdd() {
    setForm(emptyForm)
    setEditId(null)
    setShowForm(true)
    setError('')
  }

  function openEdit(pkg: Package) {
    setForm({
      name: pkg.name,
      price: String(pkg.price),
      duration: pkg.duration,
      badge: pkg.badge || '',
      features: pkg.features.join('\n'),
      is_active: pkg.is_active,
    })
    setEditId(pkg.id)
    setShowForm(true)
    setError('')
  }

  function closeForm() {
    setShowForm(false)
    setEditId(null)
    setError('')
  }

  async function handleSave() {
    if (!form.name || !form.price || !form.duration) {
      setError('Name, price, and duration are required.')
      return
    }
    setSaving(true)
    setError('')

    const payload = {
      name: form.name.trim(),
      price: parseInt(form.price),
      duration: form.duration.trim(),
      badge: form.badge.trim() || null,
      features: form.features
        .split('\n')
        .map((f) => f.trim())
        .filter(Boolean),
      is_active: form.is_active,
    }

    const url = editId ? `/api/packages/${editId}` : '/api/packages'
    const method = editId ? 'PUT' : 'POST'

    try {
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'Failed to save')

      if (editId) {
        setPackages((prev) => prev.map((p) => (p.id === editId ? data : p)))
      } else {
        setPackages((prev) => [...prev, data])
      }
      closeForm()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to save')
    } finally {
      setSaving(false)
    }
  }

  async function handleDelete(id: string) {
    if (!confirm('Delete this package? It will be removed from the public site immediately.')) return
    const res = await fetch(`/api/packages/${id}`, { method: 'DELETE' })
    if (res.ok) {
      setPackages((prev) => prev.filter((p) => p.id !== id))
    }
  }

  async function toggleActive(pkg: Package) {
    const res = await fetch(`/api/packages/${pkg.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...pkg, is_active: !pkg.is_active }),
    })
    if (res.ok) {
      const updated = await res.json()
      setPackages((prev) => prev.map((p) => (p.id === pkg.id ? updated : p)))
    }
  }

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-[#C0C0C0] font-black uppercase tracking-widest text-xl">
            Packages
          </h1>
          <p className="text-[#606060] text-xs mt-0.5">{packages.length} total plans</p>
        </div>
        <button
          onClick={openAdd}
          className="flex items-center gap-2 bg-[#8B0000] hover:bg-[#b30000] text-white text-xs font-bold px-4 py-2 uppercase tracking-widest transition-colors"
        >
          <Plus size={14} />
          Add Package
        </button>
      </div>

      {/* Package Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {packages.map((pkg) => (
          <div
            key={pkg.id}
            className={`bg-[#242424] border p-5 ${pkg.is_active ? 'border-[#3a3a3a]' : 'border-[#2e2e2e] opacity-60'}`}
          >
            <div className="flex items-start justify-between mb-3">
              <div>
                <h3 className="text-[#C0C0C0] font-bold uppercase tracking-wider text-sm">
                  {pkg.name}
                </h3>
                {pkg.badge && (
                  <span className="text-[#8B0000] text-xs uppercase tracking-widest">
                    {pkg.badge}
                  </span>
                )}
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => toggleActive(pkg)}
                  title={pkg.is_active ? 'Deactivate' : 'Activate'}
                  className="text-[#606060] hover:text-[#C0C0C0] transition-colors"
                >
                  {pkg.is_active ? <Eye size={14} /> : <EyeOff size={14} />}
                </button>
                <button
                  onClick={() => openEdit(pkg)}
                  className="text-[#606060] hover:text-[#C0C0C0] transition-colors"
                >
                  <Pencil size={14} />
                </button>
                <button
                  onClick={() => handleDelete(pkg.id)}
                  className="text-[#606060] hover:text-[#b30000] transition-colors"
                >
                  <Trash2 size={14} />
                </button>
              </div>
            </div>
            <div className="text-3xl font-black text-white mb-1">
              ₹{pkg.price.toLocaleString('en-IN')}
            </div>
            <div className="text-[#8B0000] text-xs uppercase tracking-wider mb-3">
              {pkg.duration}
            </div>
            <ul className="space-y-1">
              {pkg.features.map((f, i) => (
                <li key={i} className="text-[#606060] text-xs flex items-center gap-1.5">
                  <Check size={10} className="text-[#8B0000] shrink-0" />
                  {f}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* Form Modal */}
      {showForm && (
        <div className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4">
          <div className="bg-[#242424] border border-[#3a3a3a] w-full max-w-md max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between p-4 border-b border-[#3a3a3a]">
              <h2 className="text-[#C0C0C0] font-bold uppercase tracking-wider text-sm">
                {editId ? 'Edit Package' : 'Add Package'}
              </h2>
              <button onClick={closeForm} className="text-[#606060] hover:text-white">
                <X size={18} />
              </button>
            </div>

            <div className="p-4 space-y-4">
              <div>
                <label className="block text-[#C0C0C0] text-xs uppercase tracking-wider mb-1">
                  Name *
                </label>
                <input
                  type="text"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="w-full bg-[#1a1a1a] border border-[#3a3a3a] text-white px-3 py-2 text-sm focus:outline-none focus:border-[#8B0000]"
                  placeholder="e.g. Annual"
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[#C0C0C0] text-xs uppercase tracking-wider mb-1">
                    Price (₹) *
                  </label>
                  <input
                    type="number"
                    value={form.price}
                    onChange={(e) => setForm({ ...form, price: e.target.value })}
                    className="w-full bg-[#1a1a1a] border border-[#3a3a3a] text-white px-3 py-2 text-sm focus:outline-none focus:border-[#8B0000]"
                    placeholder="8999"
                  />
                </div>
                <div>
                  <label className="block text-[#C0C0C0] text-xs uppercase tracking-wider mb-1">
                    Duration *
                  </label>
                  <input
                    type="text"
                    value={form.duration}
                    onChange={(e) => setForm({ ...form, duration: e.target.value })}
                    className="w-full bg-[#1a1a1a] border border-[#3a3a3a] text-white px-3 py-2 text-sm focus:outline-none focus:border-[#8B0000]"
                    placeholder="12 Months"
                  />
                </div>
              </div>
              <div>
                <label className="block text-[#C0C0C0] text-xs uppercase tracking-wider mb-1">
                  Badge <span className="text-[#606060]">(optional)</span>
                </label>
                <input
                  type="text"
                  value={form.badge}
                  onChange={(e) => setForm({ ...form, badge: e.target.value })}
                  className="w-full bg-[#1a1a1a] border border-[#3a3a3a] text-white px-3 py-2 text-sm focus:outline-none focus:border-[#8B0000]"
                  placeholder="e.g. Best Value, Popular"
                />
              </div>
              <div>
                <label className="block text-[#C0C0C0] text-xs uppercase tracking-wider mb-1">
                  Features <span className="text-[#606060]">(one per line)</span>
                </label>
                <textarea
                  value={form.features}
                  onChange={(e) => setForm({ ...form, features: e.target.value })}
                  rows={5}
                  className="w-full bg-[#1a1a1a] border border-[#3a3a3a] text-white px-3 py-2 text-sm focus:outline-none focus:border-[#8B0000] resize-none"
                  placeholder={'Cardio Access\nWeight Training\nTrainer Guidance'}
                />
              </div>
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="is_active"
                  checked={form.is_active}
                  onChange={(e) => setForm({ ...form, is_active: e.target.checked })}
                  className="accent-[#8B0000]"
                />
                <label htmlFor="is_active" className="text-[#C0C0C0] text-xs uppercase tracking-wider">
                  Active (visible on site)
                </label>
              </div>

              {error && (
                <p className="text-[#b30000] text-xs bg-[#1a1a1a] border border-[#8B0000] px-3 py-2">
                  {error}
                </p>
              )}

              <div className="flex gap-3 pt-2">
                <button
                  onClick={handleSave}
                  disabled={saving}
                  className="flex-1 bg-[#8B0000] hover:bg-[#b30000] disabled:bg-[#4a0000] text-white font-bold py-2.5 text-xs uppercase tracking-widest transition-colors"
                >
                  {saving ? 'Saving...' : editId ? 'Update' : 'Create'}
                </button>
                <button
                  onClick={closeForm}
                  className="px-4 border border-[#3a3a3a] text-[#909090] hover:text-white text-xs uppercase tracking-wider transition-colors"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
