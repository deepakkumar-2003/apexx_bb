'use client'

import { useState, useMemo } from 'react'
import { useRouter } from 'next/navigation'
import { Trash2, Download, Search } from 'lucide-react'

type Enquiry = {
  id: string
  name: string
  phone: string
  email: string | null
  package: string | null
  message: string | null
  created_at: string
}

export default function EnquiriesClient({ initialData }: { initialData: Enquiry[] }) {
  const [data, setData] = useState<Enquiry[]>(initialData)
  const [filterPackage, setFilterPackage] = useState('')
  const [filterFrom, setFilterFrom] = useState('')
  const [filterTo, setFilterTo] = useState('')
  const [search, setSearch] = useState('')
  const router = useRouter()

  const packages = useMemo(
    () => Array.from(new Set(data.map((e) => e.package).filter(Boolean))),
    [data]
  )

  const filtered = useMemo(() => {
    return data.filter((e) => {
      if (filterPackage && e.package !== filterPackage) return false
      if (filterFrom && e.created_at < filterFrom) return false
      if (filterTo && e.created_at > filterTo + 'T23:59:59') return false
      if (
        search &&
        !e.name.toLowerCase().includes(search.toLowerCase()) &&
        !e.phone.includes(search)
      )
        return false
      return true
    })
  }, [data, filterPackage, filterFrom, filterTo, search])

  async function handleDelete(id: string) {
    if (!confirm('Delete this enquiry?')) return
    const res = await fetch(`/api/enquiries/${id}`, { method: 'DELETE' })
    if (res.ok) {
      setData((prev) => prev.filter((e) => e.id !== id))
    }
  }

  function exportCSV() {
    const headers = ['Name', 'Phone', 'Email', 'Package', 'Message', 'Date']
    const rows = filtered.map((e) => [
      e.name,
      e.phone,
      e.email || '',
      e.package || '',
      (e.message || '').replace(/,/g, ';'),
      new Date(e.created_at).toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' }),
    ])
    const csv = [headers, ...rows].map((r) => r.join(',')).join('\n')
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `enquiries-${new Date().toISOString().split('T')[0]}.csv`
    a.click()
    URL.revokeObjectURL(url)
  }

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6 flex-wrap gap-3">
        <div>
          <h1 className="text-[#C0C0C0] font-black uppercase tracking-widest text-xl">
            Enquiries
          </h1>
          <p className="text-[#606060] text-xs mt-0.5">
            {filtered.length} of {data.length} records
          </p>
        </div>
        <button
          onClick={exportCSV}
          className="flex items-center gap-2 bg-[#8B0000] hover:bg-[#b30000] text-white text-xs font-bold px-4 py-2 uppercase tracking-widest transition-colors"
        >
          <Download size={14} />
          Export CSV
        </button>
      </div>

      {/* Filters */}
      <div className="bg-[#242424] border border-[#3a3a3a] p-4 mb-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        <div className="relative">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#606060]" />
          <input
            type="text"
            placeholder="Search name or phone..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-[#1a1a1a] border border-[#3a3a3a] text-white placeholder-[#606060] pl-9 pr-3 py-2 text-xs focus:outline-none focus:border-[#8B0000]"
          />
        </div>
        <select
          value={filterPackage}
          onChange={(e) => setFilterPackage(e.target.value)}
          className="bg-[#1a1a1a] border border-[#3a3a3a] text-white px-3 py-2 text-xs focus:outline-none focus:border-[#8B0000]"
        >
          <option value="">All Packages</option>
          {packages.map((p) => (
            <option key={p} value={p!}>
              {p}
            </option>
          ))}
        </select>
        <input
          type="date"
          value={filterFrom}
          onChange={(e) => setFilterFrom(e.target.value)}
          placeholder="From date"
          className="bg-[#1a1a1a] border border-[#3a3a3a] text-white px-3 py-2 text-xs focus:outline-none focus:border-[#8B0000]"
        />
        <input
          type="date"
          value={filterTo}
          onChange={(e) => setFilterTo(e.target.value)}
          placeholder="To date"
          className="bg-[#1a1a1a] border border-[#3a3a3a] text-white px-3 py-2 text-xs focus:outline-none focus:border-[#8B0000]"
        />
      </div>

      {/* Table */}
      <div className="bg-[#242424] border border-[#3a3a3a] overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-[#3a3a3a]">
              {['Name', 'Phone', 'Email', 'Package', 'Message', 'Date', ''].map((h) => (
                <th
                  key={h}
                  className="text-left text-[#606060] text-xs uppercase tracking-wider px-4 py-3 whitespace-nowrap"
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtered.length === 0 ? (
              <tr>
                <td colSpan={7} className="text-center text-[#606060] py-12 text-sm">
                  No enquiries found.
                </td>
              </tr>
            ) : (
              filtered.map((e) => (
                <tr
                  key={e.id}
                  className="border-b border-[#2e2e2e] hover:bg-[#2e2e2e] transition-colors"
                >
                  <td className="px-4 py-3 text-[#C0C0C0] font-medium whitespace-nowrap">
                    {e.name}
                  </td>
                  <td className="px-4 py-3 text-[#909090] whitespace-nowrap">
                    <a href={`tel:${e.phone}`} className="hover:text-white">
                      {e.phone}
                    </a>
                  </td>
                  <td className="px-4 py-3 text-[#909090] whitespace-nowrap">
                    {e.email || <span className="text-[#3a3a3a]">—</span>}
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    {e.package ? (
                      <span className="bg-[#2a0a0a] text-[#8B0000] text-xs px-2 py-0.5 uppercase tracking-wider">
                        {e.package}
                      </span>
                    ) : (
                      <span className="text-[#3a3a3a]">—</span>
                    )}
                  </td>
                  <td className="px-4 py-3 text-[#909090] max-w-[200px] truncate">
                    {e.message || <span className="text-[#3a3a3a]">—</span>}
                  </td>
                  <td className="px-4 py-3 text-[#606060] text-xs whitespace-nowrap">
                    {new Date(e.created_at).toLocaleString('en-IN', {
                      timeZone: 'Asia/Kolkata',
                      day: '2-digit',
                      month: 'short',
                      year: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit',
                    })}
                  </td>
                  <td className="px-4 py-3">
                    <button
                      onClick={() => handleDelete(e.id)}
                      className="text-[#606060] hover:text-[#b30000] transition-colors"
                      title="Delete"
                    >
                      <Trash2 size={14} />
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}
