import React, { useEffect, useMemo, useState } from 'react'

import { Link } from 'react-router-dom'
import useFetch from '../hooks/useFetch'
import Pagination from './Pagination'

interface Contract {
  id: string
  name: string
  parties: string
  expiry: string
  status: string
  risk: string
}

const STATUS_OPTIONS = ['All', 'Active', 'Expired', 'Renewal Due']
const RISK_OPTIONS = ['All', 'Low', 'Medium', 'High']

export default function ContractTable() {
  const { data, loading, error } = useFetch<Contract[]>('/contracts.json', [])
  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState('All')
  const [riskFilter, setRiskFilter] = useState('All')
  const [page, setPage] = useState(1)
  const perPage = 10

  useEffect(() => setPage(1), [search, statusFilter, riskFilter])

  const filtered = useMemo(() => {
    if (!data) return []
    const q = search.toLowerCase().trim()
    return data.filter((c) => {
      if (statusFilter !== 'All' && c.status !== statusFilter) return false
      if (riskFilter !== 'All' && c.risk !== riskFilter) return false
      if (!q) return true
      return (
        c.name.toLowerCase().includes(q) ||
        c.parties.toLowerCase().includes(q)
      )
    })
  }, [data, search, statusFilter, riskFilter])

  const total = filtered.length
  const pages = Math.max(1, Math.ceil(total / perPage))
  const start = (page - 1) * perPage
  const pageItems = filtered.slice(start, start + perPage)

  if (loading) return <div className="p-6 bg-white rounded shadow">Loading contracts...</div>
  if (error) return <div className="p-6 text-red-600">Error loading contracts.{error.message}</div>
  if (!data || data.length === 0) return <div className="p-6">No contracts yet.</div>

  return (
    <div className="bg-white rounded shadow p-4">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 mb-4">
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
          <input
            className="border rounded p-2 w-full sm:w-auto"
            placeholder="Search name or parties"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <select value={statusFilter} onChange={e => setStatusFilter(e.target.value)} className="border rounded p-2 w-full sm:w-auto">
            {STATUS_OPTIONS.map(s => <option key={s} value={s}>{s}</option>)}
          </select>
          <select value={riskFilter} onChange={e => setRiskFilter(e.target.value)} className="border rounded p-2 w-full sm:w-auto">
            {RISK_OPTIONS.map(r => <option key={r} value={r}>{r}</option>)}
          </select>
        </div>
        <div className="text-sm text-slate-500">{total} result(s)</div>
      </div>

      {/* Responsive Table: Table on md+, Cards on mobile */}
      <div className="hidden md:block w-full overflow-x-auto">
        <table className="w-full min-w-[600px] text-left">
          <thead>
            <tr className="text-xs text-slate-600 border-b md:text-sm ">
              <th className="py-2">Contract Name</th>
              <th className="py-2">Parties</th>
              <th className="py-2">Expiry</th>
              <th className="py-2">Status</th>
              <th className="py-2">Risk</th>
            </tr>
          </thead>
          <tbody>
            {pageItems.map(c => (
              <tr key={c.id} className="border-b hover:bg-gray-50 md:text-sm text-xs">
                <td className="py-3">
                  <Link to={`/contracts/${c.id}`} className="text-sky-600">{c.name}</Link>
                </td>
                <td className="py-3">{c.parties}</td>
                <td className="py-3">{c.expiry}</td>
                <td className="py-3">{c.status}</td>
                <td className="py-3">{c.risk}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Card View */}
      <div className="md:hidden space-y-4">
        {pageItems.map(c => (
          <div key={c.id} className="border rounded p-3 shadow-sm">
            <div className="font-semibold text-sky-700">
              <Link to={`/contracts/${c.id}`}>{c.name}</Link>
            </div>
            <div className="text-xs text-slate-500 mb-1">{c.parties}</div>
            <div className="flex flex-wrap gap-2 text-xs">
              <span className="bg-slate-100 lg:px-2 py-1 rounded">Expiry: <span className="font-medium">{c.expiry}</span></span>
              <span className="bg-slate-100 lg:px-2 py-1 rounded">Status: <span className="font-medium">{c.status}</span></span>
              <span className="bg-slate-100 lg:px-2 py-1 rounded">Risk: <span className="font-medium">{c.risk}</span></span>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-4">
        <Pagination page={page} setPage={setPage} pages={pages} />
      </div>
    </div>
  )
}