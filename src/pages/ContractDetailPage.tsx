import React from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import useFetch from '../hooks/useFetch'
import Sidebar from '../components/Sidebar'
import Topbar from '../components/Topbar'
import ClauseCard from '../components/ClauseCard'
import EvidenceDrawer from '../components/EvidenceDrawer'

export default function ContractDetailPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { data: contracts, loading, error } = useFetch('/contracts.json', [id])

  const detail = Array.isArray(contracts) ? contracts.find((c) => c.id === id) : null

  if (loading) return <div className="p-6">Loading...</div>
  if (error) return <div className="p-6 text-red-600">Error loading contract</div>
  if (!detail) return <div className="p-6">Contract not found</div>

  const mockedDetail = {
    id: detail.id,
    name: detail.name,
    parties: detail.parties,
    start: '2023-01-01',
    expiry: detail.expiry,
    status: detail.status,
    risk: detail.risk,
    clauses: [
      { title: 'Termination', summary: '90 days notice period.', confidence: 0.82 },
      { title: 'Liability Cap', summary: '12 months’ fees limit.', confidence: 0.87 }
    ],
    insights: [
      { risk: 'High', message: 'Liability cap excludes data breach costs.' },
      { risk: 'Medium', message: 'Renewal auto-renews unless cancelled 60 days before expiry.' }
    ],
    evidence: [
      { source: 'Section 12.2', snippet: 'Total liability limited to 12 months’ fees.', relevance: 0.91 }
    ]
  }

  return (
    <div className="flex min-h-screen w-full overflow-x-hidden">
      <Sidebar />
      <div className="flex-1 flex flex-col ">
        <Topbar/>
        <main className="p-4 sm:p-6">
          <button className="text-sky-600 mb-4 text-base sm:text-lg" onClick={() => navigate(-1)}>← Back</button>
          <div className="bg-white p-4 sm:p-6 rounded shadow">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
              <div>
                <h1 className="text-xl sm:text-2xl font-semibold break-words">{mockedDetail.name}</h1>
                <p className="text-sm sm:text-base text-slate-600 break-words">{mockedDetail.parties}</p>
              </div>
              <div className="text-left sm:text-right text-sm sm:text-base">
                <div>Status: <strong>{mockedDetail.status}</strong></div>
                <div>Risk: <strong>{mockedDetail.risk}</strong></div>
                <div>Expiry: <strong>{mockedDetail.expiry}</strong></div>
              </div>
            </div>

            <section className="mt-6">
              <h2 className="text-base sm:text-lg font-medium mb-2">Clauses</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {mockedDetail.clauses.map((c) => (
                  <ClauseCard  key={c.title} clause={c} />
                ))}
              </div>
            </section>

            <section className="mt-6">
              <h2 className="text-base sm:text-lg font-medium mb-2">AI Insights</h2>
              <ul className="space-y-2">
                {mockedDetail.insights.map((ins, idx) => (
                  <li key={idx} className="p-3 bg-gray-50 rounded">
                    <div className="text-sm sm:text-base font-semibold">{ins.risk}</div>
                    <div className="text-sm sm:text-base">{ins.message}</div>
                  </li>
                ))}
              </ul>
            </section>

            <section className="mt-6">
              <h2 className="text-base sm:text-lg font-medium mb-2">Evidence</h2>
              <EvidenceDrawer evidence={mockedDetail.evidence} />
            </section>
          </div>
        </main>
      </div>
    </div>
  )
}