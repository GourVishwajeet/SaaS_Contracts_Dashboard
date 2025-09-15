import React from 'react'

interface EvidenceItem {
  source: string
  snippet: string
  relevance: number
}

export default function EvidenceDrawer({ evidence = [] }: { evidence: EvidenceItem[] }) {
  return (
    <div className="space-y-3">
      {evidence.map((e, i) => (
        <div key={i} className="p-3 bg-gray-50 rounded">
          <div className="text-sm font-semibold">
            {e.source} <span className="text-xs text-slate-500">({Math.round(e.relevance * 100)}%)</span>
          </div>
          <div className="text-sm mt-1">{e.snippet}</div>
        </div>
      ))}
    </div>
  )
}
